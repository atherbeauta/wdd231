/**
 * Legend of Muamba - Logiciel Principal
 * Synchronisé avec characters.html
 */
import { getCharacters } from './fetch.js';
import { setupModal } from './mondial.js'; 

// --- Sélecteurs ---
const menuBtn = document.getElementById("menu");
const nav = document.querySelector(".navigation");
const container = document.getElementById("characters-container");

// --- Menu Mobile ---
if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}

// --- Initialisation ---
if (container) {
    init();
}

async function init() {
    const characters = await getCharacters();
    const modal = setupModal();
    
    // Affichage du dernier héros sauvegardé
    const lastHero = localStorage.getItem("selectedHero");
    const welcomeDiv = document.getElementById("welcome-message");
    if (lastHero && welcomeDiv) {
        welcomeDiv.innerHTML = `<p style="color:gold; font-weight:bold;">Welcome back! Your favorite: ${lastHero}</p>`;
    }

    if (characters && characters.length > 0) {
        displayCharacters(characters, modal);
    }
}

function displayCharacters(characters, modal) {
    container.innerHTML = "";
    
    characters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="${character.name}" loading="lazy">
            <p><strong>Power:</strong> ${character.power}</p>
            <button class="view-btn">View Details</button>
        `;

        card.querySelector(".view-btn").addEventListener("click", () => {
            const infoBox = document.getElementById("modal-info");
            infoBox.innerHTML = `
                <h2>${character.name}</h2>
                <p><strong>Weapon:</strong> ${character.weapon}</p>
                <p>${character.description}</p>
                <button id="save-hero">Select as Favorite</button>
            `;
            
            modal.classList.remove("hidden");

            document.getElementById("save-hero").addEventListener("click", () => {
                localStorage.setItem("selectedHero", character.name);
                modal.classList.add("hidden");
                location.reload(); // Rafraîchir pour voir le message de bienvenue
            });
        });

        container.appendChild(card);
    });
}

// --- Footer ---
document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
    const lastMod = document.getElementById("lastModified");
    if (lastMod) lastMod.textContent = document.lastModified;
});