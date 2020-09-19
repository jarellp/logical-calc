/**
 * Node.js program for a logical calculator.
 *
 * When called with "/", it returns the index.html static page.
 * When called with "/calculate/op/:op/num1/:num1/num2/:num2", it returns
 * the answer of the logical calculation
 */

// Set up some global constants for the program

const express = require('express');
const app = express();


/**
 * The index function redirects the user to request "index.html"
 */
function index(req, res) {
    res.redirect('/index.html');
}

/**
 * Calculate the logical answer and send it back to the user
 */
function calculate(req, res) {
    let answer = 42;
    // We should calculate the answer here
    // let answer = ...

    // Send the answer back to the user
    res.send(answer);
}
/*
function digit(a) {
    while ($("#num1") == 1 || $("#num2") === 0) {
        console.log("Number is valid!");
    }
}*/

// Set up the handlers for Node.js
// -------------------------------

// static files live in "static" folder
app.use(express.static("static"));

// Calling "/" invokes the index function
app.get('/', index);

// Calling "/calculate/..." invokes the calculate function
app.get('/calculate/op/:op/num1/:num1/num2/:num2', calculate);

// Start Express listening at the given port
let port = process.env.PORT;
if (port == null || port =="") {
    port = 8000;
}
app.listen(port);

