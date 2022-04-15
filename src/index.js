import './style.css';
import Score from './score.js';
import Leaderboard from './leaderboard.js';

const form = document.forms[0];
const nameInput = form.querySelector('input[name="name"]');
const scoreInput = form.querySelector('input[name="score"]');
const refreshButton = document.querySelector('.refresh');
const responseMsgSpan = document.querySelector('#save_response');

Leaderboard.initializeGame();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (nameInput.value.length === 0 || scoreInput.value.length === 0) return;

  const score = new Score(nameInput.value, scoreInput.value);

  nameInput.value = '';
  scoreInput.value = '';

  Leaderboard.addScore(score).then((result) => { responseMsgSpan.textContent = result.result; });
});

refreshButton.addEventListener('click', () => {
  Leaderboard.refreshBoard();
});