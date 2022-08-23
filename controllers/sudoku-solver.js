class SudokuSolver {
  validate(puzzleString) {
    if (!/^[0-9\.]*$/.test(puzzleString)) {
      return "NN";
    }
    if (puzzleString.length != 81) {
      return "WL";
    }
  }

  convertCoords(coord) {
    if (coord.length != 2 || typeof coord != "string") {
      return false;
    }
    let letter = coord.slice(0, 1).toUpperCase();
    let number = Number(coord.slice(1));
    let fNumber = letter.charCodeAt(0) - 64;
    if (fNumber < 1 || fNumber > 9 || number == 0) {
      return false;
    }
    return [fNumber, number];
  }
  checkRowPlacement(grid, row, column, value) {
    for (let i = 0; i < 8; i++) {
      if (Number(grid[i][column]) == Number(value)) {
        return true;
      }
    }
    return false;
  }

  checkColPlacement(grid, row, column, value) {
    for (let i = 0; i < 8; i++) {
      if (grid[row][i] == value) {
        return true;
      }
    }
    return false;
  }

  checkRegionPlacement(grid, row, column, value) {
    let sRow = Math.ceil((row + 1) / 3) - 1;
    let sCol = Math.ceil((column + 1) / 3) - 1;
    for (let i = sRow; i < sRow + 3; i++) {
      for (let j = sCol; j < sCol + 3; j++) {
        if (grid[i][j] == value) {
          return true;
        }
      }
    }
    return false;
  }

  check(puzzleString, row, column, value) {
    let grid = this.transform(puzzleString);
    let nRow = row - 1;
    let nCol = column - 1;
    if (grid[nRow][nCol] == value) {
      return { valid: true };
    } else {
      let cRow = this.checkRowPlacement(grid, nRow, nCol, value);
      let cCol = this.checkColPlacement(grid, nRow, nCol, value);
      let cReg = this.checkRegionPlacement(grid, nRow, nCol, value);
      let arr = [];
      if (cRow) {
        arr.push("row");
      }
      if (cCol) {
        arr.push("column");
      }
      if (cReg) {
        arr.push("region");
      }
      if (arr.length < 1) {
        return { valid: true };
      }
      return { valid: false, conflict: arr };
    }
  }
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
    for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

    for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;

    let startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num) return false;

    return true;
  }
  solveSudoku(grid, row, col) {
    if (row == 9 - 1 && col == 9) return grid;

    if (col == 9) {
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) return this.solveSudoku(grid, row, col + 1);

    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solveSudoku(grid, row, col + 1)) return grid;
      }

      grid[row][col] = 0;
    }
    return false;
  }
  solve(puzzleString) {
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
