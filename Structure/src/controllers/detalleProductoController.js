require('dotenv').config();
const { validationResult } = require('express-validator');
const db = require("../database/models");

const {Storage} = require('@google-cloud/storage');
// Instantiate a storage client
const storage = new Storage();
const bucket = storage.bucket("gs://rastyle-9c7f2.appspot.com");

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
        if (!item) 
            return res.render('busquedaVacia.ejs');
        res.render('detalleProducto.ejs',{producto: item, talla: tallas, color: colores})
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
        
    },
    actualizar: async (req, res, next) => {
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
        
        const files = req.files;
        const enlaces = [];
        if (files.length > 0) {
            console.log("Tiene archivos");
            for(file of files){
                enlaces.push(`https://storage.googleapis.com/${bucket.name}/img_${Date.now()}_${file.originalname}`);
                subirArchivo(file, next);
            }
        }

        data.enOferta ? data.enOferta=1 : data.enOferta=0;
        data.hotSale ? data.hotSale=1 : data.hotSale=0;

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
          // Table de link a imagenes
        for (link of enlaces) {
            db.FotosProducto.create({
                path: link,
                id_Productos: productCreated.null
            }).catch(err => console.log(err))
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


module.exports = detalleProductoController;