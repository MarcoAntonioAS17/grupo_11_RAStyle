module.exports = (sequelize, dataTypes) => {
    let tableName = "FotosProducto";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        id_Productos: {
            allowNull: false,
            type: dataTypes.STRING(6)
        },
        path: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let extraData = {
        tableName: "FotosProductos",
        timestamps: false
    }

    const FotosProducto = sequelize.define(tableName, columns, extraData);

    // Relaciones
    FotosProducto.associate = function(models) {
        FotosProducto.belongsTo(models.Productos, {
            as: "productoDeFoto",
            foreignKey: "id_Productos",
        })
    }
    
    return FotosProducto;
}