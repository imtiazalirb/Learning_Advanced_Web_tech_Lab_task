const express 		= require('express');
const requestModel		= require.main.require('./models/requestModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('home/index');
});

router.get('/requestFile', (req, res)=>{
	res.render('home/requestFile');
});

router.post('/requestFile',(req,res)=>{
	console.log("here");
	var request = {
		name: req.body.name,
		type: req.body.type,
	};
	requestModel.insert(request,function(status){
		if(status){
			res.redirect('/home');
		}else{
			res.redirect('/home/requestFile',request);
		}
	});
});

module.exports = router;
