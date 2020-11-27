const express 	= require('express');
const userModel 	= require.main.require('./models/userModel');
const requestModel		= require.main.require('./models/requestModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['id'] == null && req.cookies['type'] !=0){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('admin/index');
});

router.get('/addModerator', (req, res)=>{
	console.log("Router to addModerator")
	res.render('admin/addModerator');
});

router.post('/addModerator',(req,res)=>{
	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		phone: req.body.phone,
		type: req.body.type,
	};
	userModel.insert(user,function(status){
		console.log("status")
		if(status){
			res.redirect('/admin/index');
		}else{
			res.render('/admin/addnewadmin',user);
		}
	});
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
		res.render('admin/viewProfile', user);
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
		res.render('admin/editProfile', user);
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
			res.redirect('/admin/admin/viewProfile');
		}
		else{
			res.render('admin/editProfile', user);
		}
	});
});
router.get('/addFile',(req,res)=>{
	//console.log('Here on addFile');
	res.render('admin/addFile');
});

router.post('/uploadFile',(req,res)=>{
	console.log(req.body.type);
	var type = req.body.type;
	console.log(req.files);
	if(type == 'games')
	{
		//res.send('games');
		console.log('Files: '+req.files);

		console.log(req.body.file);
			if(req.files){
				//console.log(req.body);
				var file = req.files.file;
				var filename = file.name;
				console.log('FileName :'+ filename);

			file.mv('./public/uploads/games/'+filename, function(err){
				if(err){
					res.send(err)
				}
				else{
					res.send("File Uploaded");
				}
			})
		}
	}

	else if(type == 'tvseries' && language == 'english')
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

			file.mv('./public/uploads/tvseries/english'+filename, function(err){
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

			file.mv('./public/uploads/tvseries/bangla'+filename, function(err){
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
	else if(type == 'software')
	{
		console.log(req.body.file);
			if(req.files){
				//console.log(req.body);
				var file = req.files.file;
				var filename = file.name;
				console.log('FileName :'+ filename);

			file.mv('./public/uploads/software/'+filename, function(err){
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

router.get('/allModerator', (req, res)=>{
	console.log("all mod");
	userModel.getAll(function(result){
		 console.log(result);
		// res.send(result);
		res.render('admin/allModerator',{users:result});
	});

});

router.get('/deleteModerator/:id', function(req, res){
	var id = req.params.id;

	// console.log(invoice_id);
	userModel.deleteModerator(id,function(status){
		if(status){
			res.redirect("../allModerator/");
		}
		else{
			res.redirect("../allModerator/");
		}
	});
});

router.get('/fileRequest', (req, res)=>{
	console.log("all requests");
	requestModel.getAll(function(result){
		 console.log(result);
		// res.send(result);
		res.render('admin/fileRequest',{requests:result});
	});

});

router.get('/deleteRequest/:id', function(req, res){
	var id = req.params.id;
	requestModel.delete(id,function(status){
		if(status){
			res.redirect("../fileRequest/");
		}
		else{
			res.redirect("../fileRequest/");
		}
	});
});



// router.get('/ftp',(req,res)=>{
// 	express.static('public/ftp');
// 	serveIndex('public/ftp', { icons: true });
// });

// route.get('/ftp',
//   express.static('public/ftp'),
//   serveIndex('public/ftp', { icons: true })
// )




module.exports = router;
