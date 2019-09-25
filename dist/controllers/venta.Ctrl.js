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
const venta_Mdl_1 = __importDefault(require("../models/venta.Mdl"));
const venta_serv_1 = __importDefault(require("../services/venta.serv"));
let err;
exports.default = {
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const body = req.body;
                const ventaE = {
                    productos: [],
                    tipoPedido: body.tipoPedido,
                    total: body.total,
                    empleado: req.empleado._id,
                    estado: body.estado
                };
                body.productosDetalle.forEach((elem) => {
                    ventaE.productos.push({
                        producto: elem.productoId,
                        cantidad: elem.cantidad
                    });
                });
                const venta = yield venta_Mdl_1.default.findOneAndUpdate({
                    _id
                }, ventaE, {
                    new: true,
                    runValidators: true
                });
                if (!venta) {
                    return res.status(400).json({
                        mensaje: `Venta con el id ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    venta: venta
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
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const cambiaEstado = {
                    estado: 'Cancelada'
                };
                const venta = yield venta_Mdl_1.default.findOneAndUpdate({
                    _id
                }, cambiaEstado, {
                    new: true
                });
                if (!venta) {
                    return res.status(400).json({
                        err,
                        mensaje: `La venta con el id ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    mensaje: `Venta ${venta._id} cancelada`,
                    ok: true,
                    venta: venta
                });
            }
            catch (err) {
                return res.status(400).json({
                    err,
                    ok: false
                });
            }
        });
    },
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                if (body.tipoPedido === 'Restaurant') {
                    body.estado = 'Completada';
                }
                const ventaC = new venta_Mdl_1.default({
                    productos: [],
                    tipoPedido: body.tipoPedido,
                    total: body.total,
                    empleado: req.empleado._id,
                    sucursal: body.sucursal,
                    estado: body.estado
                });
                body.productosDetalle.forEach((elem) => {
                    ventaC.productos.push({
                        producto: elem.productoId,
                        cantidad: elem.cantidad
                    });
                });
                const venta = yield venta_Mdl_1.default.create(ventaC);
                if (!venta) {
                    return res.status(400).json({
                        err,
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    venta: venta
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
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pagina = 1, porPagina = 10, filtro, campoOrdenar, tipoOrden } = req.query;
                const options = {
                    page: parseInt(pagina, 10),
                    limit: parseInt(porPagina, 10),
                    populate: [
                        {
                            path: 'cliente',
                            select: 'nombre'
                        },
                        {
                            path: 'empleado',
                            select: 'nombre'
                        },
                        {
                            path: 'sucursal',
                            select: 'nombre'
                        },
                        {
                            path: 'productos.producto'
                        }
                    ]
                };
                let filtroE = new RegExp(filtro, 'i');
                const consulta = {};
                if (filtro) {
                    consulta.nombre = {
                        $regex: filtroE
                    };
                }
                if (campoOrdenar && tipoOrden) {
                    options.sort = {
                        [campoOrdenar]: tipoOrden
                    };
                }
                const ventas = yield venta_Mdl_1.default.paginate(consulta, options);
                return res.json({
                    ok: true,
                    ventas
                });
            }
            catch (err) {
                res.status(400).json({
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
                const venta = yield venta_Mdl_1.default.findOne({
                    _id
                })
                    .populate('cliente')
                    .populate('empleado')
                    .populate('sucursal')
                    .populate('productos.producto');
                if (!venta || venta.estado === false) {
                    return res.status(500).json({
                        err,
                        mensaje: `La Venta con el id ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    venta
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
    descargar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const venta = yield venta_Mdl_1.default.findOne({
                    _id
                })
                    .populate('cliente')
                    .populate('empleado')
                    .populate('sucursal');
                if (!venta) {
                    return res.status(404).json({
                        mensaje: 'No se encontro ninguna venta'
                    });
                }
                const templateBody = venta_serv_1.default.getTemplateBody(venta);
                const html = venta_serv_1.default.getVentaTemplate(templateBody);
                res.pdfFromHTML({
                    filename: `venta-${venta.cliente.nombre}-${new Date().getMilliseconds()}`,
                    htmlContent: html
                });
            }
            catch (err) {
                return res.status(500).send(err);
            }
        });
    }
};
