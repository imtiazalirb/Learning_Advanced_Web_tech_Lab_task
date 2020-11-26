const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
				console.log("Success login userModel");
			}
			else{
				callback(null);
			}
		});
	},

	insert: function(user, callback){
		var sql = "INSERT INTO users(id, name,username, password,email,phone,type) VALUES ('"+user.id+"','"+user.name+"','"+user.username+"','"+user.password+"','"+user.email+"','"+user.phone+"','"+user.type+"')";
		db.execute(sql,function(status){
			callback(status);
		});
	},

	getById: function(id, callback){
		console.log("Get by uid")
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
};
