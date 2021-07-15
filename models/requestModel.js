module.exports = (sequelize, Sequelize) => {
	const Request = sequelize.define('request', {	
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
        sender: {
            type: Sequelize.STRING,
            required: true,
            trim: true
    },
        title: {
            type: Sequelize.STRING,
            required: true,
            trim: true
    },
        description: {
            type: Sequelize.STRING,
            required: true,
            trim: true
    }
});

    return Request;
}

