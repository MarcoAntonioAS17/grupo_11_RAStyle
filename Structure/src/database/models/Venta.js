module.exports = (sequelize, dataTypes) => {
    let tableName = "Ventas";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        id_Clientes: {
            allowNull: false,
            type: dataTypes.STRING(6)
        },
        enCarrito: {
            type: dataTypes.INTEGER
        }
    };
    let extraData = {
        tableName: "Ventas",
        timestamps: false
    }

    const Venta = sequelize.define(tableName, columns, extraData);

    // Relaciones
    Venta.associate = function(models) {
        Venta.belongsTo(models.Usuarios, {
            as: "comprador",
            foreignKey: "id_Clientes",
        })
        Venta.hasMany(models.DetalleVentas, {
            as: "ventaDetalle",
            foreignKey: "id",
        })
    }
    
    return Venta;
}