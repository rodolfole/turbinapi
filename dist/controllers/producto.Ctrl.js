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
const producto_Mdl_1 = __importDefault(require("../models/producto.Mdl"));
const underscore_1 = __importDefault(require("underscore"));
let err, _id;
exports.default = {
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const body = req.body;
                const bodyE = underscore_1.default.pick(req.body, ['stock']);
                let producto;
                if (req.empleado.role === 'Admin') {
                    producto = yield producto_Mdl_1.default.findOneAndUpdate({
                        _id
                    }, body, {
                        new: true,
                        runValidators: true
                    });
                }
                else if (req.empleado.role === 'Encargado') {
                    producto = yield producto_Mdl_1.default.findOneAndUpdate({
                        _id
                    }, bodyE, {
                        new: true,
                        runValidators: true
                    });
                }
                if (!producto) {
                    return res.status(400).json({
                        err,
                        mensaje: `Producto con el id: ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    producto,
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
                    disponible: false
                };
                const producto = yield producto_Mdl_1.default.findOneAndUpdate({
                    _id
                }, cambiaEstado, {
                    new: true
                });
                if (!producto) {
                    return res.status(400).json({
                        err,
                        mensaje: `Producto con el id ${_id} no existe`,
                        ok: false
                    });
                }
                res.json({
                    producto,
                    mensaje: `Producto ${producto.descripcion} Borrada`,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    error: {
                        mensaje: `No se encontro la producto con id: ${_id}`
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
                const productoC = new producto_Mdl_1.default({
                    nombre: body.nombre,
                    tipoPro: body.tipoPro,
                    precioUni: body.precioUni,
                    stock: body.stock,
                    categoria: body.categoria,
                    empleado: req.empleado._id,
                    sucursal: req.empleado.sucursal,
                    descripcion: body.descripcion,
                    observaciones: body.observaciones
                });
                const producto = yield producto_Mdl_1.default.create(productoC);
                return res.json({
                    producto,
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
                            path: 'categoria'
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
                            disponible: status
                        }
                    ]
                };
                if (campoOrdenar && tipoOrden) {
                    options.sort = {
                        [campoOrdenar]: tipoOrden
                    };
                }
                const productos = yield producto_Mdl_1.default.paginate(consulta, options);
                return res.json({
                    productos,
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
                const productos = yield producto_Mdl_1.default.find({
                    categoria: _id
                });
                if (!productos) {
                    return res.status(404).json({
                        mensaje: 'No se encontraron los productos',
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    productos
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro la producto con id: ${_id}`,
                    ok: false
                });
            }
        });
    },
    obtenerPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const producto = yield producto_Mdl_1.default.findOne({
                    _id
                });
                if (!producto) {
                    return res.status(404).json({
                        mensaje: 'No se encontro la producto',
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    producto
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro la producto`,
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
                    disponible: true
                };
                const productos = yield producto_Mdl_1.default.paginate(consulta, options);
                if (!productos) {
                    return res.status(404).json({
                        err,
                        ok: false
                    });
                }
                return res.json({
                    productos,
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
