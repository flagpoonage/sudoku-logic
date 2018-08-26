module.exports = class Block {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.cells = [];
  }

  addCell (cell) {
    cell.setBlock(this);
    this.cells.push(cell);
  }

  setMask () {
    this.cells.forEach(a => a.setMask());
  }

  clearMask () {
    this.cells.forEach(a => a.clearMask());
  }
  
  getCells () {
    return this.cells;
  }
}