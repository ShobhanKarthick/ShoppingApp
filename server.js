const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const app = express();
const UserRoutes = require("./routes/UserRoute");
const ProductRoutes = require("./routes/ProductRoute");

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/ShoppingApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
    console.log("Database server connection established");
});

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.listen(PORT, () => {
    console.log("MongoDB running on PORT: " + PORT);
});