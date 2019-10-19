const mapper = require('../../DB/mapperController.js');
var util = require('util');



exports.toProfile = async function (req, res) {
	//var keyword="";
	//로그인 여부 판단
	if (req.session.userId) {
		var userId = req.session.userId;

		let findResult = await mapper.admin.findNicknameById(userId);
		
		var nickname = findResult[0].nickname;
			//var planList = new Array();

			let planListResult = await mapper.plan.planList();
	
			var planList = [];
			for(var i=0; i<planListResult.length; i++) {
				var planId = planListResult[i].plan_id;
				var title = planListResult[i].title;
				var startDate = planListResult[i].startDate;
				var finishDate = planListResult[i].finishDate;
				//console.log(planId);

				let groupListResult = await mapper.plan.groupList(planId); 
				var groupList = [];
				for(var j=0; j<groupListResult.length; j++) {
					groupList[j] = groupListResult[j].nickname;

				}
				planList.push({planId: planId, title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				//console.log(planList);
				/*.then(function (result) {
					var groupList = [];
					
				}).catch(function (error) {
					console.log(error);
				});*/

			}
			
			res.render('index.html', { nickname: nickname, planList: planList });
	
	} else {
		var sf = '%Y-%m-%d';
		var ff = '%Y-%m-%d';
		var planList = [];
		let planListResult = await mapper.plan.planList(sf, ff);
		
		for(var i=0; i<planListResult.length; i++) {
			var planId = planListResult[i].plan_id;
			var title = planListResult[i].title;
			var startDate = planListResult[i].startDate;
			var finishDate = planListResult[i].finishDate;
			var groupList = [];

			let groupListResult = await mapper.plan.groupList(planId);
			for(var j=0; j<groupListResult.length; j++) {
				groupList[j] = groupListResult[j].nickname;
			}
			planList.push({title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				console.log(planList);
		}
		res.render('index.html', { nickname: 'User', planList: planList });
	}
}
