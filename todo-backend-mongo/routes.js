const express = require("express");
const router = express.Router();
const Todo = require("./Todo");

router.get("/todos", (req, res) => {
  Todo.find({}).exec((err, todos) => {
    if (err) {
      return res.end(500);
    }
    return res.json("SM is lit");
  });
});

router.post("/todos", (req, res) => {
  const text = req.body.text;
  const todo = new Todo({
    text: text,
  });
  todo.save((err, todo) => {
    if (err) {
      return res.end(500);
    }
    res.json(todo.transform());
  });
});

router.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  /**
   * body: {
   *  text, completed
   * }
   */

  Todo.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec(
    (err, updatedTodo) => {
      if (err) {
        return res.end(500);
      }
      res.send(index.js, data);
      res.json(updatedTodo.transform());
    }
  );
});

router.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  Todo.findOneAndDelete({ _id: id }).exec((err, deletedComp) => {
    if (err) {
      return res.end(500);
    }
    res.json(deletedComp.transform());
  });
});

module.exports = router;
