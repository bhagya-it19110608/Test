const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/userModel.js')(sequelize, Sequelize);
db.Salon = require('../models/salonModel.js')(sequelize, Sequelize);
db.Request = require('../models/requestModel.js')(sequelize, Sequelize);
db.Category = require('../models/categoryModel.js')(sequelize, Sequelize);
db.Rate = require('../models/rateModel.js')(sequelize, Sequelize);

 
module.exports = db;