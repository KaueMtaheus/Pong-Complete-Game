document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('button');
    const mainContainer = document.getElementById('#main-container');

    function loadSection(sectionId) {
        // Remove o menu e o contêiner principal
        mainContainer.innerHTML = '';

        // cria o novo contêiner para a seção selecionada
        const sectionContainer = document.createElement('div');
        sectionContainer.id = sectionId;
        sectionContainer.classList.add('section');
        
    switch(sectionId) {
        case 'start':
            sectionContainer.innerHTML = `
                <h2>Start Game</h2>
                <!--Conteúdo do jogo aqui-->
            `;
            break;
        case 'multiplayer':
            sectionContainer.innerHTML = `
                <h2>Multiplayer Mode</h2>
                <div id="gameArea">
                    <!-- Área do jogo multiplayer aqui -->
                </div>
            `;
            break;
        case 'settings':
            sectionContainer.innerHTML = `
                <h2>Settings</h2>
                <!-- Conteúdo das configurações aqui -->
            `;
            break;
        case 'credits':
            sectionContainer.innerHTML = `
                <h2>Credits</h2>
                <!--Conteúdo dos creditos aqui---->
            `;
            break;
        }

        mainContainer.appendChild(sectionContainer);
    }

    
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('data-target');
            loadSection(targetId);
        });
    });


    // Exibe a tela inicial por padrão
    loadSection('start');
})