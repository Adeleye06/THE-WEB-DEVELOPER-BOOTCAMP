const exams = [80,85,98,92,78,77,90,89,84,81,77];


/**
 * some and every return booleans values
 * either true or false
 * so they just check to see if the values in an array 
 * pass certain conditions
 * look at the code below to understand 
 */
exams.every(score =>  score >= 75);
exams.some(score => score <= 75);