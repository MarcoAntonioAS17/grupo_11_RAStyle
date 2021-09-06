const path = '../databases/productos.json';

const productos = require(path);
const busquedaModels = require('../models/funcionesBusqueda');
const { validationResult } = require('express-validator');
const fs = require('fs');

// USO DE SEQUELIZE
const { Op } = require("sequelize");
const db = require("../database/models");
// %%%%%%%%%%%%%%%%

const coleccionesController = {
    listadoProductos: function (req, res) {
        // Uso de Sequelize
        db.Productos.findAll({
            include: [{association: "fotosDelProducto"}],
            limit: 12
        }).then(function(todosProductos){
            res.render('listadoProductos.ejs',{'productos': todosProductos});
        })
    },
    busqueda: function(req,res) {
        res.render('busqueda.ejs');
    },
    leerFormularioBusqueda: async function(req,res) {
        const data = req.query;
        //const campoBusqueda = data.filtro;
        const clave = data.buscar.split(" ");
        const primerFiltro = data.tipo;
        let filtrados=[];
        let datosProductos=[];

        switch (primerFiltro) {
            case "hombres": 
                datosProductos = await db.Productos.findAll({where: {id_Categoria: 1}});
                filtrados = busquedaModels.buscarId(clave, datosProductos);
                if (filtrados.length<1) {
                    filtrados = busquedaModels.buscarNombre(clave, datosProductos);
                }
                break;
            case "mujeres": 
                datosProductos = await db.Productos.findAll({where: {id_Categoria: 2}});
                filtrados = busquedaModels.buscarId(clave, datosProductos);
                if (filtrados.length<1) {
                    filtrados = busquedaModels.buscarNombre(clave, datosProductos);
                }
                break;
            case "unisex": 
                datosProductos = await db.Productos.findAll({where: {id_Categoria: 3}});
                filtrados = busquedaModels.buscarId(clave, datosProductos);
                if (filtrados.length<1) {
                    filtrados = busquedaModels.buscarNombre(clave, datosProductos);
                }
                break;
            case "hotsale": 
                datosProductos = await db.Productos.findAll({where: {hotSale: true}});
                filtrados = busquedaModels.buscarId(clave, datosProductos);
                if (filtrados.length<1) {
                    filtrados = busquedaModels.buscarNombre(clave, datosProductos);
                }
                break;
            case "enOferta": 
                datosProductos = await db.Productos.findAll({where: {enOferta: true}});
                filtrados = busquedaModels.buscarId(clave, datosProductos);
                if (filtrados.length<1) {
                    filtrados = busquedaModels.buscarNombre(clave, datosProductos);
                }
                break;
            default: 
                datosProductos = await db.Productos.findAll();
                filtrados = busquedaModels.buscarId(clave, datosProductos);
                if (filtrados.length<1) {
                    filtrados = busquedaModels.buscarNombre(clave, datosProductos);
                }
                console.log(filtrados)
        }
        
        if (filtrados && filtrados.length > 0) {
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
                Nombre: "",
                id_Colecciones: 1,
                id_Categoria: 1,
                id_Subcategoria: 1,
                precio: 0,
                Descripcion: "",
                photos: [],
                color: [],
                talla: [],
                Cantidad: 0,
                enOferta: false,
                precioOferta: 0,
                hotSale: false
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
        //console.log("YA ESTOY AQUI")
        const data = req.body;
        db.Productos.findAll().then(products=> {
            let idProducto = (parseInt(products[products.length - 1].id, 10) + 1).toString();
            idProducto = idProducto.padStart(6,"000000");
            data.id = idProducto;
        
        
        //Array.isArray(data.color) === true ? "" : color2.push(data.color);
        //data.color = color2;
        data.enOferta ? data.enOferta=true : data.enOferta=false;
        data.hotSale ? data.hotSale=true : data.hotSale=false;
        data.photos=[];

        // Guardar Sequelize
        let newProduct ={
            id: data.id,
            Nombre: data.Nombre,
            id_Colecciones: parseInt(data.id_Colecciones,10),
            id_Categoria: parseInt(data.id_Categoria, 10),
            id_Subcategoria: parseInt(data.id_Subcategoria,10),
            precio: data.precio,
            Descripcion: data.Descripcion,
            Cantidad: data.Cantidad,
            enOferta: data.enOferta,
            precioOferta: data.precioOferta,
            hotSale: data.hotSale
        }

        db.Productos.create(newProduct)
        // Tabla de Fotos de Productos
        
        // Tabla de Colores de Productos
        for (let itemC of data.color) {
            db.ColoresProducto.create({
                Colores_id: parseInt(itemC,10),
                Productos_id: newProduct.id
            })
        }
        // Tabla de Tallas de Productos
        for (let itemT of data.talla) {
            db.TallasProducto.create({
                Tallas_id: parseInt(itemT,10),
                Productos_id: newProduct.id
            })
        } 

        /*let files = req.files;
        files.forEach(item => {
            data.photos.push(`/images/productos/${item.filename}`);
        }); 

        productos.push(data);
        fs.writeFileSync(__dirname+'/../databases/productos.json', JSON.stringify(productos,null,2)); */
        
        res.redirect('/products/'+newProduct.id);

        }).catch(err => console.log(err))
    }
}

module.exports = coleccionesController;