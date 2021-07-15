let express = require('express');
let router = express.Router();

const users = require('../controllers/userCtrl.js');

router.post('/api/register', users.createUser);
router.get('/api/user/:id', users.getUser);
router.get('/api/users', users.users);
router.put('/api/user', users.updateUser);
router.delete('/api/user/:id', users.deleteUser);

module.exports = router;