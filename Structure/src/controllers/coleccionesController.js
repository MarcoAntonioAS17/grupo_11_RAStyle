
require('dotenv').config();
const busquedaModels = require('../models/funcionesBusqueda');
const { validationResult } = require('express-validator');

// USO DE SEQUELIZE
const db = require("../database/models");
// %%%%%%%%%%%%%%%%
const {Storage} = require('@google-cloud/storage');
// Instantiate a storage client
const storage = new Storage();
const bucket = storage.bucket("gs://rastyle-9c7f2.appspot.com");

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
    createPost: async function(req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
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
            res.render('nuevoProducto.ejs', {errors: errors.mapped(), producto: esqueleto })
            return;
        } 

        const data = req.body;        
        data.enOferta ? data.enOferta=1 : data.enOferta=0;
        data.hotSale ? data.hotSale=1 : data.hotSale=0;
        
        const files = req.files;
        const enlaces = [];
        if (files.length > 0) {
            console.log("Tiene archivos");
            for(file of files){
                enlaces.push(`https://storage.googleapis.com/${bucket.name}/img_${Date.now()}_${file.originalname}`);
                subirArchivo(file, next);
            }
        }

        // Guardar Sequelize
        let newProduct ={
            //id: data.id,
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
        // Tabla de Fotos de Productos
        const productCreated = await db.Productos.create(newProduct);
        
        // Tabla de Colores de Productos
        for (let itemC of data.color) {
            db.ColoresProducto.create({
                Colores_id: parseInt(itemC,10),
                Productos_id: productCreated.null
            })
        }
        // Tabla de Tallas de Productos
        for (let itemT of data.talla) {
            db.TallasProducto.create({
                Tallas_id: parseInt(itemT,10),
                Productos_id: productCreated.null
            })
        }
        
        // Table de link a imagenes
        for (link of enlaces) {
            db.FotosProducto.create({
                path: link,
                id_Productos: productCreated.null
            }).catch(err => console.log(err))
        }
        
        res.redirect('/products/'+productCreated.null);

        //}).catch(err => console.log(err))
    },
    productosHombres: async function(req, res) {
        datosProductos = await db.Productos.findAll({where: {id_Categoria: 1}});
        res.render('listadoProductos.ejs',{'productos':datosProductos});
    },
    productosMujeres: async function(req, res) {
        datosProductos = await db.Productos.findAll({where: {id_Categoria: 2}});
        res.render('listadoProductos.ejs',{'productos':datosProductos});
    },
    productosPromociones: async function(req, res) {
        datosProductos = await db.Productos.findAll({where: {enOferta: true}});
        res.render('listadoProductos.ejs',{'productos':datosProductos});
    },
    productosHotSale: async function(req, res) {
        datosProductos = await db.Productos.findAll({where: {hotSale: true}});
        res.render('listadoProductos.ejs',{'productos':datosProductos});
    },
}

function subirArchivo(file,next){
    file.originalname = `img_${Date.now()}_${file.originalname}`;
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    
    blobStream.on('error', err => {
        next(err);
    });
    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        console.log(`https://storage.googleapis.com/${bucket.name}/${file.originalname}`);
    });
    blobStream.end(file.buffer);
}

module.exports = coleccionesController;