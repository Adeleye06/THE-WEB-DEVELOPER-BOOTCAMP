//arrow functions, the syntax is pretty simple
//it is just so you can shorten code more
/* const add = (x,y) =>{
    return x + y;
}

const square = (x) =>{
    return x * x;
}

const rollDie = () =>{
    return Math.floor(Math.random() * 6) + 1;
} */

//we have implicit return in arrow functions 
//where you can basically get rid of the return statement 
//but it still works.

//arrow function with implicit return
//implicit return only works when you have just 
// one line of expression in a code 
const rollDie = () =>{
     Math.floor(Math.random() * 6) + 1;
}

//arrow function without the parentheses
const add = (a,b) => {
    return a + b;
}

//arrow function where you get rid of the parentheses
//and write on one straight line but it is only suitable for 
//short lines of code
const add2 = (a,b) => a + b;
