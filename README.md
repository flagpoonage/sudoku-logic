# sudoku-logic
Logical human-like solving system for Sudoku puzzles

# Method

Rather than using the standard brute-force method with backtracing, I thought I'd use a logical approach to solving the board, much like a human does when they attempt these puzzles.

The solver uses a step number from 1 to 9, starting with a 1, and working it's way sequentially to 9.

It first checks the board for any cells that contain the step number. It then uses these to mask the rows, columns, and blocks that contain these cells. Once the masking phase is completed, the solver looks for any blocks which have only one possible cell, and solves that cell with the step number. If any cells are solved during this mask/solve phase, the loop retains the step number and repeats the process. Once a mask/solve phase occurs which contains no cell solutions, the step number is incremented. 

Once the solver completes its mask/solve phase for the step number 9, and no solutions are found, it resets the step number to 1 and starts again. If the solver runs a mask/solve phase for all numbers from 1-9 and returns no solutions for any of them, the solver gives up and stops.

The is the very basic logic required for generally "easy" level Sudoku puzzles. To extends the solver for harder puzzles, changes only really need to be made to the marking phase, the solving phase should always work the same.