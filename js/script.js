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