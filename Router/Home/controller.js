const mapper = require('../../DB/mapperController.js');
var util = require('util');


exports.toMyPlan = async function(req, res)
{
	var nickname;
	if (req.session.userId) {
		var userId = req.session.userId;
		let findResult = await mapper.admin.findNicknameById(userId);

		nickname = findResult[0].nickname;
		var planList = [];
		let planIdList = await mapper.plan.findPlanIdByNickname(nickname);
		var sf = '%Y-%m-%d';
		var ff = '%Y-%m-%d';
		//console.log('planIdList: '+ planIdList);
		for(var i=0; i<planIdList.length; i++) {
			var planId = planIdList[i].plan_id;
			//console.log('planId: '+planId);
			var plans = await mapper.plan.planListById(sf, ff, planId);

			let groupListResult = await mapper.plan.groupList(planId); 
			//console.log('groupListResult : '+groupListResult);
			var groupList = [];
			for(var j=0; j<groupListResult.length; j++) {
				groupList[j] = groupListResult[j].nickname;
			}
			planList.push({planId: planId, title: plans[0].title, country: plans[0].country, startDate: plans[0].startDate, finishDate: plans[0].finishDate, group: groupList});
		}

		res.render("myPage_plan.html", {planList: planList, nickname:nickname});
	} else {
		res.redirect('/user/login');
	}
}

exports.toProfile = async function(req, res)
{
	var userId = req.session.userId;
	let nickname = await mapper.admin.findNicknameById(userId);
    res.render("myPage_plan.html", {nickname: nickname[0].nickname});
}
exports.planView = async function(req, res)
{
	var userId = req.session.userId;
	let nickname = await mapper.admin.findNicknameById(userId);
	var planId = req.params.planId;
	var sf = '%Y-%m-%d';
	var ff = '%Y-%m-%d';
	let plans = await mapper.plan.planListById(sf, ff, planId);
	var title = plans[0].title;
	var startDate = plans[0].startDate;
	var finishDate = plans[0].finishDate;
	var v1 = startDate.split("-");
	var v2 = finishDate.split("-");

	var a1 = new Date(v1[0],v1[1],v1[2]).getTime();
	var a2=new Date(v2[0],v2[1],v2[2]).getTime();

	var day = (a2-a1)/(1000*60*60*24) +1;


	console.log('dayValue: '+day);
	let detailPlanList = await mapper.plan.detailPlanList(planId);
	var detailList = [];
	var reviewList = [];
	let reviewListResult = await mapper.plan.getReviewList(planId);
	for(var i=0; i<detailPlanList.length; i++) {
		var daysDetailId = detailPlanList[i].days_detail_id;
		var dayday = detailPlanList[i].days;
		dayday = dayday.substring(3, 4);
		console.log(dayday);
		var st = detailPlanList[i].startTime;
		st = st.substring(0, 5);
		var ft = detailPlanList[i].finishTime;
		ft = ft.substring(0, 5);
		detailList.push({days: dayday,daysDetailId: daysDetailId, content: detailPlanList[i].content, startTime: st, finishTime: ft})
	}
	if (reviewListResult) {
		for (var j = 0; j < reviewListResult.length; j++) {
			var d = reviewListResult[j].days;
			d = d.substring(3, 4);
			reviewList.push({ days: d, review: reviewListResult[j].comment })
		}
		res.render("detailPlanShow_view.html", {nickname: nickname[0].nickname, planId: planId, title: title, day: day, detailList: detailList,fdayValue: 'day1', reviewList: reviewList});
	} else
		res.render("detailPlanShow_view.html", {nickname: nickname[0].nickname, planId: planId, title: title, day: day, detailList: detailList,fdayValue: 'day1'});
    //res.render("detailPlanShow_view.html");
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
				planList.push({planId: planId, title: title, startDate: startDate, finishDate: finishDate, group: groupList});
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
				planList.push({planId: planId, title: title, startDate: startDate, finishDate: finishDate, group: groupList});
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
				planList.push({planId: planId, title: plans[0].title, startDate: plans[0].startDate, finishDate: plans[0].finishDate, group: groupList});
			}
		}
	}
		res.render('index.html', {nickname: nickname, planList : planList});
		//var title=planListResult[0].title;
		//console.log('planListResult: '+title);
			

	}
	
}


exports.toMain = async function (req, res) {
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
				planList.push({planId: planId, title: title, startDate: startDate, finishDate: finishDate, group: groupList});
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
			planList.push({planId: planId, title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				//console.log(planList);
		}
		res.render('index.html', { nickname: 'User', planList: planList });
	}
}
