document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button[data-target]');
    const mainContainer = document.getElementById('main-container');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            })
            document.getElementById(target).classList.add('active');

            //Remove background da tela do jogo 
            if (target === 'start') {
                mainContainer.classList.add('no-background');
            } else {
                mainContainer.classList.remove('no-background')
            }
        })
    })
})


const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('left-paddle');
const rightPaddle = document.getElementById('right-paddle');
const leftScoreElement = document.getElementById('left-score');
const rightScoreElement = document.getElementById('right-score');
let leftScore = 0;
let rightScore = 0;

const gameBoard = document.getElementById('game-board');
const boardReact = gameBoard.getBoundingClientRect();


let ballX = 0;
let ballY = 0;
let ballDX = 2; // Velocidade da bola no eixo X
let ballDY = 2; // Velocidade da bola no eixo Y
let paddleSpeed = 10; // Velocidade das raquetes


function moveBall() {
    ballX += ballDX
    ballY += ballY;


    // Colisão com as paredes superior e inferior
    if (ballY <= 0 || ballY + ball.clientHeight >= boardReact.height) {
        ballDY = -ballDY;
    }

    // Colisão com as raquetes
    if (ballX <= leftPaddle.offsetLeft + leftPaddle.clientWidth && 
        ballY + ball.clientHeight >= leftPaddle.offsetTop &&
        ballY <= leftPaddle.offsetTop + leftPaddle.clientHeight) {
        ballDX = -ballDX;

    }

    if (ballX + ballX.clientWidth >= rightPaddle.offsetLeft &&
        ballY + ball.clientHeight >= rightPaddle.offsetTop &&
        ballY <= rightPaddle.offsetTop + rightPaddle.clientHeight) {
        ballDX = -ballDX
    }

    // Marcar ponto e resetar bola
    if (ballDX <= 0) {
        rightScore++;
        updateScore();
        resetBall();
    }

    if (ballX + ball.clientWidth >= boardReact.width) {
        leftScore++;
        updateScore();
        resetBall();

    }
    
}