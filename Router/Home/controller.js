const mapper = require('../../DB/mapperController.js');
var util = require('util');
exports.t = async function (req, res) {
	//var keyword="";
	//로그인 여부 판단
	if (req.session.userId) {
		var userId = req.session.userId;

		mapper.admin.findNicknameById(userId).then(function (result) {
			//console.log('index 들어옴');
			var nickname = result[0].nickname;
			//var planList = new Array();
			mapper.plan.planList().then(function (result) {
				var planList = [];
				for(var i=0; i<result.length; i++) {
                    var planId = result[i].plan_id;
                    var title = result[i].title;
                    var startDate = result[i].startDate;
					var finishDate = result[i].finishDate;
					//console.log(planId);

					mapper.plan.groupList(planId).then(function (result) {
						var groupList = [];
						for(var j=0; j<result.length; j++) {
							groupList[j] = result[j].nickname;

						}
						planList.push({planId: planId, title: title, startDate: startDate, finishDate: finishDate, group: groupList});
						//console.log(planList);
					}).catch(function (error) {
						console.log(error);
					});

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
		mapper.plan.planList(sf, ff).then(function (result) {
			for(var i=0; i<result.length; i++) {
				var planId = result[i].plan_id;
				var title = result[i].title;
				var startDate = result[i].startDate;
				var finishDate = result[i].finishDate;
				var groupList = [];

				mapper.plan.groupList(planId).then(function (result) {
					for(var j=0; j<result.length; j++) {
						groupList[j] = result[j].nickname;
					}
					//console.log(title);
				}).catch(function (error) {
					console.log(error);
				});
				
				planList.push({title: title, startDate: startDate, finishDate: finishDate, group: groupList});
				console.log(planList);
			}
			
			
			
		}).catch(function (error) {
			console.log(error);
		});
		res.render('index.html', { nickname: 'User', planList: planList });

	}
}
