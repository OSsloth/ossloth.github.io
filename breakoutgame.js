/*  Credit: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
    Created by Mikołaj Kosiński. 03.2021  */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var prompt = document.getElementById('prompt');
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var x = canvas.width/2;
var y = canvas.height-30;
var brickSound = new Audio('sounds/bricksound.wav');
var paddleSound = new Audio('sounds/paddlesound.wav');
var win = new Audio('sounds/win.wav');
var loselife = new Audio('sounds/loselife.wav');
var gameover = new Audio('sounds/gameover.wav');
var numbers = [-3,3]
var number = numbers[Math.floor(Math.random()*numbers.length)];
var dx = number;
var dy = -3;
var ballRadius = 10;
var color = '#00c6cf';
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var bricks = [];
for (var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
        }
}
function keyDownHandler(e) {
    if(e.key == 'Right' || e.key == 'd' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left'|| e.key == 'a' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == 'Enter'){
        draw();
        prompt.innerHTML = '';
    }
    if(e.key == 'Right' || e.key == 'd' || e.key == 'ArrowRight'){
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'a' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}
function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Lives: '  + lives,canvas.width-65, 20);
}
function drawBricks() {
    for (var c=0; c<brickColumnCount; c++) {
        for (var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = '#ab2b63';
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-2, paddleWidth, paddleHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawBorder() {
    ctx.beginPath();
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2d2d2d';
    ctx.stroke();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx; 
    y += dy;  
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }    
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX - 10 && x < paddleX + paddleWidth + 10 ){
            dy = -dy;
           if (x > paddleX && x < paddleX + paddleWidth && rightPressed && dx > 0){
                dx = -dx;
           } else if  (x > paddleX && x < paddleX + paddleWidth && rightPressed && dx < 0){
                dx *= 1.6;        
           }
           if (x > paddleX && x < paddleX + paddleWidth && leftPressed && dx < 0){
                dx = -dx;
           } else if (x > paddleX && x < paddleX + paddleWidth && leftPressed && dx > 0) {
                dx *= 1.6;
            }    
           paddleSound.play();
        } else {
            lives--;
            loselife.play();
            if(!lives) {
                gameover.load();
                gameover.play();
                alert('Game over!');
                document.location.reload();  
            } else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = number;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    function collisionDetection() {
        for (var c=0; c<brickColumnCount; c++) {
            for (var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        brickSound.load();
                        brickSound.play();
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            win.load();
                            win.play();
                            alert('You win! Score: '+score);
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
    function drawScore() {
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Score: '+score, 8, 20);
    }
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed && paddleX > 0) {
        paddleX -=  7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    collisionDetection();
    drawScore();
    drawLives();
    drawBorder();
    drawPaddle();
    drawBricks();
    requestAnimationFrame(draw); 
}
