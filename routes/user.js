const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const Hymnal = require("../model/Hymnal");

const route = express.Router();

route.post("/", async (req, res) => {
  const { name, password } = req.body;
  try {
    let admin = await Admin.findOne({ name });
    if (admin) {
      return res.status("400").json({ msg: "This Admin Already exist" });
    }
    admin = new Admin({
      name,
      password,
    });
    const salt = await bcrypt.genSalt(11);

    Admin.password = await bcrypt.hash(password, salt);
    await admin.save();

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
  } catch (err) {
    res.status("500").json({ msg: "Server Error" });
  }
});

//login
route.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    let admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status("400").json({ msg: "No such user" });
    }

    if (password !== admin.password) {
      return res.status("400").json({ msg: "No such user" });
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
    console.log("user " + error.message);
    res.status("500").json({ msg: "Server Error  mkk" });
  }
});

module.exports = route;

//post a new hymnal

route.post("/createHymn", async (req, res) => {
  const { title, body, HymneNo, category } = req.body;
  try {
    let hymnal = new Hymnal({ HymneNo, title, body, category });
    await hymnal.save();
    res.json({ hymnal });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});

//fetch all hymnals

route.get("/getAll", async (req, res) => {
  try {
    let getAll = await Hymnal.find().sort({
      HymneNo: -1,
    });
    let total = await Hymnal.find().count({});
    res.json({ total, getAll });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});

//edit hymnal
route.put("/edit/:hymnalID", async (req, res) => {
  try {
    let edit = await Hymnal.findByIdAndUpdate(req.params.hymnalID, req.body, {
      runValidators: true,
      new: true,
    });
    if (!edit) {
      return res.status(400).json({ msg: "no such  hymnal   " });
    }
    res.json({ edit });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});

//get a particulat hymnal
route.get("/", async (req, res) => {
  try {
    const { HymneNo } = req.body;
    let getAHymn = await Hymnal.findOne({ HymneNo });
    res.json({ getAHymn });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});
