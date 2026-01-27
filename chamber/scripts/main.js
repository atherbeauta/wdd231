// Populate dates in footer
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger Menu Toggle
const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('.navigation');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuBtn.classList.toggle('open');
    });
}