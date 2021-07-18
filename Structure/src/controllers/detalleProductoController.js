const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const detalleProductoController = {
    index: function(req,res) {
        const idProducto = parseInt(req.params.idProducto);
        let productoSelect = productos.find(producto=>producto.id===idProducto);

        res.render('detalleProducto.ejs',{"producto":productoSelect});
    },
    editar: (req, res) => {
        const idProducto = parseInt(req.params.idProducto);
        let productSelect = productos.find(producto => producto.id === idProducto);
        res.render('editarProductos.ejs', {"producto":productSelect});
    },
    nuevo: (req, res) => {
        console.log("Nuevo producto");
        const esqueleto = {
            id: null,
            nombre: "",
            coleccion: 1,
            categoria: 1,
            subcategoria: 1,
            precio: 0,
            descripcion: "",
            "photos": [],
            "color": [],
            "talla": [],
            "cantidad": 0,
            "enOferta": false,
            "precioOferta": 0,
            "hotsale": false
          };
        res.render('nuevoProducto.ejs', {"producto": esqueleto});
    },
    actualizar: (req, res) => {
        let errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            console.log("=========Datos======");
            console.log(req.body);
            console.log("=========Errores======");
            console.log(errors.mapped())
            res.render('editarProductos.ejs', {errors: errors.mapped(), "producto": req.body })
            return;
        } 

        const idProducto = parseInt(req.params.idProducto);
        const data = req.body;
        let productoIndex = productos.findIndex(producto=>producto.id===idProducto);
        let files = req.files;

        productos[productoIndex] = { 
            ...productos[productoIndex],
            nombre: data.nombre,
            categoria: parseInt(data.categoria),
            subcategoria: parseInt(data.subcategoria),
            coleccion: parseInt(data.coleccion),
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
        
        fs.writeFileSync(productsFilePath,JSON.stringify(productos, null, 2),);
        res.redirect("/products/"+idProducto);
    },
}

module.exports = detalleProductoController;