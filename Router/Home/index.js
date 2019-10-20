const router = require('express').Router();

const controller = require('./controller');

//const userViewController = require('./UserView/controller');
//const adminViewController = require('./AdminView/controller');


router.get('/', controller.toMain);

router.get('/mypage_plan', controller.toMyPlan);

router.get('/mypage_profile', controller.toProfile);

router.post('/searchPlan/:filter', controller.searchPlan);

router.get('/detailPlanShow_view/:planId', controller.planView);

// USER VIEW
//router.get('/survey/:key', userViewController.userSwitch);

// ADMIN VIE
//router.get('/admin', adminViewController.index);


module.exports = router;
