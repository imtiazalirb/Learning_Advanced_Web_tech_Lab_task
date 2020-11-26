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
		console.log("Get by id")
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},

	update: function(user, callback){
		console.log("update working half")
		var sql = "UPDATE users SET name='"+user.name+"',username='"+user.username+"',password='"+user.password+"',phone='"+user.phone+"',email='"+user.email+"' WHERE id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	},
};
