document.querySelector(".header__btn").onclick = function () {
  document
    .querySelector(".rightside-menu")
    .classList.remove("rightside-menu--close");
};

document.querySelector(".rightside-menu__close").onclick = function () {
  document
    .querySelector(".rightside-menu")
    .classList.add("rightside-menu--close");
};
