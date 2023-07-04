/* const btn = document.querySelector('#v2');
btn.onclick = function(){
    console.log('YOU CLICKED ME!');
    console.log('I hope it works')
}
function scream (){
    console.log("AAAAAHHHHHHH");
    console.log("STOP TOUCHING ME");

}

btn.onmouseenter = scream;

document.querySelector('h1').onclick = function something(){
    alert ('You clicked on me!');
} */


//if you ever need to find more events, refer to the 
//mdn documentation.

const btn3 = document.querySelector('#v3');

//the addEventListener takes two arguments, the type of events you are listening for 
//and the function that should be executed upon that event

btn3.addEventListener('click', function (){
    alert('CLICKED!!');
})

function twist(){
    console.log('TWIST!');
}

function shout(){
    console.log('SHOUT!');
}

const tasButton = document.querySelector('#tas');

/* tasButton.onclick = twist;
tasButton.onclick = shout; */

tasButton.addEventListener