class SudokuSolver {
  constructor() {
    this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  }
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

  addCoords(puzzleString) {
    let coords = {};
    let count = 0;
    let puzzleArr = puzzleString.split("");
    for (const letter of this.letters) {
      for (let i = 1; i <= 9; i++) {
        coords[letter + i] = puzzleArr[count];
        count++;
      }
    }
    return coords;
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  transform(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let row = -1;
    let col = 0;
    for (let i = 0; 1 < puzzleString.length; i++) {
      if (i % 9 == 0) {
        row++;
      }
      if (col % 9 == 0) {
        col = 0;
      }
      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }

  isSafe(board, row, col, num) {
    // Row has the unique (row-clash)
    for (let d = 0; d < board.length; d++) {
      // Check if the number we are trying to
      // place is already present in
      // that row, return false;
      if (board[row][d] == num) {
        return false;
      }
    }

    // Column has the unique numbers (column-clash)
    for (let r = 0; r < board.length; r++) {
      // Check if the number
      // we are trying to
      // place is already present in
      // that column, return false;
      if (board[r][col] == num) {
        return false;
      }
    }
    // Corresponding square has
    // unique number (box-clash)
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - (row % sqrt);
    let boxColStart = col - (col % sqrt);

    for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
      for (let d = boxColStart; d < boxColStart + sqrt; d++) {
        if (board[r][d] == num) {
          return false;
        }
      }
    }

    // If there is no clash, it's safe
    return true;
  }
  solveSudoku(board, n) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == 0) {
          row = i;
          col = j;

          // We still have some remaining
          // missing values in Sudoku
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) {
        break;
      }
    }

    // No empty space left
    if (isEmpty) {
      return true;
    }

    // Else for each-row backtrack
    for (let num = 1; num <= n; num++) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (solveSudoku(board, n)) {
          // print(board, n);
          return true;
        } else {
          // Replace it
          board[row][col] = 0;
        }
      }
    }
    return false;
  }
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
    return coords;
  }
}

module.exports = SudokuSolver;
