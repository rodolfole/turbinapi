"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_pdf_1 = __importDefault(require("express-pdf"));
const server_1 = __importDefault(require("./classes/server"));
const server = server_1.default.instance;
const routes_1 = require("./config/routes");
// Importamos el módulo de mongoose para poder conectarnos a MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
// Importamos config, el cual contiene parametros para establecer el puerto y la BD
const config_1 = require("./config/config");
// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set('useCreateIndex', true);
// Usamos el método connect para conectarnos a nuestra base de datos
mongoose_1.default
    .connect(config_1.config.db, {
    useNewUrlParser: true
})
    .then(() => {
    // Cuando se realiza la conexión, lanzamos este mensaje por consola
    console.log('La conexión a MongoDB se ha realizado correctamente!!');
})
    .catch(err => console.log(err));
// Si no se conecta correctamente escupimos el error
server.app.use(cors_1.default());
server.app.use(body_parser_1.default.json());
server.app.use(body_parser_1.default.urlencoded({
    extended: false
}));
server.app.use(express_pdf_1.default);
server.app.use('/api', routes_1.router);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
