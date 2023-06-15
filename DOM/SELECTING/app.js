/**
 * When dealing with the DOM, you have to target the specific features you want to manipulate
 * there are three methods for selecting
 * getElementById (look up the docs)
 * getElementsByTagName (look up the docs)
 * getElementsByClassName (look up the docs)
 */

const banner = document.getElementById('banner');

const allImages = document.getElementsByTagName('img');
for(let img of allImages){
    console.log(img.src);
}

const squareImages = document.getElementsByClassName('square');
for(let img of squareImages){
    console.log(img.src );  
}

//QUERY SELECTOR (look up the docs)
const links = document.querySelectorAll('p a');
for(let link of links){
    console.log(link.href);
}

