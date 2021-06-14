var router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authenticate')

router.post('/verify', auth, (req, res) => res.status(200).json({auth: true}))
router.post('/register', userController.register);
router.post('/login', userController.login);
  
module.exports = router;