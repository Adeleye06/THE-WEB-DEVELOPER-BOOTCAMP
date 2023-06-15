//when iterating through objects, you typically use the FOR IN loop but 
//..when you are iterating through an array, you use the FOR OF loop. 
//Syntax for both is the same except the IN and OF, that's all 
//we also have methods like Object.values, Object.entries, Object.keys || You should check them out



const testScores = {
    keenan: 80,
    damon: 67,
    kim: 89,
    shawn: 91,
    marlon: 72,
    dwayne: 77,
    nadia: 83,
    elvira: 97,
    diedre: 81,
    vonnie: 60
}

/* for(let person in testScores){
    console.log(`${person} scored ${testScores[person]}`);
} */


let total = 0; //total of all values in the object
let scores = Object.values(testScores); // object.values returns an array of the values in the object called testscores
for(let score of scores){
    total += score;
}
console.log(total/scores.length); 
