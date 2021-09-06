module.exports = (sequelize, dataTypes) => {
    let tableName = "Productos";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.STRING(6)
        },
        Nombre: {
            allowNull: false,
            type: dataTypes.STRING(60)
        },
        Cantidad: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        precio: {
            allowNull: false,
            type: dataTypes.FLOAT
        },
        enOferta: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        precioOferta: {
            allowNull: false,
            type: dataTypes.FLOAT
        },
        hotsale: {
            type: dataTypes.INTEGER
        },
        id_Colecciones: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        id_Categoria: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        id_Subcategoria: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        Descripcion: {
            type: dataTypes.TEXT
        }
    };
    let extraData = {
        tableName: "productos",
        timestamps: false
    }

    const Product = sequelize.define(tableName, columns, extraData);

    // Relaciones
    Product.associate = function(models) {
        Product.hasMany(models.DetalleVentas, {
            as: "productoDetalle",
            foreignKey: "id",
        })
        Product.hasMany(models.FotosProducto, {
            as: "fotosDelProducto",
            foreignKey: "id",
        })
        Product.belongsTo(models.Subcategoria, {
            as: "subcategoriaDelProducto",
            foreignKey: "id_Subcategoria",
        })
        Product.belongsTo(models.Categoria, {
            as: "categoriaDelProducto",
            foreignKey: "id_Categoria",
        })
        Product.belongsTo(models.Coleccion, {
            as: "coleccionDelProducto",
            foreignKey: "id_Colecciones",
        })
        Product.hasMany(models.TallasProducto, {
            as: "tallasDelProducto",
            foreignKey: "id",
        })
        Product.hasMany(models.ColoresProducto, {
            as: "coloresDelProducto",
            foreignKey: "id",
        })
    }
    
    return Product;
}