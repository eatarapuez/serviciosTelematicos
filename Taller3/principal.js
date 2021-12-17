const express = require("express");
const app = express();
const puerto = 5000;
let name = [];
let age = [];
let tel = [];
let sex = [];

//Módulo para juntar palabras y construir una ruta.
const path = require('path'); 
//Extrae información de la solicitud entrante.              
const bodyParser = require('body-parser');
//Recupera información en forma de texto unicamente.
app.use(bodyParser.urlencoded({extended: false}));
//Solicitud atendida y redirigida al archivo formulario.
app.get('/', (req,res)=>{
    //__dirname indica la ubicación del proyecto
    res.sendFile(path.join(__dirname, '/formulario.html'));
});
app.get('/dataname', (req,res)=>{
    var tabla = "<table align=\"center\" border=\"1px solid black\">"
    tabla = tabla + "<tr><th>Nombre</th><th>Edad</th><th>Telefono</th><th>Genero</th></tr>"
    for(const nombre in name){
        tabla = tabla + "<tr><th>"+name[nombre]+"</th><th>"+age[nombre]+"</th><th>"+tel[nombre]+"</th><th>"+sex[nombre]+"</th></tr>"
    }
    tabla = tabla + "</table>"
    res.send(tabla);
});
//Captura de información usando post
app.post('/', (req,res)=>{
    name.push(req.body.name);
    age.push(req.body.age);
    tel.push(req.body.tel);
    sex.push(req.body.sex);
    res.sendFile(path.join(__dirname, '/formulario.html'));
    });
app.listen(puerto, () => {console.log("Ejecutando express");});