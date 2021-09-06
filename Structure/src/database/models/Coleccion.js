module.exports = (sequelize, dataTypes) => {
    let tableName = "Coleccion";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        Nombre: {
            allowNull: false,
            type: dataTypes.STRING(50)
        }
    };
    let extraData = {
        tableName: "Colecciones",
        timestamps: false
    }

    const Coleccion = sequelize.define(tableName, columns, extraData);

    // Relaciones
    Coleccion.associate = function(models) {
        Coleccion.hasMany(models.Productos, {
            as: "productoDeColeccion",
            foreignKey: "id",
        })
    }
    
    return Coleccion;
}