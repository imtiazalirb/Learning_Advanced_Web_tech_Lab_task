const db = require('./db');

module.exports={

    getAll: function(callback){
        var sql = "select * from requests";
        db.getResults(sql, function(result){
            if(result.length > 0){
                callback(result);
            }else{
                callback(null);
            }
        });
    },

    insert: function(request, callback){
		var sql = "INSERT INTO requests(name, type) VALUES ('"+request.name+"','"+request.type+"')";
		db.execute(sql,function(status){
			callback(status);
		});
	},

    delete: function(id, callback){
		var sql = "delete from requests where id='"+id+"'; ";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

};
