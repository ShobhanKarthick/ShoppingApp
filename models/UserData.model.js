const mongoose = require('mongoose');
const schema = mongoose.Schema;

let newUser = new schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
	},
	hash: {
		type:String,
		required: true,
	},
	verificationCode: {
		type:String,
		required: false,
	},
});

module.exports = mongoose.model('Users', newUser);