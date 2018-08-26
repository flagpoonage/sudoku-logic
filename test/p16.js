const Board = require('../src/board');
const Solver = require('../src/solver');

const tiles = [
  6,0,0, 0,1,3, 0,0,7,
  0,0,8, 0,0,9, 2,0,0,
  3,9,1, 0,0,0, 8,4,6,

  0,0,9, 0,0,5, 0,0,1,
  0,6,0, 4,0,8, 0,3,0,
  7,0,0, 2,0,0, 6,0,0,

  9,4,6, 0,0,0, 3,7,5,
  0,0,5, 7,0,0, 4,0,0,
  8,0,0, 9,5,0, 0,0,2
];

const board = new Board(tiles);
const solver = new Solver(board);

solver.execute();