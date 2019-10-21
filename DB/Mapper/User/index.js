const sql = require('../../sql.js');

module.exports = {

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

	// applyUser: function(_email, _name, _sex, _birthday) {
	// 	return new Promise(function(resolve, reject) {
	// 		var updateQuery = 'UPDATE User SET name = ?, sex = ?, birthday = ?, regTime = CURRENT_TIMESTAMP WHERE email = ?';

	// 		sql.excuteParam(updateQuery, [_name, _sex, _birthday, _email]).then(function(rows) {
	// 			resolve(true);
	// 		}).catch(function(error) {
	// 			reject(error);
	// 		});
	// 	});
	// },

	getUserId: function(_id) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT * FROM user WHERE id = ?';

			sql.excuteParam(selectQuery, [_id]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	},
	getNickname: function(_userId) {
		return new Promise(function(resolve, reject) {
			var selectQuery = 'SELECT nickname FROM tripontrip_db.user WHERE user_id = ?';

			sql.excuteParam(selectQuery, [_userId ]).then(function(rows) {
				if(rows.length == 0)
					resolve(null);

				resolve(rows);
			}).catch(function(error) {
				reject(error);
			});
		});
	}
}
