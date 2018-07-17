
var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();
var Usuario = require('../models/usuario');


/**
 *  OBTENER TODOS LOS USUARIOS
 */
app.get('/',( req,res,next ) => {
    Usuario.find( {}, 'nombre email img role').exec(
        (err, usuairos) => {
            if( err ){
                return res.status(500).json({
                    ok:false,
                    message:'Error cargando usuarios',
                    errors:err
                });
            }
    
            res.status(200).json({
                ok: true,
                message: usuairos
            });        
    
        });
});

app.post('/', (req, res)  => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        img: body.img,
        role: body.role
    });

    usuario.save( (err,usuarioGuardado) => {
        if( err ){
            return res.status(400).json({
                ok:false,
                message:'Error al crear usuario',
                errors:err
            });
        }   
        res.status(200).json({
            ok: true,
            usuario:usuarioGuardado
        });   
    });
});

app.put( '/:id', (req,res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById( id, (err,usuario) => {

        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if( !usuario ){
            return res.json(404).json({
                ok:false,
                mensaje: `El usuario con el id ${id} no existe`,
                errors: { message: `No existe un usuario con ese ID` }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( (error,usuarioGuardado) => {
            if( error ){
                return res.status(400).json({
                    ok:false,
                    message:'Error al actualizar usuario',
                    errors:error
                });
            }  
            res.status(200).json({
                ok:true,
                usuairo: usuarioGuardado
            });
        }); 
    });
});

module.exports = app;