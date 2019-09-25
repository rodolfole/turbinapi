"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const productosValidos = {
    values: ['Individual', 'Paquete'],
    message: '{VALUE} no es un producto valido'
};
const Schema = mongoose_1.default.Schema;
const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        index: true,
        unique: true,
        lowercase: true
    },
    tipoPro: {
        type: String,
        enum: productosValidos,
        required: [true, 'El Tipo de Producto es necesario']
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio únitario es necesario']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es necesario']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
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
    disponible: {
        type: Boolean,
        default: true
    },
    descripcion: {
        type: String,
        required: false
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
productoSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Producto', productoSchema);
