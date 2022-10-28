const options = [
  "Choose a Fruit",
  "Apple",
  "Banana",
  "Blueberry",
  "Boysenberry",
  "Cherry",
  "Cranberry",
  "Durian",
  "Eggplant",
  "Fig",
  "Grape",
  "Guava",
  "Huckleberry",
];

export function createOptions(options, defaultSelected) {
  const fragment = document.createDocumentFragment();
  const container = document.createElement("ul");

  options.forEach((option) => {
    const element = document.createElement("li");
    const isSelected = option === defaultSelected;

    element.setAttribute("tabIndex", isSelected ? 0 : -1);
    element.setAttribute("aria-selected", isSelected);
    element.textContent = option;
    element.classList.add("option");

    container.appendChild(element);
  });

  fragment.append(container);

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

function getNextOptionIndexByKeyValue({ evt, selectedIndex, items }) {
  if (evt.key === "ArrowDown" || evt.key === "ArrowRight") {
    return (nextIndex =
      selectedIndex + 1 > items.length - 1 ? 0 : selectedIndex + 1);
  }
  if (evt.key === "ArrowUp" || evt.key === "ArrowLeft") {
    return (nextIndex =
      selectedIndex - 1 < 0 ? items.length - 1 : selectedIndex - 1);
  }
}

function createSelect({ elements, defaultValue, target }) {
  const inputEl = target.querySelector(".combo-input");
  const listEl = target.querySelector(".combo-menu");

  setDefaultValue(elements, defaultValue, inputEl);
  addOptions({ data: elements, defaultValue, target: listEl });

  const items = Array.from(listEl.querySelectorAll(".option"));

  function onInputKeyDown(evt) {
    if (evt.key === "ArrowDown") {
      const selectedIndex = items.findIndex(
        (item) => item.getAttribute("aria-selected") === "true"
      );

      items[selectedIndex].focus();
    }
  }

  function onOptionKeyDown(evt) {
    if (
      evt.key === "ArrowDown" ||
      evt.key === "ArrowRight" ||
      evt.key === "ArrowUp" ||
      evt.key === "ArrowLeft"
    ) {
      const selectedIndex = items.findIndex(
        (item) => item.getAttribute("aria-selected") === "true"
      );
      items[selectedIndex].setAttribute("tabIndex", -1);
      items[selectedIndex].setAttribute("aria-selected", false);

      const nextIndex = getNextOptionIndexByKeyValue({
        evt,
        selectedIndex,
        items,
      });

      if (isFinite(nextIndex)) {
        items[nextIndex].setAttribute("tabIndex", 0);
        items[nextIndex].setAttribute("aria-selected", true);
        items[nextIndex].focus();
      }
    }
  }

  inputEl.addEventListener("keydown", onInputKeyDown);
  listEl.addEventListener("keydown", onOptionKeyDown);
}

const target = document.querySelector(".filter");

createSelect({ elements: options, defaultValue: "Blueberry", target });
