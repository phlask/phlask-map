// Requiring fs module in which
// writeFile function is defined.
const fs = require('fs')

// Establish all of the possible configurable values for a given location here
// Create a location object for each possible permutation

// Data which will write in a file.
// TODO Transition this to generate an equivalent to the content in src/public/testData.js instead of using
//      a static file.
let data = "Learning how to write in a file."

// Write data in 'Output.txt' .
// fs.writeFile('Output.txt', data, (err) => {

//     // In case of a error throw err.
//     if (err) throw err;
// })