var mongoose = require('mongoose');
var faker = require('faker');
var slug = require('slug');

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);