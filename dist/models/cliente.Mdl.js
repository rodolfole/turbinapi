"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario'],
        lowercase: true
    },
    apellidoPat: {
        type: String,
        required: [true, 'El Apellido Paterno es necesario'],
        lowercase: true
    },
    apellidoMat: {
        type: String,
        required: [true, 'El Apellido Materno es necesario'],
        lowercase: true
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
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
    },
    telefono: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    referenciaDir: {
        type: String
    }
});
clienteSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Cliente', clienteSchema);
