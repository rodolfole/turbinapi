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
const roleSchema = new Schema({
    role: {
        type: String,
        index: true,
        unique: true,
        enum: rolesValidos,
        required: [true, 'El role es obligatorio'],
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
    }
});
roleSchema.plugin(mongoose_unique_validator_1.default, {
    message: '{PATH} debe de ser unico'
});
roleSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Role', roleSchema);
