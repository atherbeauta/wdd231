export async function getCharacters() {
  try {
    const response = await fetch('data/characters.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading characters:", error);
  }
}
