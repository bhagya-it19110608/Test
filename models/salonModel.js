module.exports = (sequelize, Sequelize) => {
	const Salon = sequelize.define('salon', {	
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
        salonname: {
            type: Sequelize.STRING,
            required: true,
            trim: true
    },
        ownership: {
            type: Sequelize.STRING,
            required: true,
            trim: true
    },
        phone: {
            type: Sequelize.STRING,
            required: true,
            unique: true
    },
        address: {
            type:Sequelize.STRING,
            required: true,
            unique: true
    },
        location: {
            type: Sequelize.STRING,
            required: true
    }
    });

    return Salon;
}

