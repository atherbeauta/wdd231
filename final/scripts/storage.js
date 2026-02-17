export function saveHero(id) {
  localStorage.setItem("selectedHero", id);
}

export function getHero() {
  return localStorage.getItem("selectedHero");
}
