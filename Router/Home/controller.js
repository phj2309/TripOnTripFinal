const mapper = require('../../DB/mapperController.js');
var util = require('util');

exports.toProfile = async function(req, res)
{
    res.render("myPage_profile.html");
}

exports.toMyPlan = async function(req, res)
{
	var userId = req.session.userId;
    res.render("myPage_plan.html");
}

exports.searchPlan = async function(req, res)
{
	var searchword = req.body.searchword;
	var filter = req.body.filter;
	console.log(searchword);
	if(filter == "TITLE") {
		mapper.plan.searchPlanByTitle(searchword).then(async function (result) {
			for(var i=0; i<result.length; i++) {
				var planId = result[i].plan_id;
				var title = result[i].title;
				var startDate = result[i].startDate;
				var finishDate = result[i].finishDate;
				var groupList = [];

				let resultt = await mapper.plan.groupList(planId);
				for (var j = 0; j < resultt.length; j++) {
					groupList[j] = resultt[j].nickname;
				}
				
				planList.push({title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				//console.log(planList);
			}
			
			res.render('index.html', { nickname: 'User', planList: planList });
			
		}).catch(function (error) {
			console.log(error);
		});
	}
	
    res.send();
}

exports.t = async function (req, res) {
	//var keyword="";
	//로그인 여부 판단
	if (req.session.userId) {
		var userId = req.session.userId;

		mapper.admin.findNicknameById(userId).then(function (result) {
			//console.log('index 들어옴');
			var nickname = result[0].nickname;
			//var planList = new Array();
			var sf = '%Y-%m-%d';
			var ff = '%Y-%m-%d';
			var planList = [];
			mapper.plan.planList(sf, ff).then(async function (result) {
				for (var i = 0; i < result.length; i++) {
					var planId = result[i].plan_id;
					var title = result[i].title;
					var startDate = result[i].startDate;
					var finishDate = result[i].finishDate;
					var groupList = [];

					let resultt = await mapper.plan.groupList(planId);
					for (var j = 0; j < resultt.length; j++) {
						groupList[j] = resultt[j].nickname;
					}

					planList.push({ title: title, startDate: startDate, finishDate: finishDate, group: groupList });
					//console.log(planList);
				}

				res.render('index.html', { nickname: nickname, planList: planList });

			}).catch(function (error) {
				console.log(error);
			});
	
		}).catch(function (error) {
			console.log(error);
		});

	} else {
		var sf = '%Y-%m-%d';
		var ff = '%Y-%m-%d';
		var planList = [];
		mapper.plan.planList(sf, ff).then(async function (result) {
			for(var i=0; i<result.length; i++) {
				var planId = result[i].plan_id;
				var title = result[i].title;
				var startDate = result[i].startDate;
				var finishDate = result[i].finishDate;
				var groupList = [];

				let resultt = await mapper.plan.groupList(planId);
				for (var j = 0; j < resultt.length; j++) {
					groupList[j] = resultt[j].nickname;
				}
				
				planList.push({title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				//console.log(planList);
			}
			
			res.render('index.html', { nickname: 'User', planList: planList });
			
		}).catch(function (error) {
			console.log(error);
		});
		

	}
}
