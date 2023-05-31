const topicsController = require('../../controller/topics/topics.controller');
const Middleware = require('../../middleware/auth.controller');
module.exports = function (app) {

    app.get("/topics/list",Middleware.auth, topicsController.listar);
    app.get("/topics/:id",Middleware.auth, topicsController.consultarPorCodigo);
    app.post("/topics/update",Middleware.auth, topicsController.actualizar);
    app.delete("/topics/delete/:id",Middleware.auth, topicsController.eliminar);
} 
