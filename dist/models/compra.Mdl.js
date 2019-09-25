"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const compraSchema = new Schema({
    cantidad: {
        type: String,
        required: [true, 'La Cantidad es necesaria']
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario'],
        index: true,
        unique: true,
        lowercase: true
    },
    precioUni: {
        type: Number,
        required: [true, 'El Precio es necesario']
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: new Date()
    },
    img: {
        type: String,
        required: false
    },
    observaciones: {
        type: String,
        required: false
    }
});
compraSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Compra', compraSchema);
