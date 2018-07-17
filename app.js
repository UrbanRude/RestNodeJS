var express = require ('express');
var mongoose = require('mongoose');


// IMPORTACION DE LAS RUTAS
var appRoutes = require('./routes/app');
var usuariosRoutes = require('./routes/usuario');

var app = express();

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true }, ( err, res) => {
    if ( err ) throw err;
    console.log(`Database: hospitalDB`, 'online');
});

// BODY PARSE
var bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

// RUTAS 
app.use( '/',appRoutes );
app.use('/usuarios',usuariosRoutes);

// ESCUHCAR PETICIONES
app.listen( 3000,() => {
    console.log(`Express server puerto 3000 \x1b[32m%s\x1b[0m`,`online `);
});