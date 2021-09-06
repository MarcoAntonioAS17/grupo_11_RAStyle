const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const db = require("../database/models");

const detalleProductoController = {
    index: function(req,res) {
        const idProducto = req.params.idProducto;
        db.Productos.findOne({
            where: {id: idProducto},
            include: [
                {association: "fotosDelProducto"},
                {association: "tallasDelProducto"},
                {association: "coloresDelProducto"}
            ]
        }).then(item => {
            res.render('detalleProducto.ejs',{producto: item})
        })
        //let productoSelect = productos.find(producto=>producto.id===idProducto);
        //res.render('detalleProducto.ejs',{"producto":productoSelect});
    },
    editar: (req, res) => {
        const idProducto = req.params.idProducto;
        db.Productos.findOne({
            where: {id: idProducto},
            include: [
                {association: "fotosDelProducto"},
                {association: "tallasDelProducto"},
                {association: "coloresDelProducto"}
            ]
        }).then(item => {
            if (item != undefined) {
                res.render('editarProductos.ejs', {"producto": item});
            } else {
                res.render('busquedaVacia.ejs')
            }
        })
        /* let productSelect = productos.find(producto => producto.id === idProducto);
        if (productSelect != undefined) {
            res.render('editarProductos.ejs', {"producto":productSelect});
        } else {
            res.render('busquedaVacia.ejs')
        } */
    },
    actualizar: (req, res) => {
        let errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            console.log("=========Datos======");
            console.log(req.body);
            console.log("=========Errores======");
            console.log(errors.mapped());
            let esqueleto = {
                id: req.params.idProducto,
                nombre: "",
                coleccion: "1",
                categoria: "Hombres",
                subcategoria: "1",
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
            console.log("------------Datos y Esqueleto----------");
            console.log(esqueleto);
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

            console.log("=========Esqueleto======");
            console.log(esqueleto);
            res.render('editarProductos.ejs', {errors: errors.mapped(), "producto": esqueleto })
            return;
        } 

        const idProducto = req.params.idProducto;
        const data = req.body;
        let productoIndex = productos.findIndex(producto=>producto.id===idProducto);
        let files = req.files;

        productos[productoIndex] = { 
            ...productos[productoIndex],
            nombre: data.nombre,
            categoria: data.categoria,
            subcategoria: data.subcategoria,
            coleccion: data.coleccion,
            precio: parseFloat(data.precio),
            descripcion: data.descripcion,
            talla: [...data.talla],
            cantidad: parseInt(data.cantidad),
            enOferta: data.enOferta == 'on' ? true : false,
            hotsale: data.hotsale == 'on' ? true : false,
            precioOferta: parseFloat(data.precioOferta)
        };

        files.forEach(item => {
            console.log("/images/productos/"+item.filename);
            productos[productoIndex].photos.push(`/images/productos/${item.filename}`);
        });

        if (typeof data.color === "object") {
            productos[productoIndex] = {
                ...productos[productoIndex],
                color: [...data.color],
            };
        } else if (typeof data.color === "string"){
            productos[productoIndex] = {
                ...productos[productoIndex],
                color: [data.color],
            };
        }

        if (typeof data.talla === "object") {
            productos[productoIndex] = {
                ...productos[productoIndex],
                talla: [...data.talla],
            };
        } else if (typeof data.talla === "string"){
            productos[productoIndex] = {
                ...productos[productoIndex],
                talla: [data.talla],
            };
        }
        
        fs.writeFileSync(productsFilePath,JSON.stringify(productos, null, 2),);
        res.redirect("/products/"+idProducto);
    },
    delete: (req, res) => {
        const idProducto = req.params.idProducto;
        db.ColoresProducto.destroy({where: {Productos_id: idProducto}}).then(()=>{
            db.TallasProducto.destroy({where: {Productos_id: idProducto}})
        }).then(()=>{
            db.FotosProducto.destroy({where:{id_Productos: idProducto}})
        }).then(() => {
            db.Productos.destroy({where: {id: idProducto}}).then(()=>res.redirect("/products"))
        })

        /* let index = productos.findIndex(productos => productos.id === idProducto);
        productos.splice(index,1);
        fs.writeFileSync(productsFilePath,JSON.stringify(productos, null, 2),);
        res.redirect("/products"); */
    }
}

module.exports = detalleProductoController;