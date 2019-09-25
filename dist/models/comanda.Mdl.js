"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const status = {
    values: ['Cancelada', 'Completada', 'Despachada', 'Solicitada'],
    message: '{VALUE} no es un status valido'
};
const comandaSchema = new Schema({
    productos: [
        {
            producto: {
                type: Schema.Types.ObjectId,
                ref: 'Producto'
            },
            cantidad: Number,
            precioUni: Number,
            status: String
        }
    ],
    total: {
        type: Number,
        required: true
    },
    mesa: {
        type: Number,
        required: true
    },
    noComanda: {
        type: Number
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true
    },
    hora: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: status
    }
});
comandaSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Comanda', comandaSchema);
