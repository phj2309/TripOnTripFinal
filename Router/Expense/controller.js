const mapper = require('../../DB/mapperController.js');

exports.t = async function(req, res)
{
	if(req.session.userId){
        var userId = req.session.userId;
	    let nickname = await mapper.admin.findNicknameById(userId);
        res.render("expense.html", {nickname: nickname[0].nickname});
    }else { 
        res.redirect('/user/login');
    }
	
}