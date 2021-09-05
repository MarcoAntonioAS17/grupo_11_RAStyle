const path = '../databases/productos.json';

const productos = require(path);
const busquedaModels = require('../models/funcionesBusqueda');
const { validationResult } = require('express-validator');
const fs = require('fs');

// const firebase = require('firebase-admin');

// const serviceAccount = {
//     "type": "service_account",
//     "project_id": "rastyle-9c7f2",
//     "private_key_id": "637b04caabbf6ef0f9d09f06701e5544c1b10387",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRnYVBsgE0s9F3\nx6G0faqPNADezfb/S+eKK6UFjPowSb/pt9yxoAfzC97j8lOwxBNFPr8xG/ccXLG4\noZKN6LJ7OUtOKMI4k8uY5dLNUdRGV2dxzS/t030ZHnW9RwgSFfXmY/6GIg9eArGm\ngFD+Di4K4O1z8qDr1ksHfKcOj6WC6K99/dBeTU1CnWneSwOo5aHx4ukMvLrOHJhY\nmuRsiBYrPXt2cg9sVqYWxGhkNrKRsOQoX3TPByhGLwj+hJt9fr2RnhYoe/aMsdFQ\n0CYVLtdXOWBPOlYvg3rL0sCnXx9iptHBfBlwPCvgwD3LOhtALt5bJ5397bYgbTsX\n1iIjnpljAgMBAAECggEASqN0V7gyhbmh1KzY/5Pfr64swSlF0hINGD4CPL++NoOM\nOoSlqPn62qhXbYNUGZU352g4XBxBGXBIOB4QOUeqhgYYsnQA9HRsAr2TGlkQ5Rsq\nUnNlpaGw4cje087/KLF5JdhlQQ3PuwHqkAcQz+XsryL4aljyxAdCICBau+yaWsoq\n1ZF63ALKp0ByUYgJP7GQovuGSxgqg8yciRTKv4NXMUpmCli4+8HiRZoDso1ig8Ex\neJYNtbghf7yqy7USMQqwhzmtVHsLNUcBwFlrOzWl/N4FS5CtfdjhLGf9fp5eHNQJ\nRZeZwOCrxTh0zvgtW0ZKzetnVu9Q9FnprQtbmaGPAQKBgQDxiDxOS4j5ZWIgloXy\npfIJKPR8L+DHButbE03vt0zjcn61erB9Kv/3Vw/SUtPiL7lRXWDabT6nKtlAy8LE\ni/db5EsYdHEyggE1DeLAPEA5q6Cb2flrw4cggXLfr2bX2TTcV9gZMlbkrFqgP2fi\n2JIqQpdcoRpS9rjDds0DBFsysQKBgQDeK9t7FHXLuU2cdNpzIbmVOXvLfBNEpo3/\n3PAP9FpHpVUdsVkZRVgbwRAE8r7R8yvo3gtCZ1X7+WQ8IIEYQjc8+MZY6Ff/zcJZ\nTnogungf9+e6nIFSLAaLNBIDeWAjFLLsRIILYdnn6z7NeF8HqMdgacMv31d4L3c7\nQrmD0UZKUwKBgCTMjeub5I2i3bV7WYMjt2Gf5Mf6/3MzYa5pnYk1UzigHCAIRlV7\ntK35jMaNqgyfGswDvxroZBBSHfGaWd1aOeC9QpfCPfDlD8wGhpKlW1+t/3VfW3oI\nu1C/iEH+VlvykvQzShBktAp5HAGoR2qvdm2L4cXSIdGcF4BoXEnmYwKxAoGBAILk\nTdu2kyviUVJTGfxoqyC6jC+3OtbgVZqfvSN5L9M0GfBzcu3Lh/xaAykXJsskvALn\nBrUpkmPwa1htQgFbyZV3b8wjnuzLeawJ6zPrCCi1cmXkHOCfpX9Pvyki0jv4zu0Z\n84/nJ21WkFqXh01I56XqyZ8jszHQrStRxWBe5E2XAoGAOSnDaYG8egMRCMyM2xSU\niU+AxqBeofwalaMHiTkc+L0jqxRhc6DHxKcrnx5Oh4VjcnXNJxb70k0Z2KsPSX3U\nzXjbGRhz2E8FST/TRUI10WOiDO58mP95Zm4Un8PlvLHAgjqg9OmQ74MmPVtkK1ee\nODT3i3v3x86zAKVuI2qbA54=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-e5oqz@rastyle-9c7f2.iam.gserviceaccount.com",
//     "client_id": "118216238293434671203",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e5oqz%40rastyle-9c7f2.iam.gserviceaccount.com"
// };

// firebase.initializeApp({
//     credential: firebase.credential.cert(serviceAccount)
// });

// const storage = firebase.storage();
// const FileName = "Logo.png";
// const FilePath = './public/images/'+FileName;

// async function main () {
        
//     return await storage.bucket("gs://rastyle-9c7f2.appspot.com")
//     .upload(FilePath,{
//         destination: `archivo.png`,
//     }, (err, file) => {
//         console.log(file);
//     });
// }

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

        //console.log("Exito ");
        //res.json(main());
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
        fs.writeFileSync(__dirname+'/../databases/productos.json', JSON.stringify(productos,null,2));
        
        res.redirect('/products/'+idProducto);
    }
}

module.exports = coleccionesController;