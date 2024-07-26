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

            if (target === 'multiplayer') {
                mainContainer.classList.add('no-background');
                // Adicione lógica para a tela de multiplayer aqui
            } else {
                mainContainer.classList.remove('no-background');
                // Adicione lógica para pausar o jogo aqui
            }
        });
    });

    document.getElementById('startButton').addEventListener('click', () => {
        window.location.href = 'jogo.html'; // Navega para o jogo
    });
});
