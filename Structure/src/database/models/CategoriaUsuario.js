module.exports = (sequelize, dataTypes) => {
    let tableName = "CategoriaUsuario";
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
        tableName: "CategoriaUsuario",
        timestamps: false
    }

    const CategoriaUsuario = sequelize.define(tableName, columns, extraData);

    // Relaciones
    CategoriaUsuario.associate = function(models) {
        CategoriaUsuario.hasMany(models.Usuarios, {
            as: "usuariosDeLaCategoria",
            foreignKey: "id",
        })
    }
    
    return CategoriaUsuario;
}