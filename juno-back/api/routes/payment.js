var router = require('express').Router();
const auth = require('../middleware/authenticate')
const payController = require('../controllers/payController');

router.post('/card', auth, payController.card);
router.post('/boleto', auth, payController.boleto);
router.post('/picpay', auth, payController.picpay);
router.post('/pix', auth, payController.pix);
router.get('/charge/:id', auth, payController.charge);
  
module.exports = router;