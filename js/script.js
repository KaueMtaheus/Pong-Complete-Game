document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button[data-target]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            })
            document.getElementById(target).classList.add('active');
        })
    })
})