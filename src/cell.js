module.exports = class Cell {
  constructor (x, y, value) {
    this.value = value;
    
    if (value) {
      this.clue = true;
    }
    else {
      this.clue = false;
    }

    this.x = x;
    this.y = y;
    this.masked = false;
  }

  getBoardCoordinates () {
    return {
      x: this.x,
      y: this.y
    }
  }

  getBlockCoordinates () {
    return {
      x: this.x % 3,
      y: Math.floor(this.y / 3)
    };
  }

  setColumn (column) {
    this._column = column;
  }

  setRow (row) {
    this._row = row;
  }

  setBlock (block) {
    this._block = block;
  }

  getBlock () {
    return this._block;
  }

  getRow () {
    return this._row;
  }

  getColumn () {
    return this._column;
  }

  getValue () {
    return this.value;
  }

  setMask () {
    this.masked = true;
  }

  clearMask () {
    this.masked = false;
  }

  isMasked () {
    return this.masked;
  }

  solve (value) {
    this.value = value;
    this.solved = true;
  }

  isClue () {
    return this.clue;
  }

  isSolved () {
    return this.solved;
  }

  hasValue () {
    return !!this.value;
  }
}