const themesController = require('../../controller/themes/themes.controller');
const Middleware = require('../../middleware/auth.controller');
module.exports = function(app) {

    app.get("/themes/list", Middleware.auth, themesController.listar);
    app.get("/themes/:id", Middleware.auth, themesController.consultarPorCodigo);
    app.post("/themes/update", Middleware.auth, themesController.actualizar);
    app.delete("/themes/delete/:id", Middleware.auth, themesController.eliminar);
}

