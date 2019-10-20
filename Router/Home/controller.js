const mapper = require('../../DB/mapperController.js');
var util = require('util');


exports.toMyPlan = async function(req, res)
{
	var userId = req.session.userId;
    res.render("myPage_plan.html");
}

exports.searchPlan = async function(req, res)
{
	var filter = req.params.filter;
	var search = req.body.search;
	var sf = '%Y-%m-%d';
	var ff = '%Y-%m-%d';
	console.log(search);
	console.log(filter);

	var nickname;
		if(req.session.userId) {
			var userId = req.session.userId;
		let findResult = await mapper.admin.findNicknameById(userId);
		
		nickname = findResult[0].nickname;
		} else {
			nickname='User';
		}

	if(filter == "TITLE") {
		let planListResult = await mapper.plan.searchPlanByTitle(sf, ff, search);
		var planList = [];
		console.log('planListResult: '+planListResult);

		var title=planListResult[0].title;
		console.log('planListResult: '+title);
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
				planList.push({title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				console.log(planList);

			}
			res.render('index.html', {nickname: nickname, planList : planList});
		
	} else {
		let planListResult = await mapper.plan.searchPlanByCountry(sf, ff, search);
		var planList = [];
		//console.log('planListResult: '+planListResult);
		if(planListResult != null) {
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
				planList.push({title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				//console.log(planList);

			}
		} else {

		let daysDetailIdList = await mapper.plan.searchPlanByPlace(search);
		if(daysDetailIdList != null) {
			let planIdList = [];
			for(var i=0; i<daysDetailIdList.length; i++) {
				var daysDetailId = daysDetailIdList[i].days_detail_id;
				var p = await mapper.plan.getPlanIdList(daysDetailId);
				planIdList.push(p[0].plan_id);
				console.log('planIdList : '+planIdList[i]);
				//let planListResult = await mapper.plan.planListById(sf, ff, planIdList[i]);
			}
			//console.log('planIdList final : '+planIdList);
			//let plans;
			for(var i=0; i<planIdList.length; i++) {
				var planId = planIdList[i];
				console.log('planId: '+planId);
				var plans = await mapper.plan.planListById(sf, ff, planId);

				let groupListResult = await mapper.plan.groupList(planId); 
				var groupList = [];
				for(var j=0; j<groupListResult.length; j++) {
					groupList[j] = groupListResult[j].nickname;
				}
				planList.push({title: plans[0].title, startDate: plans[0].startDate, finishDate: plans[0].finishDate, group: groupList});
			}
		}
	}
		res.render('index.html', {nickname: nickname, planList : planList});
		//var title=planListResult[0].title;
		//console.log('planListResult: '+title);
			

	}
	
}


exports.toProfile = async function (req, res) {
	//var keyword="";
	//로그인 여부 판단
	if (req.session.userId) {
		var userId = req.session.userId;

		let findResult = await mapper.admin.findNicknameById(userId);
		
		var nickname = findResult[0].nickname;
			//var planList = new Array();
			var sf = '%Y-%m-%d';
			var ff = '%Y-%m-%d';

			let planListResult = await mapper.plan.planList(sf, ff);
	
			var planList = [];
			for(var i=0; i < planListResult.length; i++) {
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
				planList.push({title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				//console.log(planList);
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
				//console.log(planList);
		}
		res.render('index.html', { nickname: 'User', planList: planList });
	}
}
