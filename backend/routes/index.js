const express = require("express");
const { userRouter } = require("./user")
const { Router } = require("express");
const { accountRouter } = require("./account");
const router = Router();

router.use("/user",userRouter)
router.use("/account",accountRouter)

module.exports = {
    router: router
};