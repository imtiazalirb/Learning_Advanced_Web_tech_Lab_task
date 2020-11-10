const express 		= require('express');
const router 		= express.Router();
router.get('*',(req, res, next) => {
    if(req.session.username!=null){
        next();
    }
    else{
        req.session.destroy();
        res.redirect('/login');
    }
});
router.get('/',(req, res) => {
    var user = {

    };
    user.username = req.session.username;
    user.password = req.session.password;
    res.render('home/index', {user:user});
});
module.exports = router;
