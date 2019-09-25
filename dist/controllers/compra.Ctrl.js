"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compra_Mdl_1 = __importDefault(require("../models/compra.Mdl"));
const underscore_1 = __importDefault(require("underscore"));
const reporte_serv_1 = __importDefault(require("../services/reporte.serv"));
let err, _id;
exports.default = {
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const body = req.body;
                const bodyE = underscore_1.default.pick(req.body, ['cantidad']);
                let compra;
                if (req.empleado.role === 'Admin') {
                    compra = yield compra_Mdl_1.default.findOneAndUpdate({
                        _id
                    }, body, {
                        new: true,
                        runValidators: true
                    });
                }
                else if (req.empleado.role === 'Encargado') {
                    compra = yield compra_Mdl_1.default.findOneAndUpdate({
                        _id
                    }, bodyE, {
                        new: true,
                        runValidators: true
                    });
                }
                if (!compra) {
                    return res.status(400).json({
                        err,
                        mensaje: `Compra con el id: ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    compra,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const cambiaEstado = {
                    estado: false
                };
                const compra = yield compra_Mdl_1.default.findOneAndUpdate({
                    _id
                }, cambiaEstado, {
                    new: true
                });
                if (!compra) {
                    return res.status(400).json({
                        err,
                        mensaje: `Compra con el id ${_id} no existe`,
                        ok: false
                    });
                }
                res.json({
                    compra,
                    mensaje: `Compra ${compra._id} Cancelada`,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    error: {
                        mensaje: `No se encontro la compra con id: ${_id}`
                    },
                    ok: false
                });
            }
        });
    },
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const compraC = new compra_Mdl_1.default({
                    cantidad: body.cantidad,
                    empleado: req.empleado._id,
                    nombre: body.nombre,
                    precioUni: body.precioUni,
                    proveedor: body.proveedor,
                    sucursal: req.empleado.sucursal,
                    tipo: body.tipo,
                    descripcion: body.descripcion,
                    observaciones: body.observaciones
                });
                const compra = yield compra_Mdl_1.default.create(compraC);
                return res.json({
                    compra,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pagina = 1, porPagina = 10, filtro, campoOrdenar, tipoOrden, criterio = 'nombre', status } = req.query;
                const options = {
                    page: parseInt(pagina, 10),
                    limit: parseInt(porPagina, 10),
                    populate: [
                        {
                            path: 'empleado'
                        },
                        {
                            path: 'proveedor'
                        }
                    ],
                    sort: {
                        nombre: 1
                    }
                };
                let filtroE = new RegExp(filtro, 'i');
                const consulta = {
                    $and: [
                        {
                            [criterio]: filtroE
                        },
                        {
                            estado: status
                        }
                    ]
                };
                if (campoOrdenar && tipoOrden) {
                    options.sort = {
                        [campoOrdenar]: tipoOrden
                    };
                }
                const compras = yield compra_Mdl_1.default.paginate(consulta, options);
                return res.json({
                    compras,
                    ok: true
                });
            }
            catch (err) {
                return res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    obtenerPorCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const compras = yield compra_Mdl_1.default.find({
                    categoria: _id
                });
                if (!compras) {
                    return res.status(404).json({
                        mensaje: 'No se encontraron los compras',
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    compras
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro la compra con id: ${_id}`,
                    ok: false
                });
            }
        });
    },
    obtenerPorFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fechaI, fechaF, filtro } = req.query;
                const options = {
                    populate: { path: 'empleado sucursal proveedor' },
                    sort: { nombre: 1 }
                };
                let fI;
                let fechaIn;
                let fF;
                let fechaFn;
                let consulta;
                if (fechaI) {
                    fI = new Date(fechaI).toISOString().split('T')[0];
                    fechaIn = new Date(`${fI}`);
                }
                if (fechaI && fechaF) {
                    fF = new Date(fechaF).toISOString().split('T')[0];
                    fechaFn = new Date(`${fF}`);
                    consulta = { fecha: { $gte: fechaIn, $lte: fechaFn } };
                }
                if (!fechaF) {
                    consulta = { fecha: { $gte: fechaIn } };
                }
                if (!fechaI && !fechaF) {
                    consulta = { estado: true };
                    console.log('todo');
                }
                const compras = yield compra_Mdl_1.default.paginate(consulta, options);
                const templateBody = reporte_serv_1.default.getTemplateBody(compras);
                const html = reporte_serv_1.default.getVentaTemplate(templateBody);
                res.pdfFromHTML({
                    filename: `compra-${new Date().getMilliseconds()}`,
                    htmlContent: html
                });
            }
            catch (err) {
                return res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    obtenerPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const compra = yield compra_Mdl_1.default.findOne({
                    _id
                });
                if (!compra) {
                    return res.status(404).json({
                        mensaje: 'No se encontro la compra',
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    compra
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro la compra con id: ${_id}`,
                    ok: false
                });
            }
        });
    },
    obtenerTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    populate: {
                        path: 'empleado',
                        select: 'nombre'
                    },
                    sort: {
                        nombre: 1
                    }
                };
                const consulta = {
                    estado: true
                };
                const compras = yield compra_Mdl_1.default.paginate(consulta, options);
                if (!compras) {
                    return res.status(404).json({
                        err,
                        ok: false
                    });
                }
                return res.json({
                    compras,
                    ok: true
                });
            }
            catch (err) {
                return res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    }
};
