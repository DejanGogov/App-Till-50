'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// ADD FUNCTION'S

// Starting Conditions add like function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // class hidden/add
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// ADD FUNCTION'S END

// Rolling dice functinality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Genarating random dice numbe
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true,
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Hold Button
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. ADD current score to active player's score

    scores[activePlayer] += currentScore; // e isto kak i tva  scores[1] = scores[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score >= 50
    if (scores[activePlayer] >= 50) {
      // 3. finish the game
      playing = false;

      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 4. Switch to next player
      switchPlayer();
    }
  }
});
// new game btn
btnNew.addEventListener('click', init);

// Modal window
const modal = document.querySelector('.upatstvo');
const btnCloseModal = document.querySelector('.closeM');
const btnOpenModal = document.querySelector('.show-modal');
const overlay1 = document.querySelector('.overlay1');

const openCloseModal = function () {
  modal.classList.toggle('none');
  overlay1.classList.toggle('none');
};
btnOpenModal.addEventListener('click', openCloseModal);
btnCloseModal.addEventListener('click', openCloseModal);
overlay1.addEventListener('click', openCloseModal);
