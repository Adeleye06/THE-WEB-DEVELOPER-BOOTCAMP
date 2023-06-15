/* 
let random = Math.random();
if(random < 0.5){
    console.log("Your Number is less than 0.5");
    console.log(random);
} else{
    console.log("Your Number is greater than 0.5");
    console.log(random);
}




const dayOfWeek = prompt('Enter a day').toLowerCase();

if (dayOfWeek ==='monday'){
    console.log("UGHHH I HATE MONDAYS");
} else if (dayOfWeek === 'saturdays'){
    console.log("YAY I LOVE SATURDAYS");
} else if (dayOfWeek === 'friday'){
    console.log("FRIDAYS ARE DECENT, ESPECIALLY AFTER WORK");
} else{
    console.log("MEHHH");
}



const age = 8;
if(age < 5){
    console.log("YOU ARE A BABY. YOU GET IN FOR FREE");
} else if(age < 10){
    console.log("You are a child. You pay 10 dollars");
} else if (age < 65){
    console.log("You are an adult. you pay 20 dollars")
} else{
    console.log("You are a senior. You pay $10");
}
 */

const password = prompt("Please enter a new password");

//password must be 6+ characters
if(password.length >= 6){
   if(password.indexOf(' ') === -1){
    console.log("Valid Password");
   }
} else{
    console.log("PASSWORD TOO SHORT! Must be 6+ characters")
}

//password cannot include space


