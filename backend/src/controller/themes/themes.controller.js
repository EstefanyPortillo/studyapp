const { sequelize } = require("../../connection");
const { ThemesModel } = require("../../model/themes.model");
const ThemesService = require('../../service/themes.service');

///cuando se trata de listar es mejor usar SQL puro por cuestion de tiempo
const listar = async function (req, res) {
    console.log("listar temas");
    try {
        const themes = await ThemesService.listar(req.query.filtro || '');
        if (themes) {
            // en users[0] se encuentra el listado de lo que se recupera desde el sql
            res.json({
                success: true,
                temas: themes
            });
        } else {
            res.json({
                success: true,
                temas: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar 1 tema por codigo");
    try {
        const themesModelResult = await ThemesService.consultarPorCodigo(req.params.id);
        if (themesModelResult) {
            res.json({
                success: true,
                temas: themesModelResult
            });
        } else {
            res.json({
                success: true,
                temas: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar temas");
    let temaRetorno = null; //guarda el tema que se va incluir o editar;
    try {
        let temaRetorno = await ThemesService.actualizar(
            req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.description,
            req.body.keywords,
            req.body.owner_user_id
        );

        res.json({
            success: true,
            themes: temaRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const eliminar = async function (req, res) {
    console.log("eliminar temas");
   
    try {
        const temaRetorno =  await ThemesService.eliminar(req.params.id);
        res.json({
            success: temaRetorno,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};

