/**
 * Fetches character data from the data folder.
 * Uses the physical file 'data/project.json'.
 */
export async function getCharacters() {
    try {
        // The path points to the data directory as requested
        const response = await fetch('data/project.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // .json() is a JS method to parse the response body, not the filename
        return await response.json();
    } catch (error) {
        console.error("Error loading characters from project.json:", error);
        return [];
    }
}