const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const { ObjectID } = mongoose.Schema.Types

let newUser = new Schema({
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
	cart: [
		{
			item: {
				type: Schema.Types.ObjectId,
				ref: 'Products',
				required:true,
			},
			quantity: {
				type:Number,
				required:true,
			}
		},
	],
	orders: {
		type: [{
			id: {
				type:String,
				required: true,
			},
			items: [{
				item: String,
				unitPrice: Number,
				quantity: Number,
			}]
		}],
		required:false,
	}
});

module.exports = mongoose.model('Users', newUser);