"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => { });
};
exports.comanda = (cliente, io) => {
    cliente.on('comanda', payload => {
        io.emit('comanda-solicitada', payload);
    });
};
exports.stock = (cliente, io) => {
    cliente.on('revisar-stock', payload => {
        payload.forEach((element) => {
            if (element.cantidad <= 5) {
                io.emit('surtir-ingrediente', element.nombre);
            }
        });
    });
};
