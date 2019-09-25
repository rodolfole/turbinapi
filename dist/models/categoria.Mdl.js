"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const categoriaSchema = new Schema({
    nombre: {
        type: String,
        index: true,
        unique: true,
        lowercase: true,
        required: [true, 'El nombre es requerido']
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
categoriaSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Categoria', categoriaSchema);
