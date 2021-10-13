let url = require('url')
// USO DE SEQUELIZE
const db = require("../database/models");
// %%%%%%%%%%%%%%%%

const APIControllerUsers = {
    listUsers: async function(req, res) {
        const usuarios = await db.Usuarios.findAll({attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']});
        let ultimoUsuario
        let fechaCreacion
        let actualLoc0 = req.protocol
        let actualLoc1 = req.get('host');
        let actualLoc2 = req.originalUrl;
        let location = url.format({
            protocol: actualLoc0,
            host: actualLoc1,
            pathname: actualLoc2
          })
          if (location[location.length-1]!=="/") {
              location = location + "/"
          }

        for(let i=0; i < usuarios.length; i++) {
            usuarios[i].dataValues.detail = location + usuarios[i].id;
            usuarios[i].dataValues.name = usuarios[i].firstName + " " + usuarios[i].lastName;
            if (fechaCreacion != undefined) {
                if (fechaCreacion < (usuarios[i].dataValues.createdAt).getTime()) {
                    fechaCreacion = (usuarios[i].dataValues.createdAt).getTime();
                    ultimoUsuario = usuarios[i].dataValues.id
                }
            } else {
                fechaCreacion = (usuarios[i].dataValues.createdAt).getTime();
                ultimoUsuario = usuarios[i].dataValues.id
            }
            delete usuarios[i].dataValues.firstName
            delete usuarios[i].dataValues.lastName
            delete usuarios[i].dataValues.createdAt
            delete usuarios[i].dataValues.updatedAt
        }
        return res.status(200).json({
            count: usuarios.length,
            lastUser: ultimoUsuario,
            users: usuarios
        })
    },
    userDetail: async function(req, res) {
        let id = req.params.id;
        const usuario = await db.Usuarios.findOne({
            attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'ciudad', 'estado', 'pais', 'tel', 'createdAt', 'updatedAt'],
            where: {id: id}
        });

        return res.status(200).json(usuario)
    },
    listProducts: async function(req, res) {
        const productos = await db.Productos.findAll({
            attributes: ['id', 'Nombre', 'Descripcion', 'createdAt', 'updatedAt'],
            include: [{association: "fotosDelProducto"}]
        });
        let ultimoProducto
        let fechaCreacion
        let actualLoc0 = req.protocol
        let actualLoc1 = req.get('host');
        let actualLoc2 = req.originalUrl;
        let location = url.format({
            protocol: actualLoc0,
            host: actualLoc1,
            pathname: actualLoc2
          })
          if (location[location.length-1]!=="/") {
              location = location + "/"
          }

        for(let i=0; i < productos.length; i++) {
            productos[i].dataValues.name = productos[i].Nombre;
            productos[i].dataValues.description = productos[i].Descripcion;
            productos[i].dataValues.detail = location + productos[i].id;
            if (fechaCreacion != undefined) {
                if (fechaCreacion < (productos[i].dataValues.createdAt).getTime()) {
                    fechaCreacion = (productos[i].dataValues.createdAt).getTime();
                    ultimoProducto = productos[i].dataValues.id
                }
            } else {
                fechaCreacion = (productos[i].dataValues.createdAt).getTime();
                ultimoProducto = productos[i].dataValues.id
            }
            delete productos[i].dataValues.Nombre
            delete productos[i].dataValues.Descripcion
            delete productos[i].dataValues.createdAt
            delete productos[i].dataValues.updatedAt
        }

        countByCategory = {
            hombre: (await db.Productos.findAll({
                attributes: ['id'],
                where: {id_Categoria: 1}
            })).length,
            mujer: (await db.Productos.findAll({
                attributes: ['id'],
                where: {id_Categoria: 2}
            })).length,
            unisex: (await db.Productos.findAll({
                attributes: ['id'],
                where: {id_Categoria: 3}
            })).length
        }
        let objectF = {
            count: productos.length,
            countByCategory: countByCategory,
            lastProduct: ultimoProducto,
            products: productos
        }
        console.log(objectF.countByCategory)
        return res.status(200).json(objectF)
    },
    productDetail: async function(req, res) {
        let id = req.params.id;
        const producto = await db.Productos.findOne({
            attributes: ['id', 'Nombre', 'Cantidad', 'precio', 'enOferta', 'precioOferta', 'hotsale', 'id_Colecciones', 'id_Categoria', 'id_Subcategoria','Descripcion', 'createdAt', 'updatedAt'],
            where: {id: id},
            include: [{association: "fotosDelProducto"}]
        });

        let arrayTallas = []
        const tallas = await db.TallasProducto.findAll({
            where: {Productos_id: id},
            include: [{association: "tallaDeLasTallas"}]
        })
        for (let i=0; i<tallas.length; i++) {
            arrayTallas.push(tallas[i].tallaDeLasTallas.Nombre)
        }
        
        let arrayColores = []
        const colores = await db.ColoresProducto.findAll({
            where: {Productos_id: id},
            include: [{association: "color"}]
        })
        for (let i=0; i<colores.length; i++) {
            arrayColores.push(colores[i].color.Nombre)
        }

        producto.dataValues.tallas = arrayTallas;
        producto.dataValues.colores = arrayColores;


        return res.status(200).json(producto)
    }
}

module.exports = APIControllerUsers