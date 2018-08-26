const Board = require('../src/board');
const Solver = require('../src/solver');

const tiles = [
  4,0,8, 0,0,7, 3,0,5,
  1,6,0, 5,0,0, 0,8,9,
  3,0,0, 0,1,0, 0,0,6,

  0,3,2, 8,6,0, 0,0,0,
  0,0,4, 0,0,0, 7,0,0,
  0,0,0, 0,9,4, 1,2,0,
  
  6,0,0, 0,5,0, 0,0,2,
  5,4,0, 0,0,2, 0,9,7,
  2,0,9, 3,0,0, 5,0,1
];

const board = new Board(tiles);
const solver = new Solver(board);

solver.execute();