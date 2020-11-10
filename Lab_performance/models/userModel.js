const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from employee where user_name='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from employee where emp_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getByUserName: function(username, callback){
		var sql = "select * from employee where user_name='"+username+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from employee";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO `employee`(`emp_id`, `emp_name`, `company_name`, `phone`, `user_name`, `password`, `type`) VALUES (0,'"+user.fullname+"','"+user.companyname+"','"+user.phone+"','"+user.username+"','"+user.password+"','2')";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(sql, callback){
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `employee` WHERE emp_id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}
