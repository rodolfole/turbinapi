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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const empleado_Mdl_1 = __importDefault(require("../models/empleado.Mdl"));
const config_1 = require("../config/config");
exports.default = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const empleado = yield empleado_Mdl_1.default.findOne({
                    email: body.email
                });
                if (!empleado) {
                    return res.status(400).json({
                        mensaje: 'Empleado y/o contraseña incorrectos',
                        ok: false
                    });
                }
                if (!bcryptjs_1.default.compareSync(body.password, empleado.password)) {
                    return res.status(404).json({
                        mensaje: 'Empleado y/o contraseña incorrectos',
                        ok: false
                    });
                }
                let token = jsonwebtoken_1.default.sign({
                    empleado: empleado
                }, config_1.config.secret, {
                    expiresIn: config_1.config.caducidad
                });
                res.json({
                    empleado: empleado,
                    menu: obtenerMenu(empleado.role),
                    ok: true,
                    token
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
function obtenerMenu(role) {
    let menu = [
        {
            submenu: [
                {
                    titulo: 'Clientes',
                    icono: 'people',
                    url: '/clientes'
                },
                {
                    titulo: 'Cocina',
                    icono: 'kitchen',
                    url: '/cocina'
                },
                {
                    titulo: 'Compras',
                    icono: 'add_shopping_cart',
                    url: '/compras'
                },
                {
                    titulo: 'Empleados',
                    icono: 'person',
                    url: '/empleados'
                },
                {
                    titulo: 'Proveedores',
                    icono: 'business_center',
                    url: '/proveedores'
                },
                {
                    titulo: 'Sucursales',
                    icono: 'store',
                    url: '/sucursales'
                },
                {
                    titulo: 'Ventas',
                    icono: 'shopping_cart',
                    url: '/ventas'
                }
            ]
        }
    ];
    if (role === 'Admin') {
        menu[0].submenu.unshift({
            titulo: 'Categorias',
            icono: 'category',
            url: '/categorias'
        }, {
            titulo: 'Platillos',
            icono: 'fastfood',
            url: '/platillos'
        });
    }
    if (role === 'Mostrador') {
        let menu2 = [
            {
                submenu: [
                    {
                        titulo: 'Ventas',
                        icono: 'shopping_cart',
                        url: '/ventas'
                    }
                ]
            }
        ];
        return menu2[0].submenu;
    }
    return menu[0].submenu;
}
