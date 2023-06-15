/*
*declare variable for the user to enter the range of their guesses from
while that number is not falsy, you can continue 

declare variable for what user's guess would be from time to time
If user guesses the wrong number, they would be alerted if it is too high or too low.
Record user's attempt of guessing to display result at the end later.

if user inputs q, that means user wants to the end their guessing session.
*/



let maximum = parseInt(prompt("Enter maximum number"));
while(!maximum){
    maximum = parseInt(prompt("Enter a valid number"));
}

const targetNum = Math.floor(Math.random() * maximum) + 1


let guess = prompt("Enter you first guess(Type 'q' to quit the game)");
let attempts = 1;

while(parseInt(guess) !== targetNum){
    if(guess === 'q')break;
    guess = parseInt(guess);
    
    if(guess > targetNum){
        guess = prompt("Too high! Enter a new guess:");
        attempts++;
    }else if(guess < targetNum){
        guess = prompt("Too low! Enter a new guess:");
        attempts++;
    }else{
        guess = prompt("Invalid Input! Please enter a number or 'q' to quit");
    }
}

if(guess === 'q'){
    console.log("ALRIGHT, YOU QUIT!!!");
}else{
console.log(`YOU GOT IT! IT TOOK YOU ${attempts} GUESSES`);
}
