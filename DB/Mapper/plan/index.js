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
	searchPlanByTitle: function(_Keyword) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM tripontrip_db.plan WHERE title LIKE "%?%"';

			sql.excuteParam(selectQuery, [_Keyword]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
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
			var selectQuery = 'SELECT * FROM tripontrip_db.place WHERE address LIKE "%?%"';

			sql.excuteParam(selectQuery, [_Keyword]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	searchPlanByPlaceKeyword: function(_Keyword) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM tripontrip_db.place WHERE keyword LIKE "%?%"';

			sql.excuteParam(selectQuery, [_Keyword]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	cost: function (_item, _p_cost,_cost, _days_detail_id) {
		return new Promise(function (resolve, reject) {
			var insertQuery = 'INSERT INTO tripontrip_db.day_costs (item, p_cost, cost, days_detail_id) VALUES (?, ?, ?, ?)';

			sql.excuteParam(insertQuery, [_item, _p_cost,_cost, _days_detail_id]).then(function (rows) {
				// resolve(rows);
				resolve(true);
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
	insertReview: function(_days,_comment) {
        return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO tripontrip_db.review (days, comment) VALUES (?, ?)';

			sql.excuteParam(insertQuery, [_days, _comment]).then(function(rows) {
				resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	planList: function() {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM tripontrip_db.plan';

			sql.excuteParam(selectQuery).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	groupList: function(_planId) {
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
	}
}
