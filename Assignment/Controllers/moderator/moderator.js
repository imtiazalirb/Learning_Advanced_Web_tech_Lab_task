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
module.exports = router;
