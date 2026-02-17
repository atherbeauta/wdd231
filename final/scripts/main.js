import { getCharacters } from './fetch.js';
import { setupModal } from './modal.js';
import { saveHero } from './storage.js';

const menuBtn = document.getElementById("menu");
const nav = document.querySelector(".navigation");

if (menuBtn) {
menuBtn.addEventListener("click", () => {
nav.classList.toggle("show");
});
}

const container = document.getElementById("characters-container");

if (container) init();

async function init() {
const characters = await getCharacters();
const modal = setupModal();

characters.forEach(character => {

const card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
<h3>${character.name}</h3>
<img src="${character.image}" alt="${character.name}" loading="lazy">
<p><strong>Power:</strong> ${character.power}</p>
<p><strong>Weapon:</strong> ${character.weapon}</p>
<p><strong>Level:</strong> ${character.level}</p>
<button>Select Hero</button>
`;

card.querySelector("button").addEventListener("click", () => {

document.getElementById("modal-info").innerHTML = `
<h2>${character.name}</h2>
<p>${character.description}</p>
<button id="confirm">Confirm Selection</button>
`;

modal.classList.remove("hidden");

document.getElementById("confirm").addEventListener("click", () => {
saveHero(character.id);
modal.classList.add("hidden");
});

});

container.appendChild(card);
});
}
