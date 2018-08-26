module.exports = class Solver {

  constructor (board) {
    this.board = board;
    this.step_number = 1;
    this.solve_attempts = 0;
    this.loop = this.loop.bind(this);
  }

  execute () {
    this.board.print();
    global.setTimeout(this.loop, 100);
  }

  loop () {
    let solve_count = 0;
    
    do {
      this.board.print();
      this.board.clearMask();
      this.executeMask();
      solve_count = this.executeSolver();  
    
      if (this.board.isComplete()) {
        this.board.clearMask();
        this.board.print();

        console.log('\n\nYay, the puzzle is complete!');
        return;
      }

      if (solve_count === 0) {
        this.solve_attempts++;
      }
      else {
        this.solve_attempts = 0;
      }

      if (this.solve_attempts === 8) {
        this.board.print();

        console.log('\n\nSorry, I\'m not yet smart enough to solve this one. :(');
        return;
      }
    }
    while(solve_count > 0);

    if (this.step_number === 9) {
      this.step_number = 1;
    }
    else {
      this.step_number++;
    }

    global.setTimeout(this.loop, 100);
  }

  executeMask () {
    let cells = this.board.findCellsByNumber(this.step_number);

    cells.forEach(a => {
      a.getRow().setMask();
      a.getColumn().setMask();
      a.getBlock().setMask();
    });
  }

  executeSolver () {
    let solution_blocks = this.board.blocks.filter(a => 
      a.cells.filter(b => !b.isMasked() && !b.hasValue()).length === 1);

    
    solution_blocks.forEach(block => {
      let solve_cell = block.cells.find(a => !a.isMasked() && !a.hasValue());
      solve_cell.solve(this.step_number);
    });

    return solution_blocks.length;
  }

};