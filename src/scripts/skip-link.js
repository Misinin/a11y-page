const link = document.querySelector(".header__skip-link");
const skipTarget = document.querySelector("h1");

function show() {
  link.classList.remove("visually-hidden");
}

function hide() {
  link.classList.add("visually-hidden");
}

link.addEventListener("focus", show);
link.addEventListener("blur", hide);
link.addEventListener("click", () => skipTarget.focus());
