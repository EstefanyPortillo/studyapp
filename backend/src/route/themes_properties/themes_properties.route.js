const themes_propertiesController = require('../../controller/themes_properties/themes_properties.controller');
const Middleware = require('../../middleware/auth.controller');
module.exports = function (app){
    app.get("/themes_properties/list", Middleware.auth, themes_propertiesController.listar);
    app.get("/themes_properties/:id", Middleware.auth, themes_propertiesController.consultarPorCodigo);
    app.post("/themes_properties/update", Middleware.auth, themes_propertiesController.actualizar);
   app.delete("/themes_properties/delete/:id", Middleware.auth, themes_propertiesController.eliminar);
}
