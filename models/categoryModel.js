module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define('category', {	
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
        catname: {
            type: Sequelize.STRING,
            required: true,
            unique: true
    }

    });

    return Category;
}

