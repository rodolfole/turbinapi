"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const proveedorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario'],
        index: true,
        unique: true,
        lowercase: true
    },
    telefono: {
        type: String,
        required: [true, 'El Telefono es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La Dirección es necesaria'],
        lowercase: true
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        required: false
    }
});
proveedorSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Proveedor', proveedorSchema);
