// Add event listeners to all modal triggers
document.querySelectorAll(".modal-trigger-test").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("click-modal");
    const modalId = button.getAttribute("data-modal-target");
    const modal = document.getElementById(modalId);
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  });
});

// Add event listeners to all close buttons
document.querySelectorAll(".close-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".hidden");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("hidden")) {
    event.target.classList.add("hidden");
    event.target.setAttribute("aria-hidden", "true");
  }
});
