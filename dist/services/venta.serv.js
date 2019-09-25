"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getTemplateBody(venta) {
        const templateBody = `
            <div class="container">
                <div class="row">
                    <div class="col-xs-6">
                    </div>
                    <div class="col-xs-6 text-right">
                        <h1>INVOICE</h1>
                        <h1>
                            <small>Nodejs Invoice</small>
                        </h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4>De:
                                    <a>${venta.empleado.nombre}</a>
                                </h4>
                            </div>
                            <div class="panel-body">
                                <p>
                                ${venta.empleado.email}
                                    <br>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-5 col-xs-offset-2 text-right">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4>Para :
                                    <a>${venta.cliente.nombre} ${venta.cliente.apellidoPat} ${venta.cliente.apellidoMat}</a>
                                </h4>
                            </div>
                            <div class="panel-body">
                                <p>
                                    malik@gmail.com
                                    <br>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>
                                <h4>Qty</h4>
                            </th>
                            <th>
                                <h4>Rate</h4>
                            </th>
                            <th>
                                <h4>Tax</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10</td>
                            <td>10</td>
                            <td>
                                1
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="row text-right">
                    <div class="col-xs-2 col-xs-offset-8">
                        <p>
                            <strong>
                                Sub Total :
                                <br> TAX :
                                <br> Total :
                                <br>
                            </strong>
                        </p>
                    </div>
                    <div class="col-xs-2">
                        <strong>
                            $100
                            <br> $200
                            <br>$${venta.total}
                            <br>
                        </strong>
                    </div>
                </div>
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
