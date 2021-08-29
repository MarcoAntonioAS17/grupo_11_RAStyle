module.exports = (sequelize, dataTypes) => {
    let tableName = "Subcategoria";
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
        tableName: "Subcategoria",
        timestamps: false
    }

    const Subcategoria = sequelize.define(tableName, columns, extraData);

    // Relaciones
    Subcategoria.associate = function(models) {
        Subcategoria.hasMany(models.Productos, {
            as: "productoSubcategoria",
            foreignKey: "id",
        })
    }
    
    return Subcategoria;
}