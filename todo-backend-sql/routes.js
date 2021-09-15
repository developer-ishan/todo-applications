const express = require("express");
const router = express.Router();
const pool = require("./mysqlConnector");
const mysql = require("mysql");
router.get("/todos", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    connection.query("SELECT * FROM todo", (err, rows) => {
      if (err) {
        console.log(err);
        return res.end(500);
      }
      connection.release();
      return res.json(rows);
    });
  });
});

router.post("/todos", (req, res) => {
  const text = req.body.text;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    connection.query(
      "INSERT INTO todo SET ?",
      {
        text: text,
      },
      (err, dbres) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        const newRowId = dbres.insertId;
        connection.query(
          "SELECT * FROM todo WHERE id = ?",
          [newRowId],
          (err, data) => {
            return res.json(data[0]);
          }
        );
      }
    );
    connection.release();
  });
});

router.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const completed = req.body.completed;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    connection.query(
      "UPDATE todo SET text = ?, completed = ? WHERE id = ?",
      [text, completed, id],
      (err, dbres) => {
        if (err) {
          console.log(err);
          return res.end(400);
        }
        connection.query(
          "SELECT * FROM todo WHERE id = ?",
          [id],
          (err, rows) => {
            if (err) {
              console.log(err);
              return res.end(500);
            }
            connection.release();
            return res.json(rows[0]);
          }
        );
      }
    );
  });
});

router.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    connection.query("DELETE FROM todo WHERE id = ?", [id], (err, dbres) => {
      if (err) {
        console.log(err);
        return res.end(400);
      }
      connection.release();
      res.json(dbres.affectedRows);
    });
  });
});

module.exports = router;
