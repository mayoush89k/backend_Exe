// In your own capsules work as a group and do the following:
// What is the difference between import and require?

/*  1- syntax: require("Path/Name") - import Name from Path
    2- require: Part of the CommonJS module system
        import: Part of the ECMAScript module system
    3- require: It's dynamically evaluated. Modules are loaded and executed at runtime.
        import: It's statically evaluated. Imports are resolved and loaded during the module compilation, allowing for more optimizations. 
    4- require: Supported in all versions of Node.js, as it is part of the CommonJS module system.
        import: You might need to use the .mjs extension for files using ECMAScript modules or configure your package.json and Node.js accordingly.*/

// How can you enable using the import syntax using node js
// installing package file by npm init command
// installing node modules and package lock by npm i validator
// importing the validator
const validator = require('validator') 

/* Give 2 node.js environment variables that are not available when using the import syntax. */
// 1.
console.log("email validation ", validator.isEmail('mayoush89k@gamil.com'))
// 2.

// Create 3 functions using the export/import syntax.
// Import the file system module using the import syntax.
// main.js
// main.js
const addNumbers = require('./add.js');
const capitalizeString = require('./capitalize.js');
const isEvenNumber = require('./isEven.js');

// Example usage
const sum = addNumbers(5, 7);
console.log('Sum:', sum);

const capitalized = capitalizeString('hello');
console.log('Capitalized:', capitalized);

const numberToCheck = 10;
console.log(`${numberToCheck} is even: ${isEvenNumber(numberToCheck)}`);

// Using require:
const fs = require('fs');
console.log(fs.readFileSync('example.txt', 'utf8'));

// Using import:
// import fs from 'fs';
console.log(fs.readFileSync('example.txt', 'utf8'));