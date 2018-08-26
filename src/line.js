module.exports = class Line {

  constructor (index, type) {
    this.line_type = type;
    this.index = index;
    this.cells = [];
  }

  addCell (cell) {
    if (this.line_type === 'row') {
      cell.setRow(this);
    }
    else {
      cell.setColumn(this);
    }
    
    this.cells.push(cell);
  }
  
  setMask () {
    this.cells.forEach(a => a.setMask());
  }

  clearMask () {
    this.cells.forEach(a => a.clearMask());
  }

}