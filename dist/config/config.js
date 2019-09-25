"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    port: Number(process.env.PORT) || 3000,
    entorno: process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
    caducidad: process.env.CADUCIDAD_TOKEN = '1d',
    secret: process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo',
    db: process.env.URLDB || 'mongodb://localhost:27017/turbina',
    google: process.env.CLIENT_ID ||
        'ntrjghti'
};
