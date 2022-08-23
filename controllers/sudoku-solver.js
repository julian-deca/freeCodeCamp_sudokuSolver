class SudokuSolver {
  constructor() {
    this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  }
  validate(puzzleString) {
    if (!/^[0-9\.]*$/.test(puzzleString)) {
      return "NN";
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

  convertCoords(coord) {
    if (coord.length != 2 || typeof coord != "string") {
      return false;
    }
    let letter = coord.slice(0, 1).toUpperCase();
    let number = Number(coord.slice(1));
    let fNumber = letter.charCodeAt(0) - 64;
    if (fNumber < 1 || fNumber > 9) {
      return false;
    }
    return [fNumber, number];
  }
  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}
  check(puzzleString, row, column, value) {}
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
    for (let i = 0; i < puzzleString.length; i++) {
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
  transformBack(grid) {
    return grid.flat().join("");
  }
  isSafe(grid, row, col, num) {
    // Check if we find the same num
    // in the similar row , we
    // return false
    for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

    // Check if we find the same num
    // in the similar column ,
    // we return false
    for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;

    // Check if we find the same num
    // in the particular 3*3
    // matrix, we return false
    let startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num) return false;

    return true;
  }
  solveSudoku(grid, row, col) {
    /* If we have reached the 8th
       row and 9th column (0
       indexed matrix) ,
       we are returning true to avoid further
       backtracking       */
    if (row == 9 - 1 && col == 9) return grid;

    // Check if column value  becomes 9 ,
    // we move to next row
    // and column start from 0
    if (col == 9) {
      row++;
      col = 0;
    }

    // Check if the current position
    // of the grid already
    // contains value >0, we iterate
    // for next column
    if (grid[row][col] != 0) return this.solveSudoku(grid, row, col + 1);

    for (let num = 1; num < 10; num++) {
      // Check if it is safe to place
      // the num (1-9)  in the given
      // row ,col ->we move to next column
      if (this.isSafe(grid, row, col, num)) {
        /*  assigning the num in the current
            (row,col)  position of the grid and
            assuming our assigned num in the position
            is correct */
        grid[row][col] = num;

        // Checking for next
        // possibility with next column
        if (this.solveSudoku(grid, row, col + 1)) return grid;
      }

      /* removing the assigned num , since our
           assumption was wrong , and we go for next
           assumption with diff num value   */
      grid[row][col] = 0;
    }
    return false;
  }
  solve(puzzleString) {
    const val = this.validate(puzzleString);

    let grid = this.transform(puzzleString);
    let solved = this.solveSudoku(grid, 0, 0);
    if (!solved) {
      return false;
    }
    const solvedString = this.transformBack(solved);
    return solvedString;
  }
}

module.exports = SudokuSolver;
