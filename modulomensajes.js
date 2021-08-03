const mensajes = {};

var mensaje1  = 'Mi Primer Servidor en node js';
var mensaje2 = 'Cristian Rios';



function muestraMensaje1(){
    return mensaje1;
}

function muestraMensaje2(){
    return mensaje2;
}


mensajes.mensaje1= muestraMensaje1
mensajes.mensaje2=muestraMensaje2

module.exports = mensajes;

