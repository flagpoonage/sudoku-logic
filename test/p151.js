const Board = require('../src/board');
const Solver = require('../src/solver');

const tiles = [
  2,8,6, 0,0,0, 0,0,0,
  0,3,0, 6,0,4, 0,0,0,
  0,0,4, 5,8,0, 0,0,0,

  0,0,7, 2,4,0, 0,0,0,
  6,0,0, 0,0,0, 0,0,1,
  0,0,0, 0,7,8, 9,0,0,

  0,0,0, 0,3,5, 1,0,0,
  0,0,0, 9,0,1, 0,8,0,
  0,0,0, 0,0,0, 4,2,5
];

const board = new Board(tiles);
const solver = new Solver(board);

solver.execute();