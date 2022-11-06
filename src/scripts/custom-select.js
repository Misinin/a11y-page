const options = [
  "По возрастанию цены",
  "По убыванию цены",
  "По популярности",
  "Нет сотрировки",
];

export function createOptions(options, defaultSelected) {
  const fragment = document.createDocumentFragment();

  options.forEach((option, index) => {
    const element = document.createElement("div");
    const isSelected = option === defaultSelected;

    element.setAttribute("id", `combo-${index}`);
    element.setAttribute("role", "option");
    element.setAttribute("aria-selected", isSelected);
    isSelected && element.classList.add("selected-option");
    isSelected && element.classList.add("current-option");
    element.textContent = option;
    element.classList.add("option");

    fragment.appendChild(element);
  });

  return fragment;
}

function addOptions({ data, defaultValue, target }) {
  const options = createOptions(data, defaultValue);
  if (target) target.appendChild(options);
}

function defaultValueIsValid(options, defaultValue) {
  return options.includes(defaultValue);
}

function setDefaultValue(elements, defaultValue, target) {
  if (defaultValueIsValid(elements, defaultValue)) {
    target.textContent = defaultValue;
  }
}

function createSelect({ elements, defaultValue, target }) {
  const inputEl = target.querySelector(".combo-input");
  const listEl = target.querySelector(".combo-menu");
  const list = document.querySelector(".products__list");

  setDefaultValue(elements, defaultValue, inputEl);
  addOptions({ data: elements, defaultValue, target: listEl });

  const items = Array.from(listEl.querySelectorAll(".option"));

  function onInputKeyDown(evt) {
    const selectedItemIndex = Array.from(
      listEl.querySelectorAll(".option")
    ).findIndex((item) => item.getAttribute("aria-selected") === "true");
    const currentItemIndex = Array.from(
      listEl.querySelectorAll(".option")
    ).findIndex((item) => item.className.includes("current-option"));

    if (
      (evt.key === "ArrowDown" ||
        (evt.key === "ArrowDown" && evt.key === "Alt") ||
        evt.key === "Enter") &&
      inputEl.getAttribute("aria-expanded") === "false"
    ) {
      inputEl.setAttribute(
        "aria-activedescendant",
        items[selectedItemIndex].getAttribute("id")
      );
      inputEl.setAttribute("aria-expanded", "true");
      listEl.classList.add("combo-menu--open");
      return;
    }

    if (
      (evt.key === "ArrowDown" || evt.key === "ArrowRight") &&
      inputEl.getAttribute("aria-expanded") === "true"
    ) {
      const nextIndex =
        currentItemIndex + 1 > items.length - 1
          ? items.length - 1
          : currentItemIndex + 1;

      listEl
        .querySelectorAll(".option")
        [currentItemIndex].classList.remove("current-option");

      listEl
        .querySelectorAll(".option")
        [nextIndex].classList.add("current-option");

      inputEl.setAttribute(
        "aria-activedescendant",
        items[nextIndex].getAttribute("id")
      );
    }

    if (
      (evt.key === "ArrowUp" || evt.key === "ArrowLeft") &&
      inputEl.getAttribute("aria-expanded") === "true"
    ) {
      const nextIndex = currentItemIndex - 1 < 0 ? 0 : currentItemIndex - 1;

      listEl
        .querySelectorAll(".option")
        [currentItemIndex].classList.remove("current-option");

      listEl
        .querySelectorAll(".option")
        [nextIndex].classList.add("current-option");

      inputEl.setAttribute(
        "aria-activedescendant",
        items[nextIndex].getAttribute("id")
      );
    }

    if (
      evt.key === "Enter" &&
      target.querySelector(".combo-input").getAttribute("aria-expanded") ===
        "true"
    ) {
      const targetIndex = Array.from(
        listEl.querySelectorAll(".option")
      ).findIndex((item) => item.className.includes("current-option"));
      listEl.classList.remove("combo-menu--open");
      inputEl.textContent = items[targetIndex].textContent;
      inputEl.setAttribute("aria-expanded", "false");
      list.setAttribute(
        "aria-label",
        `Товары отсортированы ${items[targetIndex].textContent}`
      );
    }

    if (
      evt.key === "Escape" &&
      inputEl.getAttribute("aria-expanded") === "true"
    ) {
      listEl.classList.remove("combo-menu--open");
      inputEl.setAttribute("aria-expanded", "false");
    }
  }

  function onOptionClick(evt) {
    listEl.classList.remove("combo-menu--open");
    inputEl.textContent = evt.target.textContent;
    list.setAttribute(
      "aria-label",
      `Товары отсортированы ${evt.target.textContent}`
    );
    inputEl.setAttribute("aria-expanded", "false");
  }

  function onInputClick() {
    if (inputEl.getAttribute("aria-expanded") === "false") {
      inputEl.setAttribute("aria-expanded", "true");
      listEl.classList.add("combo-menu--open");
      return;
    }
  }

  inputEl.addEventListener("keydown", onInputKeyDown);
  inputEl.addEventListener("click", onInputClick);
  listEl.addEventListener("click", onOptionClick);
}

const target = document.querySelector(".filter");

createSelect({ elements: options, defaultValue: "Нет сотрировки", target });
