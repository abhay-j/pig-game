'use strict';
//selecting elements
const score_0 = document.getElementById('score--0');
const score_1 = document.getElementById('score--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//setting the initial values

let scores,currentScore,activePlayer,playing;
//making init function

const init = function(){
     scores = [0,0];
    score_0.textContent = 0;
    score_1.textContent = 0;
     currentScore = 0;
     activePlayer = 0;
     playing = true;
//making the dice invisible
    diceEl.classList.add('hidden');
    score_0.textContent = 0;
    score_1.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;
    playerEl0.classList.remove('player--winner'); 
    playerEl1.classList.remove('player--winner');
    playerEl0.classList.add('player--active'); 
    playerEl1.classList.add('player--remove');
}

init();
//making switch function

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerEl0.classList.toggle('player--active');       
    playerEl1.classList.toggle('player--active'); 

}


btnRoll.addEventListener('click',(e)=>{
   //generate a random number
   if(playing){

       let dice = Math.trunc(Math.random() * 6) + 1;
       console.log(dice);
    
       //show the dice corresponding to the random number
        diceEl.classList.remove('hidden');
        diceEl.src=`dice-${dice}.png`;
    
        if(dice !== 1){
            //if its not a 1 add the score to the current score  and display the current score
           currentScore+=dice;
           document.getElementById(`current--${activePlayer}`).textContent = currentScore;
           
    
       }
       else{
           //if its a 1 the switch player
          switchPlayer();
            
       }
   }
});


btnHold.addEventListener('click' ,(e)=>{
    if(playing){

        //add current score to total score
         scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
         //check if the score is >=100 if yes end the game 
         if(scores[activePlayer]>=100){
             document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');     
             document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');     
             playing = false;
             diceEl.classList.add('hidden');
            }
            //switch player
            else{
                
                switchPlayer(); 
            }
        }
    });
    
    btnNew.addEventListener('click',init);