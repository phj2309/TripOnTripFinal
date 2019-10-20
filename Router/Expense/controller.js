const mapper = require('../../DB/mapperController.js');

exports.t = async function(req, res)
{
	if(req.session.userId){
        res.render("expense.html");
    }else { 
        res.redirect('/user/login');
    }
	
}