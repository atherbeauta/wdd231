const url = "data/members.json";
const display = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// 1. ASYNC FETCH FUNCTION (Criteria 8)
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            throw new Error("Could not fetch data");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        display.innerHTML = "<p>Unable to load directory data.</p>";
    }
}

// 2. DISPLAY FUNCTION (Criteria 9)
function displayMembers(members) {
    display.innerHTML = ""; // Clear current content

    members.forEach((member) => {
        const card = document.createElement("section");
        
        card.innerHTML = `
            <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" width="100" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p class="membership-level">Level: ${member.membership}</p>
        `;
        
        display.appendChild(card);
    });
}

// 3. TOGGLE VIEW LOGIC (Criteria 10)
gridBtn.addEventListener("click", () => {
    display.classList.add("grid-view");
    display.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    display.classList.add("list-view");
    display.classList.remove("grid-view");
});

// 4. FOOTER UPDATES
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Initial call
getMembers();