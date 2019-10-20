const mapper = require('../../DB/mapperController.js');

exports.t = async function(req, res)
{
	if(req.session.userId){
        res.render("basket_stack2.html");
    }else { 
        res.redirect('/user/login');
    }
	 //a.html에 데이터 전달
}