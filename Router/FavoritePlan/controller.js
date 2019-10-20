const mapper = require('../../DB/mapperController.js');

exports.t = async function(req, res)
{
	if(req.session.userId){
        var userId = req.session.userId;
	    let nickname = await mapper.admin.findNicknameById(userId);
        res.render("basket_stack2.html",{nickname: nickname[0].nickname});
    }else { 
        res.redirect('/user/login');
    }
	 //a.html에 데이터 전달
}