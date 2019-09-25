"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
const config_1 = require("../config/config");
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = config_1.config.port;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        this.io.on('connection', cliente => {
            socket.comanda(cliente, this.io);
            socket.desconectar(cliente);
            socket.stock(cliente, this.io);
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
