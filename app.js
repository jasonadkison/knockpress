var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

var logger = function(req, res, next) {
	console.log('Method: ' + req.method, '\nURL: ' + req.url);
	next();
};

app.use(logger);

app.use(express.static(__dirname + '/src'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));

// parse application/json
app.use(bodyParser.json());

var POSTS = [{
	id: 1,
	permalink: 'this-is-a-sample-blog-entry',
	title: 'This is a sample blog entry',
	content: 'Here is some sample content.',
	status: 'published'
}, {
	id: 2,
	permalink: 'example-blog-post',
	title: 'Example blog post',
	content: 'Hello, please keep reading as I amaze you with some random text.',
	status: 'published'
}, {
	id: 3,
	permalink: 'so-you-want-to-read-a-blog-post',
	title: 'So you want to read a blog post?',
	content: 'So here is the content.',
	status: 'published'
}];

function PostModel() {
	this.find = function(id) {
		return POSTS.filter(function(post) {
			return post.id == id;
		})[0];
	};
	this.friendlyFind = function(permalink) {
		return POSTS.filter(function(post) {
			return post.permalink == permalink;
		})[0];
	};
}

var postModel = new PostModel();

app.get('/api/posts', function(req, res) {
	res
		.status(200)
		.json(POSTS)
		.end();
});

app.get('/api/posts/:permalink', function(req, res) {
	console.log('Params: ' + JSON.stringify(req.params), '\nForm Data: ' + JSON.stringify(req.body || {}));
	var post = !isNaN(parseFloat(req.params.permalink)) && isFinite(req.params.permalink) ? postModel.find(req.params.permalink) : postModel.friendlyFind(req.params.permalink);
	res
		.status(200)
		.json(post)
		.end();
});

app.listen(port);
console.log('Server running at http://localhost:' + port);