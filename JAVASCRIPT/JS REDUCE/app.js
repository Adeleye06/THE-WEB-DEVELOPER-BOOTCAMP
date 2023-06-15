const prices = [9.99,1.50,19.99,49.99,30.50];


/**
 * reduce helps us to reduce the content of an array to just one thing
 * not necessary just to get the total but it could to find a single value in an array etc
 */
/*  const total = prices.reduce((total,price) => {
    return total + price;
 })

 const minPrice = prices.reduce((min,currentNum) => {
    if(currentNum < min){
        return currentNum;
    } 
        return min;
 })

 const movies = [
    {
        title: 'Amadeus',
        score: 99,
        year: 1979
    },
    {
        title: 'Stand By Me',
        score: 85,
        year: 1989
    },
    {
        title: 'Parasite',
        score: 95,
        year: 1999
    },
    {
        title: 'Alien',
        score: 90,
        year: 2000
    }
]

movies.reduce((bestMovie, currMovie) => {
    if(currMovie.score > bestMovie.score){
        return currMovie;
    }
    return bestMovie;
})

const evens = [2,4,6,8]; */

//the second argument that can passed in a reduce function can be regarded as the initial value

/* evens.reduce((sum,num) => sum + num, 100); */