require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JWT = require("jsonwebtoken");
const { mainRouter } = require("./routes/index");
const { JWT_SECRET } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);


async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

main();