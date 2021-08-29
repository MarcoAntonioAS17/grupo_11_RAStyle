module.exports = (sequelize, dataTypes) => {
    let tableName = "Color";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        Nombre: {
            allowNull: false,
            type: dataTypes.STRING(20)
        }
    };
    let extraData = {
        tableName: "Colores",
        timestamps: false
    }

    const color = sequelize.define(tableName, columns, extraData);

    // Relaciones
    color.associate = function(models) {
        color.belongsTo(models.ColoresProducto, {
            as: "colorDelColoresProducto",
            foreignKey: "id",
        })
    }
    
    return color;
}