/**
 * WDD231 Chamber of Commerce - Main JavaScript
 * This file handles Navigation, Footer updates, and Member Directory
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. NAVIGATION & FOOTER MANAGEMENT ---
    const menuButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');
    const yearSpan = document.querySelector('#currentyear');
    const lastModifiedSpan = document.querySelector('#lastModified');

    // Toggle Hamburger Menu
    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            menuButton.classList.toggle('open');
            // Change button text/icon if needed
            menuButton.textContent = menuButton.classList.contains('open') ? '❌' : '≡';
        });
    }

    // Set Current Year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Set Last Modified Date
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // --- 2. DIRECTORY LOGIC (FETCH & DISPLAY) ---
    const directoryContainer = document.querySelector('#members');
    const gridViewBtn = document.querySelector('#grid');
    const listViewBtn = document.querySelector('#list');
    
    // Relative path to JSON data from directory.html
    const memberUrl = "data/members.json"; 

    /**
     * Fetches member data from JSON file
     */
    async function getMembers() {
        try {
            const response = await fetch(memberUrl);
            if (!response.ok) throw new Error("Could not fetch member data.");
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error("Directory Error:", error);
            if (directoryContainer) {
                directoryContainer.innerHTML = `<p class="error">Error loading members data. Please check file paths.</p>`;
            }
        }
    }

    /**
     * Dynamically creates cards for each member
     * @param {Array} members - List of member objects
     */
    function displayMembers(members) {
        if (!directoryContainer) return;
        directoryContainer.innerHTML = ""; // Clear existing content or loaders

        members.forEach(member => {
            const card = document.createElement('section');
            card.className = "member-card";

            // Note: Image paths are relative to directory.html
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="150">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="address">${member.address}</p>
                    <p class="phone">${member.phone}</p>
                    <p class="url"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                    <div class="membership-status">${member.membershipLevel} Member</div>
                </div>
            `;
            directoryContainer.appendChild(card);
        });
    }

    // View Toggling (Grid vs List)
    if (gridViewBtn && listViewBtn && directoryContainer) {
        gridViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('grid');
            directoryContainer.classList.remove('list');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('list');
            directoryContainer.classList.remove('grid');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }

    // Execution: Only run fetch if we are on the directory page (element #members exists)
    if (directoryContainer) {
        getMembers();
    }
});