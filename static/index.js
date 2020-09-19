/**
 * Add a hello world right at the top to make sure the Javascript is loaded
 */
console.log("Hello world");

/**
 * Success is called when the answer is returned from the server. This
 * updates the answer text to the answer returned by the server
 */
function success(data) {
    console.log("success=" + data);
    $("#answer").text("Answer=" + data);
    }

/**
 * Given the op and the numbers, send the operands to the server and
 * set up the success function to receive the answer once the server has
 * calculated it.
 */
function send(op, num1, num2=0) {
    let url = "/calculate/op/" + op + "/num1/" + num1 + "/num2/" + num2;
    console.log(url);

    let data;

    if (op == "NOT") {
        bits = num1.split("");
        for (i = 0; i < bits.length; i++) {
            if (bits[i] == '0') {
                bits[i] = '1';
            } 
            else if (bits[i] == '1') {
                bits[i] = '0';
            }
        }
        data = bits.join("");
    }

    else if (op == "OR") {
        
        let bits1 = num1.split("");
        let bits2 = num2.split("");
        // let res = "";
        data = "";
        for (i = 0; i < bits1.length; i++) {
            if (bits1[i] == "1" || bits2[i] == "1") {
                data = data.concat("1");
            }
            else {
                data = data.concat("0");
            }
        }
    }

    else if (op == "AND") {
        
        let bits1 = num1.split("");
        let bits2 = num2.split("");
        // let res = "";
        data = "";
        for (i = 0; i < bits1.length; i++) {
            if (bits1[i] == "1" && bits2[i] == "1") {
                data = data.concat("1");
            }
            else {
                data = data.concat("0");
            }
        }
    }
    
    $.get(url, success(data));
}

function checkInput(op, num1, num2) {
    

    if (num1.length == 0 && num2.length == 0) {
        return false;
    }

    if (num1.length == 0) {
        alert("Please enter value in the first input field!");
        return false;
    }

    let res1 = num1.split("");
    for (i = 0; i < res1.length; i++)
  	    if (res1[i] != 1 && res1[i] != 0) {
            alert("Please enter only 1s and 0s in Numbers!");
            return false;
          }

    let res2 = num2.split("");
    for (i = 0; i < res2.length; i++)
  	    if (res2[i] != 1 && res2[i] != 0) {
            alert("Please enter only 1s and 0s in Numbers!");
            return false;
          }

    if (op == "NOT"){
        if (num2.length != 0) {
            alert("Please enter value in the first input field only for NOT operation!");
            return false;
        }
    }
    else {
        if (num2.length == 0) {
            alert("Please enter value in the second input field!");
            return false;
        }

        if (num1.length != num2.length) {
            alert("The lengths of the inputs must be same!");
            return false;
        }
    }

    return true;
}

/**
 * Handle the user clicking on the Not button
 */
function doNot() {
    // send a NOT command to the server with the first number
    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
    if (checkInput("NOT", num1, num2))
        send("NOT", num1);
}


/**
 * Handle the user clicking the OR button
 */
function doOr() {
    // probably should get two numbers and do Or
    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
    if (checkInput("OR", num1, num2))
        send("OR", num1, num2);
}

/**
 * Handle the user clicking the AND button
 */
function doAnd() {
    // probably should get two numbers and do And
    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
    if (checkInput("AND", num1, num2))
        send("AND", num1, num2);
}

/**
 * This function is called on document ready to set up the handlers
 * that are called when each button is clicked
 */
function setup() {
    $("#not").click(doNot);
    $("#or").click(doOr);
    $("#and").click(doAnd);
}

/**
 * When the document has fully loaded and is ready, call the setup function
 */
$(document).ready(setup);