let express = require('express');
let raterouter = express.Router();

const rates = require('../controllers/rateCtrl.js');

raterouter.post('/rate', rates.createRate);
raterouter.get('/rate/:id', rates.getRate);
raterouter.get('/rates', rates.rates);
raterouter.put('/rate', rates.updateRate);
raterouter.delete('/rate/:id', rates.deleteRate);

module.exports = raterouter;