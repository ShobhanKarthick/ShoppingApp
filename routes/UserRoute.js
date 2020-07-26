const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

const nodemailer = require('nodemailer')
const UserRoutes = express.Router();
const saltRounds = 10;

let User = require("../models/UserData.model");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
	  user: "shoppieeasy@gmail.com",
	  pass: "easyshoppie@123",
	},
  });

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
		user.save()
		.then((user) => {
			res.json({success:"User Added"})
			const mailOptions = {
				from: "shoppieeasy@gmail.com",
				to: user.email,
				subject: "Verification Code",
				html: `<h2>Hello ${user.name},<br> Thanks for registering with Easy Shoppie</h2>
				  <br>
				  <h3>Please click the below link to verify your account</h3>
				  <a href="http://localhost:3000/verification/${user._id}/${user.verificationCode}" target="_blank"> http://localhost:3000/verification/${user._id}/${user.verificationCode} </a>
				  `,
			  };
		
			  transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
				  console.log(err);
				  console.log("Mail not sent!");
				} else {
				  console.log("Email sent");
				}
			  });
		})
		.catch(error => {
			res.status(400).send("User was not added")
		})
	});
});

UserRoutes.route('/emailverify').post((req, res)=>{
	let id = req.body.id;
	let code = req.body.code;
	User.findById(id,(err, user) => {
		if(user){
			if (!user.verificationCode) {
				res.status(200)
				res.json({error:"Already Verified"});
			} else if (user.verificationCode === code) {
				User.findByIdAndUpdate(id, { verificationCode: undefined }, (err, user) => {
					res.status(200)
					res.json({error:"Verified"});
				})
			} else {
				res.json({error:"Incorrect verification code"})
			}
		}
		else{
			res.status(400).send("User not found")
			res.json({error:"User not found"})
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
UserRoutes.route('/cart').post((req, res)=>{
	const body = req.body;
	User.findById(body.id, (err, user) => {
		const index = user.cart.map(a=>a.item).indexOf(body.item);
		if (body.quantity == 0) {
			user.cart = user.cart.filter((a) => a.id == body.item)
		} else if (index != -1) {
			console.log(user.cart,index)
			user.cart[index].quantity = body.quantity
		} else {
			user.cart.push({item:body.item, quantity:body.quantity})
		}
		user.save().then(user => {
			res.status(200).json({success:'success'})
		});
	})
})

module.exports = UserRoutes