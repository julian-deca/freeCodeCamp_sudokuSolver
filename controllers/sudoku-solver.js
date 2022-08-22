class SudokuSolver {
  letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return "RL";
    }
    if (!/^[0-9\.]*$/.test(puzzleString)) {
      return "NN";
    } else {
      return "V";
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {
    const val = this.validate(puzzleString);
    if (!puzzleString) {
      return "Required field missing";
    }
    if (val == "RL") {
      return "Expected puzzle to be 81 characters long";
    } else if (val == "NN") {
      return "Invalid characters in puzzle";
    } else if (val == "V") {
    }
  }
}

module.exports = SudokuSolver;
