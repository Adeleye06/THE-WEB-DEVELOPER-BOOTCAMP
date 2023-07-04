const p1 = {
    score: 0,
    button: document.querySelector('#player1'),
    display: document.querySelector('#player1Display')
};

const p2 ={
    score: 0,
    button: document.querySelector('#player2'),
    display: document.querySelector('#player2Display')
};

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#selecting');
let winningScore = 6;
let isGameOver = false;

function updateScores(player, opponent){
    if(!isGameOver){
        player.score += 1;
        if(player.score === winningScore){
           isGameOver = true;
           player.display.classList.add('has-text-success');
           opponent.display.classList.add('has-text-danger');
           player.button.disabled = true;
           opponent.button.disabled = true;
        }
        player.display.textContent = player.score + ' ';
    }
}

p1.button.addEventListener('click',function(e){
    updateScores(p1,p2);
})

p2.button.addEventListener('click',function(e){
   updateScores(p2,p1);
})

winningScoreSelect.addEventListener('change', function(e){
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset);

function reset(){

    for(let p of [p1,p2]){
        p.score = 0;
        isGameOver = false;
        p.display.textContent = ' ' + p.score + ' ';
        p.display.classList.remove('has-text-success','has-text-danger');
        p.button.disabled = false;
    }
}





