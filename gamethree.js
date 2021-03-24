var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var color = '#0095DD';
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var interval = setInterval(draw, 10);

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
function drawBorder(){
    ctx.beginPath();
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //var colorRandom = '#'+Math.floor(Math.random()*16777215).toString(16);
    drawBall();
    x += dx; 
    y += dy;  
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        //color = colorRandom;
    }    
    if(y + dy < ballRadius) {
        dy = -dy;
        //color = colorRandom;
    } else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
           // dy -= 1; 
        } else {
        alert ('Game Over');
        document.location.reload();
        clearInterval(interval);
    }
    }
    drawBorder();
    drawPaddle();
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    function keyDownHandler(e){
        if(e.key == 'Right' || e.key == 'd' || e.key == 'ArrowRight') {
            rightPressed = true;
        } else if (e.key == 'Left'|| e.key == 'a' || e.key == 'ArrowLeft') {
            leftPressed = true;
        }
    }
    function keyUpHandler(e){
        if(e.key == 'Right' || e.key == 'd' || e.key == 'ArrowRight'){
            rightPressed = false;
        } else if (e.key == 'Left' || e.key == 'a' || e.key == 'ArrowLeft') {
            leftPressed = false;
        }
    }
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
} interval;


