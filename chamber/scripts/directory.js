/**
 * Directory Script - WDD231
 * Handles JSON fetching and Grid/List view switching
 */

const container = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');

// 1. Fetch JSON Data from your members.json file
async function getMembers() {
    try {
        // Path should match your project structure
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching members:", error);
        container.innerHTML = "<p>Failed to load directory data. Please try again later.</p>";
    }
}

// 2. Build the UI cards dynamically
function displayMembers(members) {
    container.innerHTML = ""; // Clear the loading state

    members.forEach(member => {
        const section = document.createElement('section');
        section.className = 'member-card';

        // Format tags as a comma-separated string
        const tagsString = member.tags ? member.tags.join(', ') : '';

        // Generate card content
        section.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="address">${member.address}</p>
                <p class="phone">${member.phone}</p>
                <p class="website"><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p class="membership-level"><strong>${member.membership}</strong></p>
                <p class="tags"><small>${tagsString}</small></p>
            </div>
        `;
        container.appendChild(section);
    });
}

// 3. View Toggle Logic (Grid vs List)
gridBtn.addEventListener('click', () => {
    container.classList.add('grid');
    container.classList.remove('list');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list');
    container.classList.remove('grid');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// 4. Update Footer Information
const yearSpan = document.querySelector('#currentyear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.querySelector('#lastModified');
if (lastModifiedSpan) lastModifiedSpan.textContent = `Last Update: ${document.lastModified}`;

// 5. Responsive Mobile Menu Toggle
const menuBtn = document.querySelector('#menu-btn');
const navList = document.querySelector('#nav-list');

if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('open');
        // Toggle icon between hamburger and X if desired
        menuBtn.innerHTML = navList.classList.contains('open') ? '&#10006;' : '&#9776;';
    });
}

// Initial Load
getMembers();