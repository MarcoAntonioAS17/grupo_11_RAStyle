module.exports = (sequelize, dataTypes) => {
    let tableName = "ColoresProducto";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        Colores_id: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        Productos_id: {
            type: dataTypes.STRING(6),
            allowNull: false
        }
    };
    let extraData = {
        tableName: "ColoresProductos",
        timestamps: false
    }

    const ColoresProducto = sequelize.define(tableName, columns, extraData);

    // Relaciones
    ColoresProducto.associate = function(models) {
        ColoresProducto.belongsTo(models.Productos, {
            as: "productoDelColor",
            foreignKey: "Productos_id",
        })
        ColoresProducto.belongsTo(models.Color, {
            as: "color",
            foreignKey: "Colores_id",
        })
    }
    
    return ColoresProducto;
}