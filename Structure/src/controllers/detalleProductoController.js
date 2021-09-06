const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const db = require("../database/models");

const detalleProductoController = {
    index: async function(req,res) {
        const idProducto = req.params.idProducto;
        const item = await db.Productos.findOne({
            where: {id: idProducto},
            include: [
                {association: "fotosDelProducto"},
                {association: "tallasDelProducto"},
                {association: "coloresDelProducto"}
            ]
        })
        const tallas = await db.TallasProducto.findAll({
            where: {Productos_id: idProducto},
            include: [{association: "tallaDeLasTallas"}]
        })
        const colores = await db.ColoresProducto.findAll({
            where: {Productos_id: idProducto},
            include: [{association: "color"}]
        })
        res.render('detalleProducto.ejs',{producto: item, talla: tallas, color: colores})
        //let productoSelect = productos.find(producto=>producto.id===idProducto);
        //res.render('detalleProducto.ejs',{"producto":productoSelect});
    },
    editar: async (req, res) => {
        const idProducto = req.params.idProducto;
        const item = await db.Productos.findOne({
            where: {id: idProducto},
            include: [
                {association: "fotosDelProducto"},
                {association: "tallasDelProducto"},
                {association: "coloresDelProducto"}
            ]
        })
        const tallas = await db.TallasProducto.findAll({
            where: {Productos_id: idProducto},
            include: [{association: "tallaDeLasTallas"}]
        })
        let indexTallas = [];
        for(let t of tallas) {
            indexTallas.push(t.Tallas_id)
        }

        const colores = await db.ColoresProducto.findAll({
            where: {Productos_id: idProducto},
            include: [{association: "color"}]
        })
        let indexColores = [];
        for(let c of colores) {
            indexColores.push(c.Colores_id)
        }

        if (item != undefined) {
            res.render('editarProductos.ejs', {producto: item, tallas: indexTallas, colores: indexColores});
        } else {
            res.render('busquedaVacia.ejs')
        }
        /* let productSelect = productos.find(producto => producto.id === idProducto);
        if (productSelect != undefined) {
            res.render('editarProductos.ejs', {"producto":productSelect});
        } else {
            res.render('busquedaVacia.ejs')
        } */
    },
    actualizar: async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
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

            res.render('editarProductos.ejs', {errors: errors.mapped(), "producto": esqueleto })
            return;
        } 

        const idProducto = req.params.idProducto;
        const data = req.body;
        let files = req.files;

        data.enOferta ? data.enOferta=true : data.enOferta=false;
        data.hotSale ? data.hotSale=true : data.hotSale=false;

        await db.Productos.update({
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
        }, {
            where: {id: idProducto}
        })

        await db.TallasProducto.destroy({where: {Productos_id: idProducto}});
        await db.ColoresProducto.destroy({where: {Productos_id: idProducto}});

        // Tabla de Colores de Productos
        for (let itemC of data.color) {
            db.ColoresProducto.create({
                Colores_id: parseInt(itemC,10),
                Productos_id: idProducto
            })
        }
        // Tabla de Tallas de Productos
        for (let itemT of data.talla) {
            db.TallasProducto.create({
                Tallas_id: parseInt(itemT,10),
                Productos_id: idProducto
            })
        } 

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