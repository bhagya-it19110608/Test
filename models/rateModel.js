module.exports = (sequelize, Sequelize) => {
	const Rate = sequelize.define('rate', {	
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
        rvalue: {
            type: Sequelize.INTEGER,
            required: true,
            trim: true
    }

    });

    return Rate;
}

