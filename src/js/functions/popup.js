// Модальное окно
const modals = document.querySelectorAll(".modal-inner");
const modalItem = document.querySelector(".modal__item");
const modalOverlay = document.querySelector(".modal__overlay");
const modalOverlays = document.querySelectorAll(".modal__overlay");

modals.forEach((el) => {
  el.addEventListener("click", () => {
    modalItem.classList.add("modal__item--visible");
    modalOverlay.classList.add("modal__overlay--visible");
    document.getElementById("videoFrame").src =
      "https://www.youtube.com/embed/4XXIQePVeHU?controls=0";
  });
});

modals.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("modal__overlay--visible");
    }
  });
});
