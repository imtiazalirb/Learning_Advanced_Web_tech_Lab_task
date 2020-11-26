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

module.exports = router;
