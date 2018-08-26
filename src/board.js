const Cell = require('./cell');
const Line = require('./line');
const Block = require('./block');
const chalk = require('chalk');

module.exports = class Board {

  constructor (tiles) {
    this.resetBoard(tiles);

    this.findCells = this.findCells.bind(this);
    this.findCellsByNumber = this.findCellsByNumber.bind(this);
  }

  genBlocks () {
    let blocks = [];
    for(let i = 0; i < 9; i++) {
      let col = i % 3;
      let row = Math.floor(i / 3);

      blocks.push(new Block(col, row));
    }

    return blocks;
  }

  genLines (type) {
    let lines = [];
    for(let i = 0; i < 9; i++) {
      lines.push(new Line(i, type));
    }

    return lines;
  }

  clearMask () {
    this.cells.forEach(a => a.clearMask());
  }

  print () {
    let c = this.cells;
    let pc = this.printCell;

    process.stdout.write('\x1Bc');
    console.log(`
      ${pc(c[0])}${pc(c[1])}${pc(c[2])} ${pc(c[3])}${pc(c[4])}${pc(c[5])} ${pc(c[6])}${pc(c[7])}${pc(c[8])}
      ${pc(c[9])}${pc(c[10])}${pc(c[11])} ${pc(c[12])}${pc(c[13])}${pc(c[14])} ${pc(c[15])}${pc(c[16])}${pc(c[17])}
      ${pc(c[18])}${pc(c[19])}${pc(c[20])} ${pc(c[21])}${pc(c[22])}${pc(c[23])} ${pc(c[24])}${pc(c[25])}${pc(c[26])}

      ${pc(c[27])}${pc(c[28])}${pc(c[29])} ${pc(c[30])}${pc(c[31])}${pc(c[32])} ${pc(c[33])}${pc(c[34])}${pc(c[35])}
      ${pc(c[36])}${pc(c[37])}${pc(c[38])} ${pc(c[39])}${pc(c[40])}${pc(c[41])} ${pc(c[42])}${pc(c[43])}${pc(c[44])}
      ${pc(c[45])}${pc(c[46])}${pc(c[47])} ${pc(c[48])}${pc(c[49])}${pc(c[50])} ${pc(c[51])}${pc(c[52])}${pc(c[53])}

      ${pc(c[54])}${pc(c[55])}${pc(c[56])} ${pc(c[57])}${pc(c[58])}${pc(c[59])} ${pc(c[60])}${pc(c[61])}${pc(c[62])}
      ${pc(c[63])}${pc(c[64])}${pc(c[65])} ${pc(c[66])}${pc(c[67])}${pc(c[68])} ${pc(c[69])}${pc(c[70])}${pc(c[71])}
      ${pc(c[72])}${pc(c[73])}${pc(c[74])} ${pc(c[75])}${pc(c[76])}${pc(c[77])} ${pc(c[78])}${pc(c[79])}${pc(c[80])}
    `);
  }

  findCells (fn) {
    return this.cells.filter(fn);
  }

  findCellsByNumber (value) {
    return this.findCells(a => a.getValue() === value);
  }

  printCell (cell) {
    let value = cell.getValue();
    value = value ? value : '-';

    if (cell.isSolved()) {
      return chalk.green(value);
    }
    else if (cell.isMasked()) {
      return chalk.yellow(value);
    }
    else if (cell.isClue()) {
      return chalk.white(value);
    }
    else {
      return chalk.grey(value);
    }
  }

  resetBoard (tiles) {
    if (tiles.length !== 81) {
      throw 'A valid gameboard must have exactly 81 tiles';
    }

    this.blocks = this.genBlocks();
    this.rows = this.genLines('row');
    this.columns = this.genLines('column');

    this.cells = tiles.map((t, index) => {
      let col = index;
      let row = Math.floor(index / 9);

      return new Cell(col, row, t);
    });
    
    this.cells.forEach((cell, index) => {
      let row_index = Math.floor(index / 9);
      let col_index = index % 9;

      let block_row_index = Math.floor(row_index / 3);
      let block_col_index = Math.floor(col_index / 3);

      let block_index = (block_row_index * 3) + block_col_index;

      this.blocks[block_index].addCell(cell);
      this.columns[col_index].addCell(cell);
      this.rows[row_index].addCell(cell);

      console.log('Cell', block_index, row_index, col_index);
    });
  }

  isComplete () {
    return this.cells.filter(a => !a.hasValue()).length === 0;
  }

}