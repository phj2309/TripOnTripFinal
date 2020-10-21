const sql = require('../../sql.js');

module.exports = {

    createPlan: function(_userId, _title, _startDate, _finishDate, _country) {
        return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO  tripontrip_db.plan (user_id, title, startDate, finishDate, country) VALUES (?, ?, ?, ?, ?)';

			sql.excuteParam(insertQuery, [_userId, _title, _startDate, _finishDate, _country]).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	insertGroup: function(_planId,_nickname) {
        return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO tripontrip_db.group (plan_id, nickname) VALUES (?, ?)';

			sql.excuteParam(insertQuery, [_planId, _nickname]).then(function(rows) {
				resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	createDetailPlan: function(_planId, _days, _content, _startTime, _finishTime) {
        return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO tripontrip_db.days_detail (plan_id, days, content, startTime, finishTime) VALUES (?, ?, ?, ?, ?)';

			sql.excuteParam(insertQuery, [_planId, _days, _content, _startTime, _finishTime]).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	searchPlanByTitle: function(_sf, _ff, _Keyword) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT plan_id, title, date_format(startDate, ?) startDate, date_format(finishDate, ?) finishDate FROM tripontrip_db.plan WHERE title LIKE "%"?"%"';

			sql.excuteParam(selectQuery, [_sf, _ff, _Keyword]).then(function(rows) {
				//resolve(rows);
				console.log(rows);
				if(rows.length == 0) {
					resolve(null);
				}
				else {
					resolve(rows);
				}
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	getGroupNickname: function(_planId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT nickname FROM tripontrip_db.group WHERE plan_id = ?';

			sql.excuteParam(selectQuery, [_planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	searchPlanByPlace: function(_Keyword) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT days_detail_id FROM tripontrip_db.place WHERE address LIKE "%"?"%" or keyword LIKE "%"?"%"';

			sql.excuteParam(selectQuery, [_Keyword, _Keyword]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	searchPlanByCountry: function(_sf, _ff, _Keyword) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT plan_id, title, date_format(startDate, ?) startDate, date_format(finishDate, ?) finishDate FROM tripontrip_db.plan WHERE country LIKE "%"?"%"';

			sql.excuteParam(selectQuery, [_sf, _ff, _Keyword]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	insertCost: function (_item, _p_cost,_cost, _days_detail_id) {
		return new Promise(async function (resolve, reject) {
			var insertQuery = 'INSERT INTO tripontrip_db.day_costs (item, p_cost, cost, days_detail_id) VALUES (?, ?, ?, ?)';

			sql.excuteParam(insertQuery, [_item, _p_cost,_cost, _days_detail_id]).then(function (rows) {
				// resolve(rows);
				resolve(true);
			}).catch(function (error) {
				reject(error);
			});
		});
	},
	detailIdList: async function(_planId, _dayValue) {
		return new Promise(async function (resolve, reject) {
			var selectQuery = 'SELECT days_detail_id FROM tripontrip_db.days_detail WHERE plan_id = ? AND days = ?';

			sql.excuteParam(selectQuery, [_planId, _dayValue]).then(function (rows) {
				resolve(rows);
				// resolve(true);
			}).catch(function (error) {
				reject(error);
			});
		});
	},
	groupCount: function(_planId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT count(*) count FROM tripontrip_db.group WHERE plan_id = ?';

			sql.excuteParam(selectQuery, [_planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	detailPlanList: function(_planId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM tripontrip_db.days_detail WHERE plan_id = ?';

			sql.excuteParam(selectQuery, [_planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	getPlanIdList: function(_daysDetailId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT DISTINCT plan_id FROM tripontrip_db.days_detail WHERE days_detail_id = ?';

			sql.excuteParam(selectQuery, [_daysDetailId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	insertReview: function(_days,_comment, _planId) {
        return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO tripontrip_db.review (days, comment, plan_id) VALUES (?, ?, ?)';

			sql.excuteParam(insertQuery, [_days, _comment, _planId]).then(function(rows) {
				resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	insertFavorite: function(_userId,_planId, _daysDetailId) {
        return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO tripontrip_db.favorite (user_id, plan_id, days_detail_id) VALUES (?, ?, ?)';

			sql.excuteParam(insertQuery, [_userId, _planId, _daysDetailId]).then(function(rows) {
				resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	getReviewList: function(_planId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM tripontrip_db.review WHERE plan_id = ?';

			sql.excuteParam(selectQuery, [_planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	getFavoriteList: async function(_userId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM tripontrip_db.favorite WHERE user_id = ?';

			sql.excuteParam(selectQuery, [_userId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	planList: function(_sf, _ff) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT plan_id, title, date_format(startDate, ?) startDate, date_format(finishDate, ?) finishDate FROM tripontrip_db.plan';

			sql.excuteParam(selectQuery, [_sf, _ff]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	groupList: async function(_planId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM tripontrip_db.group WHERE plan_id = ?';

			sql.excuteParam(selectQuery, [_planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	findNicknameByPlanId: function(_planId){
		return new Promise(function(resolve, reject){
			var selectQuery = 'SELECT nickname FROM tripontrip_db.group WHERE plan_id = ?';
			sql.excuteParam(selectQuery, [_planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);
				else
					resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		})
	},
	findPlanIdByNickname: function(_nickname){
		return new Promise(function(resolve, reject){
			var selectQuery = 'SELECT plan_id FROM tripontrip_db.group WHERE nickname = ?';
			sql.excuteParam(selectQuery, [_nickname]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);
				else
					resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		})
	},
	planListById: function(_sf, _ff, _planId){
		return new Promise(function(resolve, reject){
			var selectQuery = 'SELECT title, country, date_format(startDate, ?) startDate, date_format(finishDate, ?) finishDate FROM tripontrip_db.plan WHERE plan_id = ?';
			sql.excuteParam(selectQuery, [_sf, _ff, _planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);
				else
					resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		})
	},
	getUserId: function(_planId){
		return new Promise(function(resolve, reject){
			var selectQuery = 'SELECT user_id FROM tripontrip_db.plan WHERE plan_id = ?';
			sql.excuteParam(selectQuery, [_planId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);
				else
					resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		})
	},
	getDetailPlan: function(_daysDetailId){
		return new Promise(function(resolve, reject){
			var selectQuery = 'SELECT * FROM tripontrip_db.days_detail WHERE days_detail_id = ?';
			sql.excuteParam(selectQuery, [_daysDetailId]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);
				else
					resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		})
	},
	deletePlan: function(_planId){
		return new Promise(function(resolve, reject){
			var deleteQuery = 'DELETE FROM tripontrip_db.plan WHERE plan_id = ?';
			sql.excuteParam(deleteQuery, [_planId]).then(function(rows){
				resolve(true);
			}).catch(function(error){
				reject(error);
			});
		})
	}
}
