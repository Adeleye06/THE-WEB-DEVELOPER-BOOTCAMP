//a higher order function is a function that works with other functions 
//functions that accept other functions as arguments or a function that returns a function.

/* function callTwice(func){
    func();
    func();
}

function callTenTimes(f){
    for(let i = 0; i < 10; i++){
        f();
    }
}
function rollDie(){
    const roll = Math.floor(Math.random() * 6) + 1
    console.log(roll);
}

callTwice(rollDie);
callTenTimes(rollDie); */



//FUNCTIONS 
function makeMysteryFunc(){
    const rand = Math.random();
    if(rand > 0.5){
        return function(){
            console.log("CONGRATS, I AM A GOOD FUNCTION");
            console.log("YOU WIN A MILLION DOLLARS!");
        }
    } else{
        return function(){
            alert("YOU HAVE BEEN INFECTED BY A COMPUTER VIRUS!!");
            alert("STOP TRYING TO CLOSE THIS WINDOW");
            alert("STOP TRYING TO CLOSE THIS WINDOW");
            alert("STOP TRYING TO CLOSE THIS WINDOW");
            alert("STOP TRYING TO CLOSE THIS WINDOW");
            alert("STOP TRYING TO CLOSE THIS WINDOW");
        }
    }
}


//returning a function as a value 
function makeBetweenFunc(min,max){
    return function(num){
        return num >= min && num <= max;
    }
}