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
    res.send("Nombres: "+name.toString()+"<br/><a href=\"http://localhost:5000\">Volver</a>");
});
app.get('/datanamesex', (req,res)=>{
    res.send("Nombres: "+name.toString()+"<br/>Genero: "+sex.toString()+"<br/> <a href=\"http://localhost:5000\">Volver</a>");
});
app.get('/allinfo', (req,res)=>{
    res.send("Los datos son mostrados por consola<br/> <a href=\"http://localhost:5000\">Volver</a>")
    console.log(" Nombres: "+name.toString()+"\n Edad: "+age.toString()+"\n Genero: "+sex.toString()+"\n Telefono: "+tel.toString());
});
app.get('/tel', (req,res)=>{
    res.send("Los datos son mostrados por consola<br/> <a href=\"http://localhost:5000\">Volver</a>")
    console.log(" Nombres: "+name.toString()+"\n Telefono: "+tel.toString());
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
function doupload() {
    texto = texto+"\n"+'<button type="button" class="collapsible">Texto'+x+'</button><div class="content"><p>Esto es un texto '+x+'</p></div>';
        document.getElementById("fields").innerHTML = texto;
        x = x+1;
    let data = document.getElementById("file").files[0];
    let entry = document.getElementById("file").files[0];
    console.log('doupload',entry,data)
    fetch('uploads/' + encodeURIComponent(entry.name), {method:'PUT',body:data});
    alert('your file has been uploaded');
    //location.reload();
};