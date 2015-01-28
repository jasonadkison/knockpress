var port = 3000;
var db = 'mongodb://localhost/knockpress';

var _ = require('underscore');
var generatePassword = require('password-generator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser')
var morgan = require('morgan');
var colors = require('colors');
var bodyParser = require('body-parser');
var path = require('path');

global.appRoot = path.resolve(__dirname);

mongoose.connect(db);
mongoose.connection.on('error', console.error.bind(console, 'mongodb connection error:'));
mongoose.connection.once('open', function() {
	console.log('Successfully connected to database %s'.green, db);
});

// models
var User = require('./api/models/user');
var Post = require('./api/models/post');

// seed user
User.count(function(err, total) {
	if (err) return console.error(err);

	if (total === 0) {
		admin = new User({
			name: 'Admin',
			email: 'email@email.com',
			is_admin: true
		});

		admin.setPassword('password', function(err, thisModel, passwordErr) {
			if (err) return console.error(err);
			admin.save(function(err, user) {
				if (err) return console.error(err);
				console.log(colors.yellow('user %s seeded'), user)
			});
		});

		
	}
});

// seed posts
Post.count(function(err, total) {
	if (err) return console.error(err);

	if (total === 0) {
		Post.createStubs(5);
	}
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var app = express();

// configure express

// Set the header
app.use(function(req, res, next) {
	res.set("X-Powered-By", "KnockPress");
	next();
});

app.use(cookieParser());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use(expressSession({
	secret: 'keyboard cat'
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(__dirname + '/src'));

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.json({
		message: "Successfully signed in.",
		code: 200
	});
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/api/session', function(request, response) {
	var user = request.user || false;

	if (user) {
		response.status(200);
		response.json(_.omit(user, 'salt', 'hash'));
	} else {
		response.json({
			error: "Unauthorized",
			code: 401
		})
	}
});

// API endpoints
require('./api/endpoints/posts')(app);

app.listen(port, function() {
	console.log('Server running at http://localhost:%d'.green, port);
});