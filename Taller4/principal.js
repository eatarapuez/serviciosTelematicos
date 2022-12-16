const express = require("express");
const app = express();
const fs = require("fs");
app.engine('html', require('ejs').renderFile);
//definen objetos necesarios para la construcción
const puerto = 5001;
const path = require('path'); 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/'));
//base de datos de usuarios
var users = [
    {
        "alejandro":"pass",
        "daniel":"pass2",
        "andres":"pass3"
    }
];
var userInfo = {
        "":""
}
var message = "", boton, cont, user, tips = "", endeudamiento, ingresos, deuda, estado = "";
app.get('/finance', (req,res)=>{
    fs.readFile(__dirname + "/data/consejos.txt", "utf-8", function(err, data){
        if(err) {
            throw err;
        }
        var lines = data.split('\n');
        tips = lines[Math.floor(Math.random()*lines.length)]
    })
    try{
        endeudamiento = parseInt(userInfo[user]["deuda"]) * 100 / parseInt(userInfo[user]["ingresos"])
    }catch(e){
        endeudamiento = ""
    }
    if(endeudamiento > 40){
        color = "borderedondocentrar"
        estado = "Estas al limite de tu capacidad de endeudamiento frente a entidades financieras, debes procurar nivelar tus gastos para ello te recomendamos estas Estrategias de pago acelerado de deuda \n https://www.tributi.com/mis-finanzas-personales/estrategias-para-salir-de-deudas "
    }else {
        color = "borderedondocentrarWin"
        estado = "Felicitaciones, tienes una capacidad de endeudamiento optima frente a las entidades financieras, aprovecha la oportunidad para ahorrar"
    }
    res.render(__dirname + "/pages/finance.html", {tips:tips, estado:estado,color:color});
});

app.get('/', (req,res)=>{
    res.render(__dirname + "/pages/home.html", {message:message,boton:boton});
});

app.get('/employ', (req,res)=>{
    res.render(__dirname + "/pages/employ.html", {message:message,boton:boton});
});

app.get('/login', (req,res)=>{
    res.render(__dirname + "/pages/login.html", {message:message,boton:boton});
});

app.get('/signin', (req,res)=>{
    res.render(__dirname + "/pages/signin.html", {message:message,boton:boton});
});

app.get('/user', (req,res)=>{
    if(userInfo[user]){
        ingresos = userInfo[user]["ingresos"]
        deuda = userInfo[user]["deuda"]
    }
    res.render(__dirname + "/pages/user.html", {message:message, user:user, ingresos:ingresos, deuda:deuda});
});
app.post('/signin', (req,res)=>{
    if(req.body.user && req.body.pass){
        users[0][req.body.user] = req.body.pass
        res.redirect('/login')
    }else{
        message = "Todos los campos son obligatorios"
        res.render(__dirname + "/pages/signin.html", {message:message,boton:boton});
    }
});
app.post('/user', (req,res)=>{
    if(req.body.ingresos && req.body.deuda){
        message = ""
        console.log("paso calculo")
        userInfo[user] = {"ingresos" : req.body.ingresos, "deuda" : req.body.deuda}
        console.log(userInfo)
        res.redirect('/user')
    }else{
        message = "Todos los campos son obligatorios"
        res.render(__dirname + "/pages/user.html", {message:message, user:user, ingresos:ingresos, deuda:deuda});  
    }
});
app.post('/', (req,res)=>{
    console.log(req.body.user)
    if(req.body.user && req.body.pass){
        if(users[0][req.body.user]){
            if(users[0][req.body.user]==req.body.pass){
                user = req.body.user;
                res.redirect('/finance')
            }else{
                cont = cont - 1;
                message = "contraseña incorrecta \n"+cont+" intentos restantes"
                if(cont==0){
                    message = "Sistema bloqueado espere 30 segundos"
                    boton = "disabled"
                    res.render(__dirname + "/pages/login.html", {message:message,boton:boton});                    
                    setTimeout(() => { 
                        boton = "enabled"
                        console.log("finalizo");
                        message = "Intente nuevamente"
                     }, 10000);   
                     cont = 3;                 
                }
            }
        }else{
            message = "El usuario "+req.body.user+" no existe"
        }
    }else{
        message = "Todos los campos son obligatorios"
    }
    if(boton == "enabled"){
        res.render(__dirname + "/pages/login.html", {message:message,boton:boton});
    }    
    });
app.listen(puerto, () => {console.log("Ejecutando express");});

