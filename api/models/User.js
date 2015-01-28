var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var faker = require('faker');
var slug = require('slug');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	is_admin: { type: Boolean, default: false }
}, {
	collection: 'User'
});

User.plugin(passportLocalMongoose, {
	usernameField: 'email'
});

module.exports = mongoose.model('User', User);