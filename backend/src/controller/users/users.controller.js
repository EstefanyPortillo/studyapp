const {sequelize} = require("../../connection");
const {UserModel} = require("../../model/user.model");
const UserService = require('../../service/users.service');
const jwt = require ('jsonwebtoken');

const listarController = async function(req, res) {
    console.log("listar usuarios controller");
    try {
        const users = await UserService.listarService(req.query.filtro || '');
        
        if (users){
            res.json({
                success : true, 
                usuarios : users
            });
        } else {
            res.json({
                success : true, 
                usuarios : []
            });
        }        
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }

};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar 1 usuario por codigo");
    try {
        //Buscar en la Base de datos por codigo
        const userModelResult = await UserModel.findByPk(req.params.id);

        if (userModelResult) {
            res.json({
                success : true, 
                usuario : userModelResult
            });
        } else {
            res.json({
                success : true, 
                usuario : null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }

};

const actualizar = async function(req, res) {
    console.log("actualizar usuarios controller");
    //Variables
    let usuarioRetorno = null;    //Guardara el usuario que se va incluir o editar.
     
    try {
        usuarioRetorno = await UserService.actualizar(  req.body.id, 
                                                        req.body.name, 
                                                        req.body.last_name, 
                                                        req.body.avatar, 
                                                        req.body.email, 
                                                        req.body.password, 
                                                        req.body.deleted);
        res.json({
            success : true, 
            user : usuarioRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");

    //Borrado fisico
    //UserModel.destroy(req.params.id);
    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req.params.id);
            
        res.json({
            success : true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }
};

const login = async function( req, res) {
    console.log ("login usuarios");
    try {
    // Buscar en la base de datos el usuario con el correo electrónico y contraseña
        const usersDB = await sequelize.query("SELECT * FROM users WHERE email ='"+ req.body.email + "' AND password = '" + req.body.password + "'");
        console.log ("users",usersDB);
        let user = null;
        // Verificar si se encontraron resultados en la consulta a la base de datos y asienar el primer resultado
        if (usersDB. length > 0 && usersDB[0].length > 0) {
            user = usersDB[0][0]; 
            // Asignar el primer registro encontrado a la variable "user*
            if(user.token){
                res.json({
                    success: false,
                    error: 'usuario ya autenticado'
                });
            }
            let token= jwt.sign({
                codigo: user.id,
                name: user.name,
                last_name: user.last_name,
                email:user.email,
                avatar: user.avatar
            },'passwd');
            const usersDBUpdate = await sequelize.query("UPDATE users set token= '"+ token + "' WHERE id = "+user.id)
            //sise encuentra eucuarto en la baco de datos ce mostrara true v eusuario.
            res.json({
                success: true,
                user
            });
        } else{
            res.json({
                success: false,
                error: 'usuario no encontrado'
            });
                
        }
        // Si no se encuentra el usuario en la base de datos,
       
    }catch (error) {
        // Si ocurre un error, devoLver
        console.log(error);
        res.json ({
            success: false,
            error: error .message
        });
    }
    
};
const logout = async function( req, res) {
    console.log(res.locals);
   try {
    const userDb= await sequelize.query("UPDATE users set token=null where id= " +res.locals.userId+ "");
    res.json({
        success:true
    })
   } catch (error) {
    res.json({
        success:false,
        error: error.message
    })
   }
    
};

module.exports = {
    listarController, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar, login, logout
};