const express 			= require('express');
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
const upload			= require('express-fileupload');
const serveIndex 		= require('serve-index');
const path				= require('path');
const listEndpoints		= require('express-list-endpoints-descriptor');
const login				= require('./Controllers/login/login');
const logout			= require('./Controllers/logout');
const signup			= require('./Controllers/signup/signup');
const admin				= require('./Controllers/admin/admin');
const moderator			= require('./Controllers/moderator/moderator');
const home			    = require('./Controllers/home');
const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');

//middleware
app.use(upload());
app.use('/assets', express.static('assets'));
app.use(express.static('.public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/admin/admin', admin);
app.use('/moderator/moderator', moderator);
app.use('/home', home);
app.use(
  '/ftp',
  express.static('public'),
  serveIndex('public/uploads/', { icons: true })
)

app.use(
  '/ftp/game',
  express.static('public'),
  serveIndex('public/uploads/game', { icons: true })
)

app.use(
  '/ftp/game/movie/bangla',
  express.static('public'),
  serveIndex('public/uploads/movie/bangla', { icons: true })
)

app.use(
  '/ftp/game/movie/english',
  express.static('public'),
  serveIndex('public/uploads/movie/english', { icons: true })
)

app.use(
  '/ftp/game/software',
  express.static('public'),
  serveIndex('public/uploads/software', { icons: true })
)

app.use(
  '/ftp/game/tvseries/bangla',
  express.static('public'),
  serveIndex('public/uploads/tvseries/bangla', { icons: true })
)

app.use(
  '/ftp/game/tvseries/english',
  express.static('public'),
  serveIndex('public/uploads/tvseries/english', { icons: true })
)
//app.use('/user',user);

//router
app.get('/', (req, res)=>{
	//console.log(listEndpoints(app));
	res.redirect('/home');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});
