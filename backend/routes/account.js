const { Router } = require("express");
const mongoose = require("mongoose");
const { Accounts } = require("../db");
const router = Router();



router.get("/balance", async function(req, res){
    const account = await Accounts.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance,
    })
})

router.get("/transfer", async function(req, res){
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount ,to } = req.body;

    const account = await Accounts.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            messsage: "Insufficient Balance"
        });
    }

    await Accounts.updateOne({ userId: req.userId }, {$inc: { balance: -amount }}).session(session);
    await Accounts.updateOne({userId: to}, { $inc: { balance: amount }}).session(session);

    await session.commitTransaction();

    res.json({
        messsage: "Transfer successful"
    });
});

module.exports = {
    accountRouter: router
}