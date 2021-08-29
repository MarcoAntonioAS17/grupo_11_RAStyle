module.exports = (sequelize, dataTypes) => {
    let tableName = "Categoria";
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
        tableName: "Categoria",
        timestamps: false
    }

    const Categoria = sequelize.define(tableName, columns, extraData);

    // Relaciones
    Categoria.associate = function(models) {
        Categoria.hasMany(models.Productos, {
            as: "productoDeCategoria",
            foreignKey: "id",
        })
    }
    
    return Categoria;
}