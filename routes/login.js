const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const Auth = require("../middleware/Auth");

const route = express.Router();

route.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    let admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status("400").json({ msg: "No such user" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status("400").json({ msg: "Wrong Password" });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };
    await jwt.sign(payload, "todo", { expiresIn: 36000 }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: "Server Error" });
  }
});

module.exports = route;
