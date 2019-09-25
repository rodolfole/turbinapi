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
const categoria_Mdl_1 = __importDefault(require("../models/categoria.Mdl"));
let err, _id;
exports.default = {
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const body = req.body;
                const categoria = yield categoria_Mdl_1.default.findOneAndUpdate({
                    _id
                }, body, {
                    new: true,
                    runValidators: true
                });
                if (!categoria) {
                    return res.status(400).json({
                        err,
                        mensaje: `Categoria con el id: ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    categoria,
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
                const categoria = yield categoria_Mdl_1.default.findOneAndUpdate({
                    _id
                }, cambiaEstado, {
                    new: true
                });
                if (!categoria) {
                    return res.status(400).json({
                        err,
                        mensaje: `Categoria con el id ${_id} no existe`,
                        ok: false
                    });
                }
                res.json({
                    categoria,
                    mensaje: `Categoria ${categoria.nombre} Borrada`,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    error: {
                        mensaje: `No se encontro la categoria con id: ${_id}`
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
                const categoriaC = new categoria_Mdl_1.default({
                    nombre: body.nombre,
                    empleado: req.empleado._id
                });
                const categoria = yield categoria_Mdl_1.default.create(categoriaC);
                return res.json({
                    categoria,
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
                    populate: {
                        path: 'empleado'
                    },
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
                const categorias = yield categoria_Mdl_1.default.paginate(consulta, options);
                return res.json({
                    categorias,
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
    obtenerPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const categoria = yield categoria_Mdl_1.default.findOne({
                    _id
                });
                if (!categoria) {
                    return res.status(404).json({
                        mensaje: 'No se encontro la categoria',
                        ok: false
                    });
                }
                return res.json({
                    categoria,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mensaje: `No se encontro la categoria con id: ${_id}`,
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
                const categorias = yield categoria_Mdl_1.default.paginate(consulta, options);
                if (!categorias) {
                    return res.status(404).json({
                        err,
                        ok: false
                    });
                }
                return res.json({
                    categorias,
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
