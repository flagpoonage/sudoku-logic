module.exports = class Solver {

  constructor (board) {
    this.board = board;
    this.step_number = 1;
    this.solve_attempts = 0;
    this.loop = this.loop.bind(this);
  }

  execute () {
    this.board.print();

    let blocks = this.board.blocks;

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
      // a.setMask();
      a.getRow().setMask();
      a.getColumn().setMask();
      a.getBlock().setMask();
    });
  }

  executeSolver () {
    let blocks = this.board.blocks;

    // console.log('Total blocks', blocks.length);

    let cell_lists = blocks.map(a => a.cells);

    // console.log('Cell Lists', cell_lists.map(a => `[${a.map(b => b.getValue()).join(',')}]`));

    let solution_blocks = this.board.blocks.filter(a => 
      a.cells.filter(b => !b.isMasked() && !b.hasValue()).length === 1);

    
    solution_blocks.forEach(block => {
      // console.log('Solution block: ', block);
      let solve_cell = block.cells.find(a => !a.isMasked() && !a.hasValue());

      // console.log('Solve cell', solve_cell.x, solve_cell.y);
      solve_cell.solve(this.step_number);
    });

    return solution_blocks.length;
  }

};