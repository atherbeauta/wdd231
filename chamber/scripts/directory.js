const membersUrl = "data/members.json";
const container = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-view-btn");
const listBtn = document.querySelector("#list-view-btn");
const menuBtn = document.querySelector("#menu-btn");
const navList = document.querySelector("#nav-list");

// 1. Hamburger Menu Logic
menuBtn.addEventListener("click", () => {
    navList.classList.toggle("open");
    menuBtn.classList.toggle("open");
});

// 2. Fetch JSON Data (Async/Await)
async function fetchMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// 3. Display Members
function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
        const section = document.createElement("section");
        section.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p><strong>Membership:</strong> ${member.membership}</p>
        `;
        container.appendChild(section);
    });
}

// 4. View Toggles
gridBtn.addEventListener("click", () => {
    container.className = "grid-layout";
});

listBtn.addEventListener("click", () => {
    container.className = "list-layout";
});

// 5. Footer Info
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modified: ${document.lastModified}`;

fetchMembers();