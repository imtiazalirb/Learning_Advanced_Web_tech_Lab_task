const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(result){
			console.log(result);
			var status = JSON.stringify(result.type);
			var uid = JSON.stringify(result.id);
			console.log(status);
			if(status == 0){
				res.cookie('username', req.body.username);
				res.cookie('id', parseInt(uid));
				//res.exSession.id= parseInt(id);
				//res.redirect('/Delivery/Delivery_home');
                console.log("Success user type return - admin");
				res.redirect('/admin/admin');
			}
			else if(status == 1){
				res.cookie('uname', req.body.username);
				res.cookie('id', parseInt(uid));
				//res.exSession.id= parseInt(id);
				//res.redirect('/Delivery/Delivery_home');
                console.log("Success user type return - moderator");
				res.redirect('/moderator/moderator');
			}
			else{
				//res.redirect('/');
				console.log("Invalid");
			    res.send("Invalid Username or password");
				//res.redirect('/login');
			}
	});
});

module.exports = router;
