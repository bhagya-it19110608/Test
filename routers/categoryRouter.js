let express = require('express');
let categoryrouter = express.Router();

const categories = require('../controllers/categoryCtrl.js');

categoryrouter.post('/category', categories.createCategory);
categoryrouter.get('/category/:id', categories.getCategory);
categoryrouter.get('/categories', categories.categories);
categoryrouter.put('/category', categories.updateCategory);
categoryrouter.delete('/category/:id', categories.deleteCategory);

module.exports = categoryrouter;