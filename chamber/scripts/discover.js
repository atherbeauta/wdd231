import { places } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("discoverGrid");
  const visitMessage = document.getElementById("visitMessage");

  if (!grid) return;

  /* Create Cards */
  places.forEach((place, index) => {

    const card = document.createElement("section");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h3>${place.name}</h3>
      <figure>
        <img 
          src="${place.image}" 
          alt="Image of ${place.name}" 
          loading="lazy"
          width="400"
          height="250"
        >
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn More</button>
    `;

    grid.appendChild(card);
  });

  /* Visit Message */
  if (visitMessage) {

    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {

      visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

    } else {

      const days = Math.floor((now - Number(lastVisit)) / 86400000);

      visitMessage.textContent =
        days < 1
          ? "Back so soon! Awesome!"
          : `You last visited ${days} day${days > 1 ? "s" : ""} ago.`;
    }

    localStorage.setItem("lastVisit", now);
  }

});
