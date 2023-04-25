const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

router.get("/", (req, res, next) => {});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const potentialUser = await User.findOne({ username: req.body.username });
    console.log(potentialUser);
    if (!potentialUser) {
      const salt = bcryptjs.genSaltSync(saltRounds);

      const passwordHash = bcryptjs.hashSync(req.body.password, salt);

      const newUser = await User.create({
        username: req.body.username,
        passwordHash,
      });
      res.redirect("/auth/login");
    } else {
      res.render("auth/signup", {
        errorMessage: "Username already in use",
        data: { username: req.body.username },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// POST to work with trhe values of the login form

router.post("/login", async (req, res, next) => {
  console.log("new login", req.body);
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) {
    res.render("auth/login", { errorMessage: "User does not exist" });
  } else {
  }
});

module.exports = router;
