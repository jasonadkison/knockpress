var port = 3000;
var mongooseUri = 'mongodb://localhost/knockpress';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('combined'));
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function() {
	console.log('mongodb connection successful');
});

var Post = require('./api/models/Post');
var User = require('./api/models/User');

// Stub posts if none exist
Post.stubWhenNone(12);

// GET /api/posts
app.get('/api/posts', function(req, res) {
	Post.find(function(err, posts) {
		if (err) return res.status(500).end();

		res.status(200).json(posts).end();
	});
});

// GET /api/posts/:permalink
app.get('/api/posts/:permalink', function(req, res) {
	Post.where({ permalink: req.params.permalink }).findOne(function(err, post) {
		if (err) return res.status(500).end();

		res.status(200).json(post).end();
	});
});

// PUT /api/posts/:permalink
app.put('/api/posts/:permalink', function(req, res) {
	var post = {
		title: req.body.title,
		content: req.body.content,
		status: req.body.status
	};
	Post.update({permalink: req.params.permalink}, post, function(err) {
		if (err) return res.status(422).json({error: true, message: "Post could not be updated."}).end();

		res.status(200).json({success: true, message: "Post updated successfully."});
	})
});

app.listen(port);
console.log('Server running at http://localhost:' + port);