module.exports = (sequelize, dataTypes) => {
    let tableName = "TallasProducto";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        Tallas_id: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        Productos_id: {
            type: dataTypes.STRING(6),
            allowNull: false
        }
    };
    let extraData = {
        tableName: "TallasProductos",
        timestamps: false
    }

    const TallasProducto = sequelize.define(tableName, columns, extraData);

    // Relaciones
    TallasProducto.associate = function(models) {
        TallasProducto.belongsTo(models.Productos, {
            as: "productoDeTalla",
            foreignKey: "Productos_id",
        })
        TallasProducto.belongsTo(models.Talla, {
            as: "tallaDeLasTallas",
            foreignKey: "Tallas_id",
        })
    }
    
    return TallasProducto;
}