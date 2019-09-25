"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = {
    obtener(req, res) {
        const tipo = req.params.tipo;
        const img = req.params.img;
        const pathImagen = path_1.default.resolve(__dirname, `../images/${tipo}/${img}`);
        if (fs_1.default.existsSync(pathImagen)) {
            res.sendFile(pathImagen);
        }
        else {
            const noImagePath = path_1.default.resolve(__dirname, '../assets/noimage.png');
            res.sendFile(noImagePath);
        }
    }
};
