"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getTemplateBody(compras) {
        const comprasD = compras.docs;
        const templateBody = `
            <div class="container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>
                                <h4>Nombre</h4>
                            </th>
                            <th>
                                <h4>Precio</h4>
                            </th>
                            <th>
                                <h4>Cantidad</h4>
                            </th>
                            <th>
                                <h4>Proveedor</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    ${comprasD
            .map((item, i) => `
                        <tr>
                            <td>${item.nombre}</td>
                            <td>${item.precioUni}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.proveedor.nombre}</td>
                        </tr>`.trim())
            .join('')}
                    </tbody>
                </table>
            </div>`;
        return templateBody;
    },
    getVentaTemplate(templateBody) {
        const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        @import url(https://fonts.googleapis.com/css?family=Roboto);
        body, h1, h2, h3, h4, h5, h6 {
          font-family: 'Roboto', serif, Arial;
        }
      </style>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Venta</title>
    </head>
    <body>
        ${templateBody}
    </body>
    </html>
  `;
        return html;
    }
};
