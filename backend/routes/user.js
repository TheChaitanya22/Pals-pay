const { User, Accounts } = require("../db");
const { Router } = require("express");
const router = Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  userName: z.string().email(),
  password: z.string().min(3).max(20),
});

router.post("/signup", async function (req, res) {
  const parsedSignupData = signupBody.safeParse(req.body);

  if (!parsedSignupData.success) {
    return res.json({
      message: "Incorrect Format",
      error: parsedSignupData.error,
    });
  }

  const existingUser = await User.findOne({
    userName: req.body.userName,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / incorrect inputs",
    });
  }
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
  });

  const userId = user._id;
  await Accounts.create({
    userId,
    balance: 1 + Math.floor(Math.random() * 10000),
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User successfully created",
    token: token,
  });
});

const sigininBody = z.object({
  userName: z.string().email(),
  password: z.string().min(3).max(20),
});

router.post("/signin", authMiddleware, async function (req, res) {
  const parsedSigninData = sigininBody.safeParse(req.body);

  if (!parsedSigninData.success) {
    return res.json({
      message: "Incorrect Format",
      error: parsedSignupData.error,
    });
  }

  const userFound = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });

  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  if (userFound) {
    return res.status(200).json({
      message: "Signin Successful",
      token: token,
    });
  } else {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
});

router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = {
  userRouter: router,
};
