"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const sucursalSchema = new Schema({
    nombre: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'El nombre es obligatorio'],
        lowercase: true
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación es obligatoria'],
        lowercase: true
    },
    referenciaUbi: {
        type: String,
        required: [true, 'La referncia es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
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
sucursalSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Sucursal', sucursalSchema);
