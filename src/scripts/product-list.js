const list = [
  {
    name: "Коврик для кота",
    price: 100,
    oldPrice: 200,
    img: "src/images/cat.jpg",
    alt: "Маленький, пушистый серый котенок, возрастом приблизительно один месяц.",
  },
  {
    name: "Коврик для кота",
    price: 100,
    oldPrice: 200,
    img: "",
    alt: "Маленький, пушистый серый котенок, возрастом приблизительно один месяц.",
  },
  {
    name: "Коврик для кота",
    price: 100,
    oldPrice: null,
    img: "",
    alt: "Маленький, пушистый серый котенок, возрастом приблизительно один месяц.",
  },
  {
    name: "Коврик для кота",
    price: 100,
    oldPrice: null,
    img: "",
    alt: "Маленький, пушистый серый котенок, возрастом приблизительно один месяц.",
  },
];

const listContainer = document.querySelector(".products__list");

function createProductsList() {
  const fragment = document.createDocumentFragment();

  list.forEach((item) => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.classList.add("product__img");
    img.setAttribute("src", item.img);
    img.setAttribute("alt", item.alt);

    const title = document.createElement("span");
    title.textContent = item.name;
    title.classList.add("product__title");

    const priceContainer = document.createElement("div");
    const price = document.createElement("span");
    const oldPrice = document.createElement("span");
    const button = document.createElement("button");
    price.textContent = `${item.price}$`;
    oldPrice.textContent = `${item.oldPrice}$`;
    price.classList.add("product__price");
    item.oldPrice && price.classList.add("product__price--sale");
    oldPrice.classList.add("product__price--old");
    priceContainer.classList.add("product__price-container");
    priceContainer.appendChild(price);
    item.oldPrice && priceContainer.appendChild(oldPrice);

    button.textContent = "Купить";
    button.setAttribute(
      "aria-label",
      `Купить ${item.name} по цене ${item.price} долларов. ${
        item.oldPrice ? `Старая цена ${item.oldPrice}` : ""
      }`
    );
    button.setAttribute("type", "button");
    button.classList.add("product__buy-btn");

    li.classList.add("product");
    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(priceContainer);
    li.appendChild(button);

    fragment.appendChild(li);
  });

  listContainer.appendChild(fragment);
}

createProductsList();
