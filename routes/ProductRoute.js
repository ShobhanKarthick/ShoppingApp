const express = require('express');

const ProductRoutes = express.Router();

let Product = require("../models/ProductData.model");

ProductRoutes.route("/").get((req, res) => {
	Product.find()
	.then(products => {
		res.status(200).json(products)
	})
	.catch(error => {
		res.status(400).json({error: "products db is unavaiable"})
	})
})

ProductRoutes.route("/categories").get((req, res) => {
	Product.distinct("category")
	.then(category => {
		res.status(200).json(category)
	})
	.catch(error => {
		res.status(400).json({error})
	})
})

ProductRoutes.route("/search").post((req, res)=>{
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