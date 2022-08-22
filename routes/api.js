"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {});

  app.route("/api/solve").post((req, res) => {
    const string = req.body.puzzle;
    if (!string) {
      res.json({ error: "Required field missing" });
      return;
    } else if (solver.validate(string) == "NN") {
      res.json({ error: "Invalid characters in puzzle" });
      return;
    } else if (string.length != 81) {
      res.json({ error: "Expected puzzle to be 81 characters long" });
      return;
    }
    if (!solver.solve(string)) {
      res.json({ error: "Puzzle cannot be solved" });
      return;
    }
    res.json({ solution: solver.solve(string) });
  });
};
