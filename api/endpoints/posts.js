var Post = require('../models/post');

var posts = function(app) {

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

};

module.exports = posts;