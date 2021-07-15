let express = require('express');
let requestrouter = express.Router();

const requests = require('../controllers/requestCtrl.js');

requestrouter.post('/request', requests.createRequest);
requestrouter.get('/request/:id', requests.getRequest);
requestrouter.get('/requests', requests.requests);
requestrouter.put('/request', requests.updateRequest);
requestrouter.delete('/request/:id', requests.deleteRequest);

module.exports = requestrouter;