export function setupModal() {
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  return modal;
}
