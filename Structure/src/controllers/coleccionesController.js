const path = '../databases/productos.json';

const productos = require(path);
const busquedaModels = require('../models/funcionesBusqueda');
const { validationResult } = require('express-validator');
const fs = require('fs');

const coleccionesController = {
    listadoProductos: function (req, res) {
        res.render('listadoProductos.ejs',{'productos':productos});
    },
    busqueda: function(req,res) {
        res.render('busqueda.ejs');
    },
    leerFormularioBusqueda: function(req,res) {
        const data = req.query;
        const field = data.filtro;
        const clave = data.buscar.split(" ");
        const tipo = data.tipo;
        let filtrados=[];
        let datosProductos=[];

        switch (tipo) {
            case "hombres": 
                datosProductos = productos.filter(item => {return item.categoria==="Hombre"});
                filtrados = busquedaModels.elegirBusqueda(clave, datosProductos, field);
                break;
            case "mujeres": 
                datosProductos = productos.filter(item => {return item.categoria==="Mujer"});
                filtrados = busquedaModels.elegirBusqueda(clave, datosProductos, field);
                break;
            case "hotsale": 
                datosProductos = productos.filter(item => {return item.hotsale===true});
                filtrados = busquedaModels.elegirBusqueda(clave, datosProductos, field);
                break;
            case "enOferta": 
                datosProductos = productos.filter(item => {return item.enOferta===true});
                filtrados = busquedaModels.elegirBusqueda(clave, datosProductos, field);
                break;
            default: 
                filtrados = busquedaModels.elegirBusqueda(clave,productos,field);
        }
        
        if (filtrados.length > 0) {
            res.render('listadoProductos.ejs',{'productos':filtrados});
        } else {
            res.render('busquedaVacia.ejs')
        }
    },
    create: function(req,res) {
        res.render('nuevoProducto.ejs');
    },
    createPost: function(req,res,next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            //console.log("=========Datos======");
            //console.log(req.body);
            //console.log("=========Errores======");
            //console.log(errors.mapped());
            let esqueleto = {
                id: "",
                nombre: "",
                coleccion: '1',
                categoria: 'Hombre',
                subcategoria: '1',
                precio: 0,
                descripcion: "",
                photos: [],
                color: [],
                talla: [],
                cantidad: 0,
                enOferta: false,
                precioOferta: 0,
                hotsale: false
            };
            esqueleto = {
                ...esqueleto,
                ...req.body
            }
            //console.log("------------Datos y Esqueleto----------");
            //console.log(esqueleto);
            if (typeof esqueleto.color === "object") {
                esqueleto = {
                    ...esqueleto,
                    color: [...esqueleto.color],
                };
            } else if (typeof esqueleto.color === "string"){
                esqueleto = {
                    ...esqueleto,
                    color: [esqueleto.color],
                };
            }
            
            if (typeof esqueleto.talla === "object") {
                esqueleto = {
                    ...esqueleto,
                    talla: [...esqueleto.talla],
                };
            } else if (typeof esqueleto.talla === "string"){
                esqueleto.talla = [esqueleto.talla];
            }

            //console.log("=========Esqueleto======");
            //console.log(esqueleto);
            res.render('nuevoProducto.ejs', {errors: errors.mapped(), producto: esqueleto })
            return;
        } 

        // FIN DE VALIDACIONES
        console.log("YA ESTOY AQUI")
        const data = req.body;
        let idProducto = (productos.length + 1).toString();
        idProducto = idProducto.padStart(5,"00000");
        let color2 = [];

        Array.isArray(data.color) === true ? "" : color2.push(data.color);
        data.color = color2;
        data.enOferta ? data.enOferta=true : data.enOferta=false;
        data.hotsale ? data.hotsale=true : data.hotsale=false;
        data.id = idProducto;
        data.photos=[];

        let files = req.files;
        files.forEach(item => {
            data.photos.push(`/images/productos/${item.filename}`);
        });

        productos.push(data);
        fs.writeFileSync(__dirname+'/../databases/productos.json', JSON.stringify(productos));
        
        res.redirect('/products/'+idProducto);
    }
}

module.exports = coleccionesController;