"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const pedidos = {
    values: ['Llevar', 'Restaurant'],
    message: '{VALUE} no es un pedido valido'
};
const Schema = mongoose_1.default.Schema;
const status = {
    values: ['Cancelada', 'Finalizada', 'Pendiente'],
    message: '{VALUE} no es un status valido'
};
const ventaSchema = new Schema({
    productos: [
        {
            producto: {
                type: Schema.Types.ObjectId,
                ref: 'Producto'
            },
            cantidad: Number
        }
    ],
    tipoPedido: {
        type: String,
        required: [true, 'El Tipo de Pedido es necesario'],
        enum: pedidos
    },
    total: {
        type: Number,
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
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: status
    }
});
ventaSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Venta', ventaSchema);
