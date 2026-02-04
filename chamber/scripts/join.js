document.addEventListener("DOMContentLoaded", () => {
  // Timestamp
  document.getElementById("timestamp").value = new Date().toISOString();

  // Modals
  document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.modal).showModal();
    });
  });
});
