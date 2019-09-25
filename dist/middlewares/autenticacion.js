"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
exports.auth = {
    verificaToken(req, res, next) {
        let token = req.get('token');
        jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    err,
                    mensaje: 'Token no válido',
                    ok: false
                });
            }
            req.empleado = decoded.empleado;
            next();
        });
    },
    verificaAdmin(req, res, next) {
        let empleado = req.empleado;
        if (empleado.role === 'Admin') {
            next();
        }
        else {
            return res.status(401).json({
                mensaje: 'El empleado no es Admin',
                ok: false
            });
        }
    },
    verificaAdminOMismoUsuario(req, res, next) {
        const empleado = req.empleado;
        const id = req.params._id;
        if (empleado.role === 'Admin' || empleado._id === id) {
            next();
            return;
        }
        else {
            return res.status(401).json({
                mensaje: 'Token incorrecto - No es ADMIN o el USUARIO LOGUEADO',
                ok: false
            });
        }
    },
    verificaAdminOEncargado(req, res, next) {
        const empleado = req.empleado;
        if (empleado.role === 'Admin' || empleado.role === 'Encargado') {
            next();
            return;
        }
        else {
            return res.status(401).json({
                mensaje: 'Token incorrecto - No es ADMIN o ENCARGADO',
                ok: false
            });
        }
    },
    verificaTokenImg(req, res, next) {
        let token = req.query.token;
        jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    err,
                    mensaje: 'Token no válido',
                    ok: false
                });
            }
            req.usuario = decoded.usuario;
            next();
        });
    }
};
