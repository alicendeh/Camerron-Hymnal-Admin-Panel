const express = require("express");
const Auth = require("../middleware/Auth");
const Todo = require("../model/Hymnal");

const router = express.Router();

//create todo
router.post("/createTodo", Auth, async (req, res) => {
  const { title, body } = req.body;
  try {
    let todo = new Todo({ User: req.user.id, title, body });
    await todo.save();
    res.json({ todo });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});

//edit todo
router.put("/edit/:todoID", Auth, async (req, res) => {
  try {
    let editToDo = await Todo.findByIdAndUpdate(req.params.todoID, req.body, {
      runValidators: true,
      new: true,
    });
    if (!editToDo) {
      return res.status(400).json({ msg: "no such     Todo" });
    }
    res.json({ editToDo });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});

//get all todo
router.get("/getAll", Auth, async (req, res) => {
  try {
    let getAll = await Todo.find({ User: req.user.id }).sort({
      date: -1,
    });
    let total = await Todo.find({ User: req.user.id }).count({});
    res.json({ total, getAll });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});

//get a particular todo
router.get("/getOne/:todoID", Auth, async (req, res) => {
  try {
    let getAll = await Todo.findById(req.params.todoID);
    res.json({ getAll });
  } catch (error) {
    console.log(error.message);
    res.status("500").json({ msg: error.message });
  }
});
//delete todo
router.delete("/delete/:todoID", Auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.todoID);

    if (!todo) return res.status(404).json({ msg: "todo not found" });

    // Make sure user owns contact
    // if (todo.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    await Todo.findByIdAndRemove(req.params.todoID);

    res.json({ msg: "todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//delete all todo'
router.delete("/deleteAll", Auth, async (req, res) => {
  try {
    let deleteAllTodo = await Todo.deleteMany({});
    res.json({ msg: "all todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
