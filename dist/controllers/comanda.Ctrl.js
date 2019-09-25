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
const comanda_Mdl_1 = __importDefault(require("../models/comanda.Mdl"));
const lodash_1 = require("lodash");
let err, _id;
exports.default = {
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const body = req.body;
                let comandas = yield comanda_Mdl_1.default.findOne({
                    _id
                });
                let productos = [];
                let productosBD = [];
                let productosBDMap = [];
                let existe = [];
                let noExiste = [];
                comandas.productos.forEach((prod) => {
                    productosBD.push(prod);
                });
                body.productos.map((prod) => productos.push(prod.producto));
                productosBD.map((prod) => productosBDMap.push(prod.producto.toString()));
                existe = body.productos.filter((productoId) => {
                    return productosBDMap.includes(productoId.producto);
                });
                let existeS = lodash_1.sortBy(existe, '_id').reverse();
                noExiste = body.productos.filter((productoId) => {
                    return !productosBDMap.includes(productoId.producto);
                });
                if (noExiste.length >= 1) {
                    let prodTo = 0;
                    noExiste.forEach((elem) => {
                        prodTo += Number(elem.cantidad) * Number(elem.precioUni);
                    });
                    let total = Number(comandas.total) + prodTo;
                    const comanda = yield comanda_Mdl_1.default.findOneAndUpdate({
                        _id
                    }, {
                        $push: { productos: noExiste },
                        $set: { total: total }
                    }, {
                        new: true,
                        upsert: true
                    });
                    return res.json({
                        mensaje: 'Productos agregados a comanda',
                        ok: true,
                        comanda
                    });
                }
                else if (existe.length >= 1) {
                    let prodTo = 0;
                    existe.forEach((elem) => {
                        prodTo += Number(elem.cantidad) * Number(elem.precioUni);
                    });
                    let total = Number(comandas.total) + prodTo;
                    let comanda;
                    let comP;
                    let cantiTo = [];
                    let cantidadP;
                    let producs = [];
                    let existeS = lodash_1.sortBy(existe, '_id');
                    existeS.forEach((elem, index) => {
                        cantidadP = {
                            productos: [
                                {
                                    _id: productosBD[index]._id,
                                    producto: productosBD[index].producto,
                                    cantidad: Number(elem.cantidad) + Number(productosBD[index].cantidad),
                                    precioUni: productosBD[index].precioUni,
                                    status: productosBD[index].status
                                }
                            ]
                        };
                        producs.push(cantidadP.productos[0]);
                    });
                    let existeBDN = productosBD.filter((productoId) => {
                        return !productos.includes(productoId.producto.toString());
                    });
                    existeBDN.forEach((ele) => {
                        producs.push(ele);
                    });
                    comanda = yield comanda_Mdl_1.default.findOneAndUpdate({
                        _id
                    }, {
                        productos: producs,
                        total: total
                    }, {
                        new: true
                    });
                    return res.json({
                        mensaje: 'Comanda Actualizada',
                        ok: true,
                        comanda
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    },
    actualizarEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                let producsId = [];
                let prodUp;
                req.body.productos.forEach((elem) => {
                    prodUp = {
                        productos: [
                            {
                                _id: elem._id,
                                producto: elem.producto,
                                cantidad: elem.cantidad,
                                precioUni: elem.precioUni,
                                status: 'P'
                            }
                        ]
                    };
                    producsId.push(prodUp.productos[0]);
                });
                const comanda = yield comanda_Mdl_1.default.findOneAndUpdate({
                    _id
                }, {
                    productos: producsId
                }, {
                    new: true,
                    runValidators: true
                });
                if (!comanda) {
                    return res.status(400).json({
                        mensaje: `Comanda con el id ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    comanda: comanda
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
                const comanda = yield comanda_Mdl_1.default.findOneAndUpdate({
                    _id
                }, cambiaEstado, {
                    new: true
                });
                if (!comanda) {
                    return res.status(400).json({
                        err,
                        mensaje: `La comanda con el id ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    mensaje: `Comanda ${comanda._id} Cancelada`,
                    ok: true,
                    comanda
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
                let nComanda;
                const nCom = yield comanda_Mdl_1.default.find();
                if (nCom.length === 0) {
                    nComanda = Number(1);
                }
                for (var i = 0; i < nCom.length; i++) {
                    if (i == nCom.length - 1) {
                        nComanda = Number(nCom[i].noComanda) + 1;
                    }
                }
                const comandaC = new comanda_Mdl_1.default({
                    productos: [],
                    total: body.total,
                    mesa: body.mesa,
                    noComanda: nComanda,
                    empleado: req.empleado._id,
                    estado: body.estado
                });
                body.productos.forEach((elem) => {
                    comandaC.productos.push({
                        producto: elem.producto,
                        cantidad: elem.cantidad,
                        precioUni: elem.precioUni,
                        status: 'N'
                    });
                });
                const comanda = yield comanda_Mdl_1.default.create(comandaC);
                const comandaBD = yield comanda_Mdl_1.default.findOne({ _id: comanda._id }).populate('productos.producto');
                if (!comanda) {
                    return res.status(400).json({
                        err,
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    comanda: comandaBD
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
    despachar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const { estado } = req.query;
                const cambiaEstado = {
                    estado: estado
                };
                const comanda = yield comanda_Mdl_1.default.findOneAndUpdate({
                    _id
                }, cambiaEstado, {
                    new: true,
                    runValidators: true
                });
                if (!comanda) {
                    return res.status(400).json({
                        mensaje: `Comanda con el id ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    comanda: comanda
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
                const { pagina, porPagina, filtro, campoOrdenar, tipoOrden, estado } = req.query;
                const consulta = {
                    estado: estado
                };
                let comandas;
                if (!estado) {
                    comandas = yield comanda_Mdl_1.default.find({
                        estado: { $ne: 'Despachada' }
                    }).populate('productos.producto empleado');
                }
                else {
                    comandas = yield comanda_Mdl_1.default.find(consulta).populate('productos.producto empleado');
                }
                return res.json({
                    ok: true,
                    comandas
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
                const comanda = yield comanda_Mdl_1.default.findOne({
                    _id
                })
                    .populate('empleado')
                    .populate('productos.producto');
                if (!comanda) {
                    return res.status(500).json({
                        err,
                        mensaje: `La Comanda con el id ${_id} no existe`,
                        ok: false
                    });
                }
                return res.json({
                    ok: true,
                    comanda
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
