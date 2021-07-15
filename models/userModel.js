module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {	
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
        name: {
            type: Sequelize.STRING,
            required: true,
            trim: true
    },
        phone: {
            type: Sequelize.STRING,
            required: true,
            unique: true
    },
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true
    },
        password: {
            type:Sequelize.STRING,
            required: true
    },
        role: {
            type: Sequelize.STRING,
            defaultValue: "0"
    }
    }, {
        timestamps: true
    });

    return User;
}

