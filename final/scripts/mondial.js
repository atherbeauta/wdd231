/**
 * Gère l'affichage de la fenêtre modale (Critère 10)
 */
export function setupModal() {
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("close");

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }

    return modal;
}