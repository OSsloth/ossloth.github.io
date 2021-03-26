//  Credit: https://blog.logrocket.com/build-a-game-with-html-css-javascript/ 
//  Created by Mikołaj Kosiński. 03.2021 
var character = document.getElementById('character');
var block = document.getElementById('block');
var bg = document.getElementById('gamebg')
var counter = 0;
block.style.animation = 'none';
bg.style.animation = 'none';
var gameover = new Audio('sounds/gameover.wav');
var win = new Audio('sounds/win.wav');
var jumpSound = new Audio('sounds/jump.wav');
document.addEventListener('keyup', event => {
    if (event.isComposing || event.code === 'Enter') {
        counter = 0;
        block.style.animation ='block 2s infinite linear';
        bg.style.animation = 'scroll 2s infinite linear';
        character.style.animationPlayState = 'running';
        function jump(){
            if(character.classList == 'animate') {
                return;
            }
            character.classList.add('animate');
            setTimeout(function(){
                character.classList.remove('animate');
            },300);
        }
        var checkDead = setInterval(function(){
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
            let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
            function gameEnd() {
                block.style.animation = 'none';
                bg.style.animation = 'none';
                document.getElementById('scoreSpan').innerHTML = ' ';
                clearInterval(checkDead);
                character.style.animationPlayState = 'paused';
            }
            if(blockLeft < 33 && blockLeft > -33 && characterTop >= 130){
                gameEnd();
                gameover.load();
                gameover.play();
                alert('Game over! Your score: '+Math.floor(counter/110));
                counter = 0;
            }else {
                counter ++;
                document.getElementById('scoreSpan').innerHTML = Math.floor(counter/110);
            }  
            if (Math.floor(counter/110) === 20) {
                gameEnd();
                win.load();
                win.play();
                alert('You win! Your score: '+Math.floor(counter/110));
                counter = 0;
            }
        },10);
        document.addEventListener('keydown', event => {
            if (event.code === 'Space' && character.style.animationPlayState === 'running') {
                jumpSound.load();
                jumpSound.play();
                jump();
            }
        });   
    }
});
