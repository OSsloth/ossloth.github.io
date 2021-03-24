let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessLeft = document.querySelector('.guessLeft');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;
let guessTries = 10;
function checkGuess() { 
	let userGuess = Number(guessField.value);
	if (guessCount === 1) { 
		guesses.textContent = 'Previous guesses: ';
	}
	guesses.textContent += userGuess + ', ';
	guessLeft.textContent = 'Tries left: ' + (guessTries - guessCount);
	if (userGuess === randomNumber) {
		lastResult.textContent = 'Congratulations! You got it right!';
		lastResult.style.backgroundColor = 'green';
		lowOrHi.textContent = '';
		setGameOver();
	} else if (guessCount === 10) {
		lastResult.textContent = 'GAME OVER';
		setGameOver();
	} else {
		lastResult.textContent = 'Wrong!';
		lastResult.style.backgroundColor = 'red';
		if (userGuess < randomNumber) {
			lowOrHi.textContent = 'Last guess was too low!';
		} else if (userGuess > randomNumber) {
			lowOrHi.textContent = 'Last guess was too high!';
		} 
		if (userGuess > 100) {
			lowOrHi.textContent = 'Number out of boundries!!!';
		}
	}
	guessCount++;
	guessField.value= '';
	guessField.focus();
}
guessSubmit.addEventListener('click',checkGuess);
guessField.addEventListener('keydown', function (event) {
	if (event.keyCode === 13) {
	  checkGuess();
	}
 });
function setGameOver() {
	guessField.disabled = true;
	guessSubmit.disabled = true;
	resetButton = document.createElement('button');
	resetButton.textContent = 'Start new game';
	document.body.append(resetButton);
	resetButton.addEventListener('click', resetGame);
} 
function resetGame() {
	guessCount = 1;
	const resetParas = document.querySelectorAll('.resultParas p');
	for (let i=0; i < resetParas.length ; i++) {
		resetParas[i].textContent ='';
	}
	resetButton.parentNode.removeChild(resetButton);
	guessField.disabled = false;
	guessSubmit.disabled = false;
	guessField.value = '';
	guessField.focus();
	lastResult.style.backgroundColor = 'white';
	randomNumber = Math.floor(Math.random() *100) + 1;
}