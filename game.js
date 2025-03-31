const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// 游戏对象
let ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    dx: 5,
    dy: -5
};

let paddle = {
    height: 10,
    width: 75,
    x: canvas.width/2 - 37.5
};

let score = 0;
let rightPressed = false;
let leftPressed = false;

// 事件监听
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if(e.key == "ArrowRight") rightPressed = true;
    if(e.key == "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if(e.key == "ArrowRight") rightPressed = false;
    if(e.key == "ArrowLeft") leftPressed = false;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#e74c3c";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#3498db";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    // 挡板碰撞
    if(ball.y + ball.dy > canvas.height - ball.radius - paddle.height) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
            score += 10;
            scoreElement.innerHTML = score;
        }
        else {
            // 游戏结束
            document.location.reload();
            alert('游戏结束！得分: ' + score);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    collisionDetection();
    
    // 边界碰撞
    if(ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    // 挡板移动
    if(rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    }
    if(leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    
    requestAnimationFrame(draw);
}

draw();