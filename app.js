var express = require ('express');
var mongoose = require('mongoose');

var app = express();

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true }, ( err, res) => {
    if ( err ) throw err;
    console.log(`Database: hospitalDB`, 'online');
});

app.get('/',( req,res,next ) => {
    res.status(200).json({
        ok: true,
        message: 'Peticion realizada correctamente'
    });
});

app.listen( 3000,() => {
    console.log(`Express server puerto 3000 \x1b[32m%s\x1b[0m`,`online `);
});