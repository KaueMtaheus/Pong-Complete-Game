document.addEventListener('DOMContentLoaded', () => {
    var vbtIniciar, vbola, vcpu, vjogador, vPaineltxtPontos;
    var posBolaX, posBolaY, posJogadorX, posJogadorY, posCpuX, posCpuY;
    var dirJy, posJogIniY = 180, posCpuIniY = 180, posBolaIniX = 475, posBolaIniY = 240;
    var campoW = 960, campoH = 500, barraW = 20, barraH = 140, bolaW = 20, bolaH = 20;
    var bolaX, bolaY, velBola, velCpu, velJogador, pontos = 0, tecla, jogo = false;

    function controlajog() {
        if (jogo) {
            posJogadorY += velJogador * dirJy;
            if (posJogadorY + barraH >= campoH || posJogadorY <= 0) {
                posJogadorY -= velJogador * dirJy;
            }
            vjogador.style.top = posJogadorY + 'px';
        }
    }

    function controlacpu() {
        if (jogo) {
            if (posBolaX > campoW / 2 && bolaX > 0) {
                if (posBolaY + bolaH / 2 > posCpuY + barraH / 2 + velCpu) {
                    if (posCpuY + barraH <= campoH) posCpuY += velCpu;
                } else if (posBolaY + bolaH / 2 < posCpuY + barraH / 2 - velCpu) {
                    if (posCpuY >= 0) posCpuY -= velCpu;
                }
            } else {
                if (posCpuY + barraH / 2 < campoH / 2) posCpuY += velCpu;
                else if (posCpuY + barraH / 2 > campoH / 2) posCpuY -= velCpu;
            }
            vcpu.style.top = posCpuY + 'px';
        }
    }

    function controlaBola() {
        posBolaX += velBola * bolaX;
        posBolaY += velBola * bolaY;

        if (posBolaX <= posJogadorX + barraW && posBolaY + bolaH >= posJogadorY && posBolaY <= posJogadorY + barraH) {
            bolaY = (posBolaY + bolaH / 2 - posJogadorY - barraH / 2) / 16;
            bolaX *= -1;
        }
        if (posBolaX >= posCpuX - barraW && posBolaY + bolaH >= posCpuY && posBolaY <= posCpuY + barraH) {
            bolaY = (posBolaY + bolaH / 2 - posCpuY - barraH / 2) / 16;
            bolaX *= -1;
        }
        if (posBolaX >= campoW - bolaW) {
            pontos++;
            vPaineltxtPontos.value = pontos;
            posBolaX = posBolaIniX;
            posBolaY = posBolaIniY;
            bolaX *= -1;
            bolaY = Math.random() * 2 - 1;
            bolaY = bolaY > 0 ? 1 : -1;
            posJogadorY = posJogIniY;
            posCpuY = posCpuIniY;
            velCpu = 0;
            velJogador = 0;
        }
        if (posBolaX <= 0) {
            posBolaX = posBolaIniX;
            posBolaY = posBolaIniY;
            bolaX *= -1;
            bolaY = Math.random() * 2 - 1;
            bolaY = bolaY > 0 ? 1 : -1;
            posJogadorY = posJogIniY;
            posCpuY = posCpuIniY;
            velCpu = 0;
            velJogador = 0;
        }
        if (posBolaY <= 0 || posBolaY >= campoH - bolaH) {
            bolaY *= -1;
        }
        vbola.style.top = posBolaY + 'px';
        vbola.style.left = posBolaX + 'px';
    }

    function move() {
        if (jogo) {
            controlajog();
            controlacpu();
            controlaBola();
        }
    }

    document.getElementById('btIniciar').addEventListener('click', () => {
        jogo = !jogo;
        velCpu = jogo ? 4 : 0;
        velJogador = jogo ? 4 : 0;
    });

    document.addEventListener('keydown', (e) => {
        console.log(`Tecla pressionada: ${e.keyCode}`); // Adiciona um log para ver o keyCode
        if (e.keyCode === 38) { // seta para cima
            dirJy = -1;
        } else if (e.keyCode === 40) { // seta para baixo
            dirJy = 1;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        console.log(`Tecla liberada: ${e.keyCode}`); // Adiciona um log para ver o keyCode
        if (e.keyCode === 38 || e.keyCode === 40) { // seta para cima ou para baixo
            dirJy = 0;
        }
    });
    
    function inicializa() {
        vbtIniciar = document.getElementById('btIniciar');
        vbola = document.getElementById('dvBola');
        vcpu = document.getElementById('dvCpu');
        vjogador = document.getElementById('dvJogador');
        vPaineltxtPontos = document.getElementById('txtPontos');
        posBolaX = posBolaIniX;
        posBolaY = posBolaIniY;
        posJogadorX = 20;
        posJogadorY = posJogIniY;
        posCpuX = campoW - barraW;
        posCpuY = posCpuIniY;
        bolaX = 1;
        bolaY = 0;
        velBola = 5;
        setInterval(move, 1000 / 60);
    }

    document.getElementById('backButton').addEventListener('click', () => {
        window.location.href = 'index.html'; // Volta para o menu principal
    });

    inicializa();
});
