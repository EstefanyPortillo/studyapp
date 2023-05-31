const { sequelize } = require("../../connection");
const { ThemesPropertiesModel } = require("../../model/themes_properties.model");
const ThemesPropertiesService = require('../../service/themes_properties.service');


const listar = async function (req, res) {
    console.log("listar temas/propiedades");
    try {
        const themes_properties = await ThemesPropertiesService.listar(req.query.filtro || '');
        if (themes_properties) {
           
            res.json({
                success: true,
                temas_propiedades: themes_properties
            });
        } else {
            res.json({
                success: true,
                temas_propiedades: []
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
    console.log("consultar 1 tema/propiedad por codigo");
    try {
        const themes_propertiesModelResult = await ThemesPropertiesService.consultarPorCodigo(req.params.id);
        if (themes_propertiesModelResult) {
            res.json({
                success: true,
                temas_propiedades: themes_propertiesModelResult
            });
        } else {
            res.json({
                success: true,
                temas_propiedades: null
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
    console.log("actualizar temas propiedades");
    let tema_propiedadRetorno = null; 
    try {
        let tema_propiedadRetorno = await ThemesPropertiesService.actualizar(
            req.body.id,
            req.body.theme_id,
            req.body.property_name,
            req.body.property_value
        );

        res.json({
            success: true,
            themes_properties: tema_propiedadRetorno
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
    console.log("eliminar temas propiedades");
   
    try {
        const tema_propiedadRetorno =  await ThemesPropertiesService.eliminar(req.params.id);
        res.json({
            success: tema_propiedadRetorno,
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
