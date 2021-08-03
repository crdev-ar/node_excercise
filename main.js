//modulos requeridos
const http = require('http');
const urls = require('url');
const mensajes = require('./modulomensajes.js');

const fs = require('fs'); // Permite usar el estandar POSIX para el manejo de archivos

//puerto del servidor
const port = 2020;


//creo un objeto que contendra las rutas posibles 
var rutas = {};
//le asigno a cada ruta una funcion
rutas['/'] = index;
rutas['/grupo'] = grupo;

/*
Si mostramos el objeto en este momento quedaria asi: console.log(rutas);

explicado por mi:       ruta: funcion asociada,  ruta :   funcion asociada  
objeto por console.log { '/': [Function: index], '/grupo': [Function: grupo] }

*/


//creo el servidor
http.createServer((req, res) => {
    //obtengo el nombre de ruta del host seguido de '/':ej: localhost:2020/fff  -> obtendria como resultado -> /fff
    //el parse lo uso para convertir el contenido de la url en un objeto y poder usar las propiedades mediante el punto
    // .pathname, .host, etc.
    url = urls.parse(req.url).pathname;
    // ejecuto la funcion que se encarga de administrar las rutas
    //le tengo que pasar el objeto con las rutas, la variable que contiene el pathname  y el response para poder usar el write mas adelante
    AdminRutas(rutas,url,res);
    //le digo que termina la respuesta (response)
    res.end();
    
}).listen(port); //le digo el puerto en el que se tiene que ejecutar


//esta funcion se encarga de validar que la url ingresada exista en las que definimos antes
function AdminRutas(rutas, url, res) {
    //consulto si el objeto que contenga la ruta sea de tipo funcion (si la definimos anteriormente, le deberiamos haber asignado una funcion a cada objeto ->  rutas[url] = funcion)
    if (typeof rutas[url] === 'function') {
        //ejecuto la funcion asociada a dicha ruta (pathname)
        return rutas[url](res);
    }
}

//esta funcion se ejecuta cuando la url sea : localhost:2020/
function index(res) {
    //le digo que tipo de contenido es el que voy a ingresar
    res.writeHead(200, { 'Content-type': 'text/html' });
    //creo un contenido html para mostrar
    res.write('<h1>'+mensajes.mensaje1()+'</h1>');
    //le digo que termina la respuesta (response)
    res.end();
}

//esta funcion se ejecuta cuando la url sea : localhost:2020/grupo
function grupo(res) {
    //le digo que tipo de contenido es el que voy a ingresar
    res.writeHead(200, { 'Content-type': 'text/html' });
    //creo un contenido html para mostrar
    res.write(mensajes.mensaje2());
    //le digo que termina la respuesta (response)
    res.end();
}



function crearError(msj1, msj2)
{
    
    let msjGuardar = `${msj1} \n \n \n ${msj2}\n`;
    let opciones = 
    {
        open: 'a', // valor por defecto, sirve para abrir el archivo al final del archivo
        append:
        {
            encoding: 'utf8', // valor por defecto
            mode: 0o666, // valor por defecto
            flag: 'a' // valor por defecto
        }
    };
    // console.log('Abriendo el archivo...');
    fs.open('mensajes.txt', opciones.open, (err, fd) => {
        if (err) throw err;
        // console.log('Escribiendo en el archivo con permiso: ' + opciones.open);
        fs.appendFile(fd, msjGuardar, opciones.append, (err) => {
            fs.close(fd, (err) => {
                if (err) throw err;
            });
            if (err) throw err;
        });
    });
}

crearError(mensajes.mensaje1(),mensajes.mensaje2());

