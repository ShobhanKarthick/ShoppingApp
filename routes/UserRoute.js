const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

const UserRoutes = express.Router();
const saltRounds = 10;

let User = require("../models/UserData.model");

UserRoutes.route("/checkuser").post((req, res) => {
	let username = req.body.username;
	User.findOne({ $or:[{email: username}, {phone: username}]})
	.then(user => {
		if(!user){
			res.json({error: "Not Found"})
		}else{

			res.json({error: "Found"})
		}
	})
	.catch(error => {
		console.log(error)
	})
});

UserRoutes.route('/authenticate').post((req, res)=>{
	let identity = req.body;
	User.findOne({$or:[{email: identity.username}, {phone: identity.username}]},'_id hash',function (err, user) {
		if (err) {
			console.log("Database not found");
		} else {
			if (user) {
				bcrypt.compare(identity.password, user.hash, function(err, result) {
					if (result) {
						const token = jwt.sign({id: user._id},'secret',(err, token)=>{res.json({token})});
					} else {
						res.json({error:"Incorrect Password"})
					}
				});
			} else {
				res.json({error:"Not Registered"});
			}
		}
	})
});

UserRoutes.route('/register').post((req, res)=>{
	const data = req.body;
	const verificationCode = randomstring.generate()
	bcrypt.hash(data.password, saltRounds, function(err, hash) {
		const user = new User({name: data.name, email: data.email, hash: hash, phone: data.phone, verificationCode: verificationCode,});
		user.save().then((user) => {
			res.json({success:"User Added"})
			console.log("UserID:",user._id,"verificationCode:",verificationCode);
		});
	});
});

UserRoutes.route('/emailverify').post((req, res)=>{
	let id = req.body.id;
	let code = req.body.code;
	User.findById(id,(err, user) => {
		if (!user.verificationCode) {
			res.json({error:"Already Verified"});
		} else if (user.verificationCode === code) {
			User.findByIdAndUpdate(id, { verificationCode: undefined }, (err, user) => {
				res.json({success:"Verified"});
			})
		} else {
			res.json({error:"Incorrect verification code"})
		}
	})
})

UserRoutes.route('/changepassword').post((req, res)=>{
	const id = req.body.id;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;
	User.findById(id,(err, user) => {
		if (err) {
			console.log("Database not found");
		} else {
			if (user) {
				bcrypt.compare(oldPassword, user.hash, function(err, result) {
					if(result) {
						bcrypt.hash(newPassword, saltRounds, function(err, hash) {
							User.findByIdAndUpdate(id, { hash: hash }, (err, user) => {
								console.log("Password changed")
							})
						});
					}
				});
			} else {
				res.json({error:"Not Registered"});
			}
		}
	})
})

module.exports = UserRoutes