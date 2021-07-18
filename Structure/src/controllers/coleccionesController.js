const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,"../databases/productos.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const coleccionesController = {
    listadoProductos: function (req, res) {
        res.render('listadoProductos.ejs',{'productos':productos});
    },
    busqueda: function(req,res) {
        res.render('busqueda.ejs');
    },
    leerFormulario: function(req,res) {
        let data = req.body;
        let field = data.filtro;
        let clave = data.buscar;
        let filtrados=[];
        let campoDeBusqueda="nombre";
        let palabraClave="";
        for (let item of productos) {
            if (field === "nombre") {
                campoDeBusqueda = item[field].toLowerCase();
                palabraClave = clave.toLowerCase();
                if (campoDeBusqueda.includes(palabraClave)) {
                    filtrados.push(item);
                }
            } else if (field === "talla") {
                campoDeBusqueda = item[field];
                palabraClave = clave.toUpperCase();
                if (campoDeBusqueda.includes(palabraClave)) {
                    filtrados.push(item);
                }
            } else if (field === "enOferta") {
                filtrados = productos.filter(item=>item.enOferta==true);
            } else if (field === "color"){
                campoDeBusqueda = item[field];
                palabraClave = clave;
                if (campoDeBusqueda.includes(palabraClave)) {
                    filtrados.push(item);
                }
            } else {
                campoDeBusqueda = item[field];
                palabraClave = clave;
                if (campoDeBusqueda == palabraClave) {
                    filtrados.push(item);
                }
            }   
        }
        if (filtrados.length > 0) {
            res.render('listadoProductos.ejs',{'productos':filtrados});
        } else {
            res.render('busquedaVacia.ejs')
        }
        
    }
}

module.exports = coleccionesController;