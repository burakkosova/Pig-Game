'use strict';

/* const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//dice image
const dice = document.querySelector('.dice');

//current score of player 1 (p element)
let currentScore = document.getElementById('current--0');

const switchPlayer = function () {
  // if the player 2 is active
  if (!player1.classList.contains('player--active')) {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    currentScore = document.getElementById('current--0');
    //if the player 1 is active
  } else {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    currentScore = document.getElementById('current--1');
  }
};

const rollDice = function () {
  const random = Math.trunc(Math.random() * 6) + 1;
  // console.log(random);
  dice.src = `dice-${random}.png`;

  if (random === 1) {
    currentScore.textContent = 0;
    switchPlayer();
  } else {
    let number = Number(currentScore.textContent);
    currentScore.textContent = number += random;
  }
};

btnRollDice.addEventListener('click', rollDice);

const resetGame = function () {
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  if (!player1.classList.contains('player--active')) {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  }
};

btnHold.addEventListener('click', () => {
  let score = Number(
    document.querySelector('.player--active .score').textContent
  );
  let current = Number(currentScore.textContent);
  document.querySelector(
    '.player--active .score'
  ).textContent = score += current;

  if (score >= 100) {
    const winner = document.querySelector('.player--active .name').textContent;
    console.log(`${winner} won!!!`);
    resetGame();
  } else {
    currentScore.textContent = '0';
    switchPlayer();
  }
});

btnNew.addEventListener('click', resetGame); */

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  // Set current players score to 0 before changing to other player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // change active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle method adds the given class if its not present and removes if it is present.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;

    // 2. Display dice
    diceEl.classList.remove('hidden');

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// New game
btnNew.addEventListener('click', init);
