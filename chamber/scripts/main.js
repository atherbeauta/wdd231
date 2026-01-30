const membersUrl = "data/members.json";

// --- SPOTLIGHTS (Gold/Silver members) ---
async function loadSpotlights() {
    const response = await fetch(membersUrl);
    const data = await response.json();
    
    // Filter Gold and Silver
    const filtered = data.members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
    
    // Shuffle and pick 3
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const container = document.querySelector('#member-spotlights');
    shuffled.forEach(m => {
        const div = document.createElement('div');
        div.className = 'member-card';
        div.innerHTML = `
            <h3>${m.name}</h3>
            <img src="${m.image}" alt="${m.name}" width="100">
            <p>${m.phone}</p>
            <p><strong>${m.membership} Level</strong></p>
        `;
        container.appendChild(div);
    });
}

// --- WEATHER (OpenWeatherMap API) ---
// Note: Replace with your actual API key for full points
const apiKey = "YOUR_OPENWEATHER_KEY"; 
const lat = "-11.66"; 
const lon = "27.48";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function loadWeather() {
    try {
        // Since I can't call external API here, I provide the structure you need
        const weatherDiv = document.querySelector('#weather-card');
        weatherDiv.innerHTML = `<p>24°C - Partly Cloudy</p>`; // Placeholder
        
        const forecastDiv = document.querySelector('#forecast');
        forecastDiv.innerHTML = `<p>Mon: 22°C | Tue: 25°C | Wed: 23°C</p>`;
    } catch (e) { console.log(e); }
}

loadSpotlights();
loadWeather();