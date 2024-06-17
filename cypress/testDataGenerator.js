// Requiring fs module in which
// writeFile function is defined.
const fs = require('fs')

// Establish all of the possible configurable values for a given location here
// Create a location object for each possible permutation

// Data which will write in a file.
let data = "Learning how to write in a file."

// {
//     "Common Name": "Red mulberry",
//     "Genus": "Morus",
//     "Planting Site Id": 459948,
//     "Point X": -75.1646224595513,
//     "Point Y": 39.95322480084546,
//     "Postal Code": 19144,
//     "Species": "rubra",
//     "Street Address": "1020 Lombard St.",
//     "Tree Id": 100000,
//     "access": "Public",
//     "address": "1020 Lombard St.",
//     "children_only": true,
//     "city": "Philadelphia",
//     "description": "Test, Description Value.",
//     "filtration": "No",
//     "foodnum": 1,
//     "gp_id": "ChIJocPgsybGxokR3QyYHHmQ118",
//     "handicap": "Unsure",
//     "hours": [
//         {
//             "close": {
//                 "day": 0,
//                 "time": "2100"
//             },
//             "open": {
//                 "day": 0,
//                 "time": "0700"
//             }
//         },
//         {
//             "close": {
//                 "day": 1,
//                 "time": "2200"
//             },
//             "open": {
//                 "day": 1,
//                 "time": "0700"
//             }
//         },
//         {
//             "close": {
//                 "day": 2,
//                 "time": "2200"
//             },
//             "open": {
//                 "day": 2,
//                 "time": "0700"
//             }
//         },
//         {
//             "close": {
//                 "day": 3,
//                 "time": "2200"
//             },
//             "open": {
//                 "day": 3,
//                 "time": "0700"
//             }
//         },
//         {
//             "close": {
//                 "day": 4,
//                 "time": "2200"
//             },
//             "open": {
//                 "day": 4,
//                 "time": "0700"
//             }
//         },
//         {
//             "close": {
//                 "day": 5,
//                 "time": "2200"
//             },
//             "open": {
//                 "day": 5,
//                 "time": "0700"
//             }
//         },
//         {
//             "close": {
//                 "day": 6,
//                 "time": "2100"
//             },
//             "open": {
//                 "day": 6,
//                 "time": "0700"
//             }
//         }
//     ],
//     "id_required": "no",
//     "kid_only": "no",
//     "lat": 39.95322480084546,
//     "lon": -75.1646224595513,
//     "norms_rules": "",
//     "organization": "Test Organization",
//     "permanently_closed": false,
//     "phone": "(215) 867-5309",
//     "quality": "1-4 Missing - Good",
//     "service": "Self-serve",
//     "statement": "",
//     "status": "OPERATIONAL",
//     "tap_type": "Drinking Fountain",
//     "tapnum": 1,
//     "vessel": "No",
//     "zip_code": ""
// },

// Write data in 'Output.txt' .
// fs.writeFile('Output.txt', data, (err) => {

//     // In case of a error throw err.
//     if (err) throw err;
// })