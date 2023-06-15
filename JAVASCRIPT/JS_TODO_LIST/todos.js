let requestOption = prompt("What would you like to do");
const todoArray = [];
let userInput;

while(requestOption.toLowerCase() !== 'quit' && requestOption.toLowerCase() !== 'q'){
    
if(requestOption.toLowerCase() === 'new'){
    userInput = prompt("Enter new todo");
    todoArray.push(userInput);
    console.log(`${userInput} was added to the list`);

    requestOption = prompt("What would you like to do");
}else if(requestOption.toLowerCase() === 'list'){
    console.log(`**********`);
    for(let i = 0; i < todoArray.length; i++){   
        console.log(`${i}: ${todoArray[i]}`);
    }
    console.log(`**********`);
    requestOption = prompt("What would you like to do");

} else if(requestOption.toLowerCase() === 'delete'){
    let deleteIndex = parseInt(prompt("Enter an index to delete"));
    if(!Number.isNaN(deleteIndex)){
    const deleted = todoArray.splice(deleteIndex,1);  // the splice method helps to delete things from arrays
    console.log(`OK, DELETED ${deleted}`);
    }else{
        console.log("Unknown Index");
    }
    requestOption = prompt("What would you like to do");
}
else{
    console.log("YOU HAVE ENTERED AN INVALID OPTION");
    requestOption = prompt("What would you like to do");
}
}
console.log("OK QUIT THE APP, BYEEE!!");

