const router = require('express').Router();

const controller = require('./controller');


router.get('/login', controller.t);  
router.post('/', controller.login);
// router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/findPassword', controller.findPassword);
router.get('/google', controller.googleSign);
router.get('/plan')

// router.post('/', conroller.goLoginPage); 나중에 findpassword form에서 이멜 전송하고 다시 login페이지 띄울 때 사용하게
module.exports = router;
