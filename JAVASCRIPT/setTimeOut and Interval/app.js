/**
 * Set Timeout is basically like a scheduler
 * Run code below to understand
 * it takes two arguments
 */

/* setTimeout(() =>{
    console.log("HELLOOO!!!")
},3000)
 */
/**
 * Set interval will call a callback every x number of seconds
 * Every time we call the set Interval, it has an ID
 * We can stop the setInterval by saving the setInterval to a variable
 * and passing that variable into the clearInterval function
 */

 const id = setInterval(() =>{
    console.log(Math.random())
},2000);

/* clearInterval(id); */

