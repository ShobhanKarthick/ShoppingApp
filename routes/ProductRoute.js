const express = require('express');

const ProductRoutes = express.Router();

let Product = require("../models/ProductData.model");

ProductRoutes.route("/").post((req, res)=>{
	let query = new RegExp(req.body.search.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'),"i");
	console.log({ title: query });
	Product.find({$or:[{title: query},{description: query}] },(err, product)=> {
		if (err) {
			res.json({error:"Database not found"})
		} else {
			res.json(product)
		}
	})
})

ProductRoutes.route("/add").post((req, res)=>{
	let query = req.body;
	const product = new Product(query);
	product.save((err,user)=>{
		if (err) {
			res.json({error:err})
		} else {
			res.json({success:"Product Added"})
		}
		
	})
})

module.exports = ProductRoutes