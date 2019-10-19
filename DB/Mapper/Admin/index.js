const sql = require('../../sql.js');

module.exports = {

	isUser: function(_id) {
		return new Promise(async function(resolve, reject) {
			var selectQuery = 'SELECT EXISTS(SELECT 1 FROM user WHERE id = ? LIMIT 1) as count';

			let result = await sql.excuteParam(selectQuery, [_id]);
			
			//.then(function(rows) {
				if(result[0].count == 0) // 존재하지 않음
					resolve(false);
				else{
					resolve(true);
				}
		});
	},
	//id로 nickname 조회
	findNicknameById: function(_id){
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT nickname FROM user WHERE id = ?';

			sql.excuteParam(selectQuery, [_id]).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	//id로 유저 정보 조회
	getUserInfoById: function(_id) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM user WHERE id = ?';

			sql.excuteParam(selectQuery, [_id]).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	//mate들의 nickname 유효성 검사
	hasNickname: function (_nickname) {
		return new Promise(async function (resolve, reject) {
			var selectQuery = 'SELECT EXISTS(SELECT 1 FROM user WHERE nickname = ? LIMIT 1) as count';

			let result = await sql.excuteParam(selectQuery, [_nickname]);

			//.then(function(rows) {
			if (result[0].count == 0) // 존재하지 않음
				resolve(false);
			else {
				resolve(true);
			}

		});
	},
	// User Register
	isRegKey: function(_regKey) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT EXISTS(SELECT 1 FROM User WHERE regKey = ? LIMIT 1) as count';

			sql.excuteParam(selectQuery, [_regKey]).then(function(rows) {
				if(rows[0].count == 0) // 존재하지 않음
					resolve(false);
				else
					resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	createUser: function(_id, _nickname, _password, _email) {
		return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO user (id, nickname, password, email) VALUES ( ?, ?, ?, ? )';

			sql.excuteParam(insertQuery, [_id, _nickname, _password, _email]).then(function(rows) {
				resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	adminLogin: function(_id, _pw) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT EXISTS(SELECT 1 FROM AdminUser WHERE id = ? and pw = ? LIMIT 1) as count';

			sql.excuteParam(selectQuery, [_id, _pw]).then(function(rows) {
				if(rows[0].count == 0) // 존재하지 않음
					resolve(false);
				else
					resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	getUserList: function() {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM User';

			sql.excute(selectQuery).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	getUserListToKeyword: function(_search, _searchKeyword) {
		return new Promise(function(resolve, reject) {
			var search = '%' + _search + '%';
			var selectQuery = 'SELECT * FROM User WHERE ' + _searchKeyword + ' LIKE ?';

			sql.excuteParam(selectQuery, [search]).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	reportCreate: function(_surveyTitle, _surveyDesc, _json) {

		return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO Survey (surveyUUID, surveyTitle, surveyDesc, form) VALUES (UNHEX(REPLACE(UUID(), \"-\", \"\")), ?, ?, ?);';

			sql.excuteParam(insertQuery, [_surveyTitle, _surveyDesc, JSON.stringify(_json)]).then(function(rows) {
				resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	getReportList: async function() {
		var selectQuery = 'SELECT HEX(surveyUUID) as surveyUUID, surveyTitle, surveyDesc, createTime, status FROM Survey';

		return await sql.excute(selectQuery);
	},

	getReportInfo: async function(_surveyUUID)
	{
		var selectQuery = 'SELECT count(finish) as invitedCnt, count(finish = 1) as respondCnt, max(userSurveyFinishTIME) as lastSurveyTime  FROM survey.SurveyInvitedList WHERE surveyUUID = UNHEX(?)';

		return await sql.excuteParam(selectQuery, [_surveyUUID]);

	},

	getReportForm: function(_surveyUUID)
	{
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT form FROM Survey WHERE surveyUUID = UNHEX(?)';

			sql.excuteParam(selectQuery, [_surveyUUID]).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	relationCreate: function(_title, _relationGroup) {
		return new Promise(function(resolve, reject) {
			var insertQuery = 'INSERT INTO Relation (relationUUID, name, relationGroup, createTime) VALUES (UNHEX(REPLACE(UUID(), \"-\", \"\")), ?, ?, CURRENT_TIMESTAMP);';

			sql.excuteParam(insertQuery, [_title, JSON.stringify(_relationGroup)]).then(function(rows) {
				resolve(true);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	
	getRelationList: function() {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT HEX(relationUUID) as relationUUID, name, relationGroup, createTime FROM Relation';

			sql.excute(selectQuery).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	getRelation: function(_relationUUID) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT HEX(relationUUID) as relationUUID, name, relationGroup, createTime FROM Relation WHERE relationUUID = UNHEX(?)';

			sql.excuteParam(selectQuery, [_relationUUID]).then(function(rows) {
				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	}
}
