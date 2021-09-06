module.exports = (sequelize, dataTypes) => {
    let tableName = "DetalleVentas";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        id_Ventas: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        id_Productos: {
            allowNull: false,
            type: dataTypes.STRING(6)
        },
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: dataTypes.DOUBLE,
            allowNull: false
        }
    };
    let extraData = {
        tableName: "DetalleVentas",
        timestamps: false
    }

    const DetalleVenta = sequelize.define(tableName, columns, extraData);

    // Relaciones
    DetalleVenta.associate = function(models) {
        DetalleVenta.belongsTo(models.Ventas, {
            as: "detalleVenta",
            foreignKey: "id_Ventas",
        })
        DetalleVenta.belongsTo(models.Productos, {
            as: "detalleProducto",
            foreignKey: "id_Productos",
        })
    }
    
    return DetalleVenta;
}