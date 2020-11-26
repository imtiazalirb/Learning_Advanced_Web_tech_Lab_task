const express 	= require('express');
const userModel = require.main.require('./models/userModel');
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

module.exports = router;
