var mongoose = require('mongoose');
var faker = require('faker');
var slug = require('slug');

var PostSchema = new mongoose.Schema({
	permalink: { type: String, index: { unique: true }},
	title: String,
	content: String,
	status: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

PostSchema.statics.createStubs = function(total, cb) {
	total = !isNaN(parseInt(total)) && total > 0 ? total : 0;
	if (total < 1) return;

	console.log('stubbing %d post(s)', total);

	var post, title;

	for (var i = 0; i < total; i++) {
		title = faker.lorem.sentence();
		post = {
			permalink: slug(title),
			title: title,
			content: faker.lorem.paragraph(),
			status: 'published'
		};
		this.create(post, function(err, post) {
			if (err) return console.error(err);
			console.log('post %s stubbed successfully', post._id);
		});
	}
};

PostSchema.statics.removeAll = function(cb) {
	this.remove(function(err, removed) {
		if (err) return;

		console.log('%d post(s) removed', removed);

		if (typeof cb === 'function') {
			cb(removed);
		}
	});
};

PostSchema.statics.stubWhenNone = function(total) {
	var self = this;
	this.count(function(err, total) {
		if (err || total > 0) return;

		self.createStubs(15);
	});
};

module.exports = mongoose.model('Post', PostSchema);