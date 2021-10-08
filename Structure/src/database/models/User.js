module.exports = (sequelize, dataTypes) => {
    let tableName = "Usuarios";
    let columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        firstName: {
            allowNull: false,
            type: dataTypes.STRING(60)
        },
        lastName: {
            allowNull: false,
            type: dataTypes.STRING(60)
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING(120)
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING(30)
        },
        id_CategoriaUsuario: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING(100)
        },
        cp: {
            type: dataTypes.INTEGER
        },
        calle: {
            type: dataTypes.STRING(60)
        },
        num: {
            type: dataTypes.STRING(15)
        },
        num_inter: {
            type: dataTypes.STRING(10)
        },
        ref: {
            type: dataTypes.STRING(100)
        },
        ciudad: {
            type: dataTypes.STRING(50)
        },
        estado: {
            type: dataTypes.STRING(50)
        },
        pais: {
            type: dataTypes.STRING(50)
        },
        tel: {
            type: dataTypes.STRING(15)
        }
    };
    let extraData = {
        tableName: "Clientes",
        timestamps: true
    }

    const User = sequelize.define(tableName, columns, extraData);

    // Relaciones
    User.associate = function(models) {
        User.belongsTo(models.CategoriaUsuario, {
            as: "categoriaDelUsuario",
            foreignKey: "id_CategoriaUsuario",
        })
        User.hasMany(models.Ventas, {
            as: "compras",
            foreignKey: "id",
        })
    }
    
    return User;
}