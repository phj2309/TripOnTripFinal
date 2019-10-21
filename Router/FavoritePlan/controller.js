const mapper = require('../../DB/mapperController.js');

exports.t = async function(req, res)
{
    var sf = '%Y-%m-%d';
	var ff = '%Y-%m-%d';
	if(req.session.userId){
        var userId = req.session.userId;
        //console.log(userId);
        let idList = await mapper.user.getUserId(userId);
        var id = idList[0].user_id;
        let favoriteList = await mapper.plan.getFavoriteList(id);
        var myFavoriteList = [];
        //var planList = [];
        if (favoriteList) {
            for (var i = 0; i < favoriteList.length; i++) {
                var planList = await mapper.plan.planListById(sf, ff, favoriteList[i].plan_id);
                let groupListResult = await mapper.plan.groupList(favoriteList[i].plan_id);
                var groupList = [];
				for(var j=0; j<groupListResult.length; j++) {
                    groupList[j] = groupListResult[j].nickname;
                    console.log(groupList[j]);
                }
                let daysDetailList = await mapper.plan.getDetailPlan(favoriteList[i].days_detail_id);
                console.log('planList', planList);
                var title = planList[0].title;
                console.log('title: '+title);
                
                myFavoriteList.push({country: planList[0].country, group: groupList, content: daysDetailList[0].content, startTime: daysDetailList[0].startTime, finishTime: daysDetailList[0].finishTime})
                console.log(myFavoriteList);
            }
            res.render("basket_stack2.html", { myFavoriteList: myFavoriteList });
        } else {
            res.render("basket_empty.html");
        }
    }else { 
        res.redirect('/user/login');
    }
	 //a.html에 데이터 전달
}

exports.insertFavorite = async function(req, res)
{
   var daysDetailId = req.body.daysDetailId;
   console.log(daysDetailId);
   let planIdList = await mapper.plan.getPlanIdList(daysDetailId);
   var planId = planIdList[0].plan_id;
   var userId = req.session.userId;
   let idList = await mapper.user.getUserId(userId);
   var id = idList[0].user_id;
   var responseData;
   mapper.plan.insertFavorite(id, planId, daysDetailId).then(function (result) {
       responseData = {'result': 'success'};
    res.json(responseData);
}).catch(function (error) {
    console.log(error);
});
   //mapper.plan.insertFavorite

}