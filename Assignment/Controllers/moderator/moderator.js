const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['id'] == null && req.cookies['type'] !=1){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('moderator/index');
});

router.get('/viewProfile',(req,res)=>{
	userModel.getById(req.cookies['id'],function(result){
		var user = {
			name: result.name,
			username: result.username,
			password: result.password,
			email: result.email,
			phone: result.phone
		};
		res.render('moderator/viewProfile', user);
	});
});

router.get('/editProfile',(req,res)=>{
	userModel.getById(req.cookies['id'],function(result){
		console.log(result);
		var user = {
			name: result.name,
			username: result.username,
			password: result.password,
			email: result.email,
			phone: result.phone
		};
		res.render('moderator/editProfile', user);
	});
});

router.post('/editProfile',(req,res)=>{
	var user = {
			id: req.cookies["id"],
			name: req.body.name,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			phone: req.body.phone
	};
	userModel.update(user,function(status){
		if(status){
			res.redirect('/moderator/moderator/viewProfile');
		}
		else{
			res.render('moderator/editProfile', user);
		}
	});
});

router.get('/addFile',(req,res)=>{
	console.log('Here on addFile');
	res.render('moderator/addFile');
});

router.post('/uploadFile',(req,res)=>{
	console.log(req.body.type);
	var type = req.body.type;
	var language = req.body.language;
	console.log(req.files);

	if(type == 'tvseries' && language == 'english')
	{
		//res.send('tvseries');
		//res.send('games');
		console.log('Files: '+req.files);

		console.log(req.body.file);
			if(req.files){
				//console.log(req.body);
				var file = req.files.file;
				var filename = file.name;
				console.log('FileName :'+ filename);

			file.mv('./public/uploads/tvseries/english/'+filename, function(err){
				if(err){
					res.send(err)
				}
				else{
					res.send("File Uploaded");
				}
			})
		}
	}
	else if(type == 'tvseries' && language == 'bangla')
	{
		//res.send('tvseries');
		//res.send('games');
		console.log('Files: '+req.files);

		console.log(req.body.file);
			if(req.files){
				//console.log(req.body);
				var file = req.files.file;
				var filename = file.name;
				console.log('FileName :'+ filename);

			file.mv('./public/uploads/tvseries/bangla/'+filename, function(err){
				if(err){
					res.send(err)
				}
				else{
					res.send("File Uploaded");
				}
			})
		}
	}
	else if(type == 'movie' && language == 'english')
	{
		console.log(req.body.file);
			if(req.files){
				//console.log(req.body);
				var file = req.files.file;
				var filename = file.name;
				console.log('FileName :'+ filename);

			file.mv('./public/uploads/movie/english/'+filename, function(err){
				if(err){
					res.send(err)
				}
				else{
					res.send("File Uploaded");
				}
			})
		}
	}
	else if(type == 'movie' && language == 'bangla')
	{
		console.log(req.body.file);
			if(req.files){
				//console.log(req.body);
				var file = req.files.file;
				var filename = file.name;
				console.log('FileName :'+ filename);

			file.mv('./public/uploads/movie/bangla/'+filename, function(err){
				if(err){
					res.send(err)
				}
				else{
					res.send("File Uploaded");
				}
			})
		}
	}
	else{
		res.send('Post not okay');
	}
});

module.exports = router;
