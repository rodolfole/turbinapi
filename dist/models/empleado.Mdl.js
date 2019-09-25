"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const rolesValidos = {
    values: ['Admin', 'Encargado', 'Mostrador'],
    message: '{VALUE} no es un rol valido'
};
const Schema = mongoose_1.default.Schema;
const empleadoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario']
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
    telefono: {
        type: String,
        required: [true, 'El Telefono es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La Dirección es necesaria'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'El Correo es necesario'],
        index: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es obligatoria']
    },
    empleado: {
        type: Schema.Types.ObjectId
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        required: false
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'Mostrador',
        enum: rolesValidos
    }
});
empleadoSchema.methods.toJSON = function () {
    let empleado = this;
    let empleadoObject = empleado.toObject();
    delete empleadoObject.password;
    return empleadoObject;
};
empleadoSchema.plugin(mongoose_unique_validator_1.default, {
    message: '{PATH} debe de ser unico'
});
empleadoSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Empleado', empleadoSchema);
