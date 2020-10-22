const pool = require('./connection.js');

module.exports = {
	excute: function(sql) {
		return new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con) {
				con.query(sql, function(err, rows) {
					con.release();

					if(err)
						reject(err);

					resolve(rows);
				});
			});
		});
	},

	/**
	* @param {string} sql SELECt * FROM user where id = ?
	
	*/
	excuteParam: function(sql, params) {
		return new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con) {
				con.query(sql, params, function(err, rows) {
					con.release();

					if(err)
						reject(err);

					resolve(rows);
				});
			});
		});
	},


};
