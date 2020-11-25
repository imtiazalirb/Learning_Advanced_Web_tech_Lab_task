const express 		= require('express');
const session 		= require('express-session');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	console.log("successfull render signup page")
	res.render('signup/index');
});

router.post('/', (req, res)=>{
	console.log("on signup js")
	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		phone: req.body.phone,
		type: 1
	};

	userModel.insert(user,function(status){
		if(status){
			res.redirect('/login');
		}else{
			res.render('/signup',{msg:"Sign Up was not successfull"});
		}
	});

});


module.exports = router;
