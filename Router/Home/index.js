const router = require('express').Router();

const controller = require('./controller');

//const userViewController = require('./UserView/controller');
//const adminViewController = require('./AdminView/controller');


router.get('/', controller.toProfile);

router.get('/mypage_plan', controller.toMyPlan);

router.post('/searchPlan', controller.searchPlan);

// USER VIEW
//router.get('/survey/:key', userViewController.userSwitch);

// ADMIN VIE
//router.get('/admin', adminViewController.index);


module.exports = router;
