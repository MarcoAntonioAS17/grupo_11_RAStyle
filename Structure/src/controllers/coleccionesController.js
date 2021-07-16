const productos = require('../databases/productos.json');
const busquedaModels = require('../models/funcionesBusqueda');

const coleccionesController = {
    listadoProductos: function (req, res) {
        res.render('listadoProductos.ejs',{'productos':productos});
    },
    busqueda: function(req,res) {
        res.render('busqueda.ejs');
    },
    leerFormulario: function(req,res) {
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
        res.render('editarProductos.ejs');
    },
    createPost: function(req,res) {
        const data = req.body;
        console.log(data);
    }
}

module.exports = coleccionesController;