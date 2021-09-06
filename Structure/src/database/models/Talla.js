module.exports = (sequelize, dataTypes) => {
    let tableName = "Talla";
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
        tableName: "Tallas",
        timestamps: false
    }

    const Talla = sequelize.define(tableName, columns, extraData);

    // Relaciones
    Talla.associate = function(models) {
        Talla.hasMany(models.TallasProducto, {
            as: "tallasProducto",
            foreignKey: "id",
        })
    }
    
    return Talla;
}