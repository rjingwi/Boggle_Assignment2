const boggle_solver = require('/home/rjingwi/Desktop/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

describe('Boggle Solver tests suite:', () => {
  describe('Normal input', () => {
    test('Normal 3x3 grid', () => {
      let grid = [['P','U','L'],
                  ['M','A','P'],
                  ['R','W','X']];
      let dictionary = ['lamp','car','lal','wax','pulp','ap'];
      let expected = ['lamp','wax','pulp'];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Normal 4x4 grid', () => {
      let grid = [['P','U','L','E'],
                  ['M','A','P','R'],
                  ['R','W','X','W'],
                  ['B','E','O','D']];
      let dictionary = ['brew','dodo','doe','paul','rod'];
      let expected = ['brew','doe','paul'];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Normal 6x6 grid', () => {
      let grid = [['P','U','L','E','X','F'],
                  ['M','A','P','R','T','G'],
                  ['R','W','X','W','I','V'],
                  ['B','E','O','D','C','Y'],
                  ['R','T','M','G','E','P'],
                  ['I','N','Z','W','F','L']];
      let dictionary = ['ox','dice','mode','wing','fire','rite','inch'];
      let expected = ['dice','mode','rite'];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  
  describe('Problem contraints', () => {
    // Cases such as Qu
    test('Grid with Qu', () => {
      let grid = [['Qu','U','L','E'],
                  ['M','A','P','R'],
                  ['R','W','I','L'],
                  ['B','O','Qu','D']];
      let dictionary = ['quail','quo','oil','qu','pore'];
      let expected = ['quail','quo','oil'];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid with St', () => {
      let grid = [['St','U','L','E'],
                  ['M','A','P','R'],
                  ['R','W','I','L'],
                  ['B','O','St','D']];
      let dictionary = ['stir','stair','war','st','mild'];
      let expected = ['stir','stair','war'];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('2 letter words', () => {
      let grid = [['St','U','L','E'],
                  ['M','A','P','R'],
                  ['R','W','I','L'],
                  ['B','O','St','D']];
      let dictionary = ['ma','map','wa','war'];
      let expected = ['map','war'];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  
  describe('Input edge cases', () => {

    // Example Test using Jess
    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid is empty', () => {
      let grid = [[]];
      let dictionary = ['qap','lamp','ax'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid contains non-letters', () => {
      let grid = [['P','!','L'],
                  ['M','A','P'],
                  ['2','W','X']];
      let dictionary = ['map','lamp','ax'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    test('Grid not NxN', () => {
      let grid = [['P','T','L'],
                  ['M','A','P'],
                  ['R','W','X'],
                  ['G','L','O']];
      let dictionary = ['tap','lamp','ax'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid with raw S', () => {
      let grid = [['P','S','L'],
                  ['M','A','P'],
                  ['R','W','X']];
      let dictionary = ['sap','lamp','ax'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid with raw Q', () => {
      let grid = [['P','Q','L'],
                  ['M','A','P'],
                  ['R','W','X']];
      let dictionary = ['qap','lamp','ax'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid,dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});

