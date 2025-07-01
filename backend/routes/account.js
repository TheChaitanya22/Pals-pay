const { Router } = require("express");
const mongoose = require("mongoose");
const { Accounts } = require("../db");
const { authMiddleware } = require("../middleware");
const router = Router();

router.get("/balance", authMiddleware, async function (req, res) {
  const account = await Accounts.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async function (req, res) {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Accounts.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        messsage: "Insufficient Balance",
      });
    }

    await Accounts.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Accounts.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.json({
      messsage: "Transfer successful",
    });
  } catch (error) {
    console.error(error);
    res.json({
      messsage: error.error,
    });
  }
});

module.exports = {
  accountRouter: router,
};
