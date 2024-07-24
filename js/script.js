document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button[data-target]');
    const mainContainer = document.getElementById('main-container');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');

            if (target === 'start' || target === 'multiplayer') {
                mainContainer.classList.add('no-background');
            } else {
                mainContainer.classList.remove('no-background');
            }
        });
    });

    // Inicialização do jogo Pong
    const ball = document.getElementById('ball');
    const leftPaddle = document.getElementById('left-paddle');
    const rightPaddle = document.getElementById('right-paddle');
    const leftScoreElement = document.getElementById('left-score');
    const rightScoreElement = document.getElementById('right-score');
    let leftScore = 0;
    let rightScore = 0;

    const gameBoard = document.getElementById('game-board');
    const boardRect = gameBoard.getBoundingClientRect();

    let ballX = boardRect.width / 2;
    let ballY = boardRect.height / 2;
    let ballDX = 2; // Velocidade da bola no eixo X
    let ballDY = 2; // Velocidade da bola no eixo Y
    const paddleSpeed = 10; // Velocidade das raquetes

    function moveBall() {
        ballX += ballDX;
        ballY += ballDY;

        // Colisão com as paredes superior e inferior
        if (ballY <= 0 || ballY + ball.clientHeight >= boardRect.height) {
            ballDY = -ballDY;
        }

        // Colisão com as raquetes
        if (
            ballX <= leftPaddle.offsetLeft + leftPaddle.clientWidth &&
            ballY + ball.clientHeight >= leftPaddle.offsetTop &&
            ballY <= leftPaddle.offsetTop + leftPaddle.clientHeight
        ) {
            ballDX = -ballDX;
        }

        if (
            ballX + ball.clientWidth >= rightPaddle.offsetLeft &&
            ballY + ball.clientHeight >= rightPaddle.offsetTop &&
            ballY <= rightPaddle.offsetTop + rightPaddle.clientHeight
        ) {
            ballDX = -ballDX;
        }

        // Marcar ponto e resetar bola
        if (ballX <= 0) {
            rightScore++;
            updateScore();
            resetBall();
        }

        if (ballX + ball.clientWidth >= boardRect.width) {
            leftScore++;
            updateScore();
            resetBall();
        }

        // Atualizar posição da bola
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        requestAnimationFrame(moveBall);
    }

    function updateScore() {
        leftScoreElement.textContent = leftScore;
        rightScoreElement.textContent = rightScore;
    }

    function resetBall() {
        ballX = boardRect.width / 2 - ball.clientWidth / 2;
        ballY = boardRect.height / 2 - ball.clientHeight / 2;
        ballDX = -ballDX; // Muda a direção da bola
    }

    resetBall();
    moveBall();

    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowUp':
                movePaddle(rightPaddle, -paddleSpeed);
                break;
            case 'ArrowDown':
                movePaddle(rightPaddle, paddleSpeed);
                break;
            case 'w':
                movePaddle(leftPaddle, -paddleSpeed);
                break;
            case 's':
                movePaddle(leftPaddle, paddleSpeed);
                break;
        }
    });

    function movePaddle(paddle, amount) {
        const currentTop = paddle.offsetTop;
        let newTop = currentTop + amount;

        if (newTop < 0) {
            newTop = 0;
        } else if (newTop + paddle.clientHeight > boardRect.height) {
            newTop = boardRect.height - paddle.clientHeight;
        }

        paddle.style.top = newTop + 'px';
    }
});
