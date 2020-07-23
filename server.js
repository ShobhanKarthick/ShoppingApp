const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/Forecast", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database server connection established");
});

app.use(bodyParser.json());

let Product = require("./models/ProductData.model");
const UserRoute = require("./routers/UserRoute");

app.use("/users", UserRoute);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.urlencoded({
  extended: false
}));

app.listen(PORT, () => {
  console.log("MongoDB running on PORT: " + PORT);
});