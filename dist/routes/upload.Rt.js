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
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const empleado_Mdl_1 = __importDefault(require("../models/empleado.Mdl"));
const producto_Mdl_1 = __importDefault(require("../models/producto.Mdl"));
const proveedor_Mdl_1 = __importDefault(require("../models/proveedor.Mdl"));
const sucursal_Mdl_1 = __importDefault(require("../models/sucursal.Mdl"));
const categoria_Mdl_1 = __importDefault(require("../models/categoria.Mdl"));
const compra_Mdl_1 = __importDefault(require("../models/compra.Mdl"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.uploadRouter = express_1.default.Router();
exports.uploadRouter.use(express_fileupload_1.default());
exports.uploadRouter.route('/:tipo/:id').put(function (req, res) {
    const tipo = req.params.tipo;
    const id = req.params.id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }
    let tiposValidos = [
        'categorias',
        'compras',
        'empleados',
        'productos',
        'proveedores',
        'sucursales'
    ];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', ')
            }
        });
    }
    let imagen = req.files.imagen;
    let nombreCortado = imagen.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    let extensionesValidas = [
        'png',
        'jpg',
        'gif',
        'jpeg',
        'PNG',
        'JPG',
        'GIF',
        'JPEG'
    ];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', ')
            }
        });
    }
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
    let ruta = path_1.default.resolve(__dirname, `../images/${tipo}/${nombreArchivo}`);
    imagen.mv(ruta, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (tipo === 'categorias') {
            subirImagen(id, res, nombreArchivo, regresarModel(categoria_Mdl_1.default), 'categorias');
        }
        else if (tipo === 'compras') {
            subirImagen(id, res, nombreArchivo, regresarModel(compra_Mdl_1.default), 'compras');
        }
        else if (tipo === 'empleados') {
            subirImagen(id, res, nombreArchivo, empleado_Mdl_1.default, 'empleados');
        }
        else if (tipo === 'productos') {
            subirImagen(id, res, nombreArchivo, producto_Mdl_1.default, 'productos');
        }
        else if (tipo === 'proveedores') {
            subirImagen(id, res, nombreArchivo, regresarModel(proveedor_Mdl_1.default), 'proveedores');
        }
        else if (tipo === 'sucursales') {
            subirImagen(id, res, nombreArchivo, regresarModel(sucursal_Mdl_1.default), 'sucursales');
        }
    });
});
function subirImagen(id, res, nombreArchivo, modelo, tipo) {
    return __awaiter(this, void 0, void 0, function* () {
        let modelDB = yield modelo.findOne({ _id: id }, (err, modeloDB) => {
            if (err) {
                borraImagen(nombreArchivo, tipo);
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!modeloDB) {
                borraImagen(nombreArchivo, tipo);
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `${modelo} no existe`
                    }
                });
            }
            borraImagen(modeloDB.img, tipo);
        });
        let mod = yield modelo.findOneAndUpdate({ _id: id }, { img: nombreArchivo }, {
            new: true,
            runValidators: true
        });
        return res.json({
            ok: true,
            modelo: mod,
            img: nombreArchivo
        });
    });
}
function regresarModel(modelo) {
    if (modelo === categoria_Mdl_1.default) {
        return categoria_Mdl_1.default;
    }
    if (modelo === compra_Mdl_1.default) {
        return compra_Mdl_1.default;
    }
    if (modelo === empleado_Mdl_1.default) {
        return empleado_Mdl_1.default;
    }
    if (modelo === producto_Mdl_1.default) {
        return producto_Mdl_1.default;
    }
    if (modelo === proveedor_Mdl_1.default) {
        return proveedor_Mdl_1.default;
    }
    if (modelo === sucursal_Mdl_1.default) {
        return sucursal_Mdl_1.default;
    }
}
function regresarResp(res, nombreArchivo, modeloGuardado) {
    return res.json({
        ok: true,
        modelo: modeloGuardado,
        img: nombreArchivo
    });
}
function borraImagen(nombreImagen, tipo) {
    let pathImagen = path_1.default.resolve(__dirname, `../images/${tipo}/${nombreImagen}`);
    if (fs_1.default.existsSync(pathImagen)) {
        fs_1.default.unlinkSync(pathImagen);
    }
}
