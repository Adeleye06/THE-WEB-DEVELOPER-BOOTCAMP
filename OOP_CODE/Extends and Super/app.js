class Pet{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    eat(){
        return `${this.name} is eating!!`; 
    }
}

class Cat extends Pet{
    constructor(name, age, livesLeft = 9){
        super(name, age);
        this.livesLeft = livesLeft;
    }
    meow(){
        return `MEOOOWWWW!!!`;
    }
}

class Dog extends Pet{
    bark(){
        return `WOOFFF!!`; 
    }
    eat(){
        return `${this.name} scarfs his food`;
    }
}