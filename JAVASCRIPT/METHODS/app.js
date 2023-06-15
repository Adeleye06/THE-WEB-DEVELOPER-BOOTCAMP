//functions can be passed into objects also.
const myMath = {
    PI: 3.14159,
    square(num){
        return num * num;
    },
    cube(num){
        return num ** 3;
    }
}

// the THIS keyword is used to access things inside an object from a method where normally you wont 
//have access to, you can check out youtube videos by colt steele on the keyword THIS 
const cat = {
    name: 'Blue Steele',
    color:'grey',
    breed: 'scottish fold',
    meow(){
        //console.log(`&{name} says MEOWWW`) , that won't work because of the scope.
        console.log(`${this.name} says MEOWWW`);
    }

    
}