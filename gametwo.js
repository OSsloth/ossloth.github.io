var character = document.getElementById('character');
var block = document.getElementById('block');
var bg = document.getElementById('gamebg')
var counter = 0;
block.style.animation = 'none';
bg.style.animation = 'none';
document.addEventListener('keyup', event => {
    if (event.isComposing || event.code === 'Enter') {
        counter = 0;
        block.style.animation ='block 2s infinite linear';
        bg.style.animation = 'scroll 2s infinite linear';
        character.style.animationPlayState = 'running';
        function jump(){
            if(character.classList == 'animate') {return}
            character.classList.add('animate');
            setTimeout(function(){
            character.classList.remove('animate');
            },300);
        }
    var checkDead = setInterval(function(){
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
        if(blockLeft<15 && blockLeft>-15 && characterTop>=130){
            block.style.animation = 'none';
            bg.style.animation = 'none';
            alert('Game Over. Score: '+Math.floor(counter/110));
            counter = 0;
            document.getElementById('scoreSpan').innerHTML = ' ';
            clearInterval(checkDead);
            character.style.animationPlayState = 'paused';
            
        } else {
            counter ++;
            document.getElementById('scoreSpan').innerHTML = Math.floor(counter/110);
        }  
    },10);
    document.addEventListener('keydown', event => {
        if (event.code === 'Space' && character.style.animationPlayState === 'running') {
        jump();
        }
    })   
}
});
