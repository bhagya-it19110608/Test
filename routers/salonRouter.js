let express = require('express');
let salonrouter = express.Router();

const salons = require('../controllers/salonCtrl.js');

salonrouter.post('/salon', salons.createSalon);
salonrouter.get('/salon/:id', salons.getSalon);
salonrouter.get('/salons', salons.salons);
salonrouter.put('/salon', salons.updateSalon);
salonrouter.delete('/salon/:id', salons.deleteSalon);

module.exports = salonrouter;