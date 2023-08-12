let fruits = [
  {
    id: 1,
    title: "Яблоки",
    price: 20,
    img: "http://5.imimg.com/data5/AK/RA/MY-68428614/apple-500x500.jpg",
  },
  {
    id: 2,
    title: "Апельсины",
    price: 30,
    img: "https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg",
  },
  {
    id: 3,
    title: "Манго",
    price: 40,
    img: "https://img.freepik.com/premium-photo/ripe-mango-with-green-leaf-isolated-white_252965-183.jpg",
  },
];
const options = {
  title: `<span>Цена товара</span>`,
  closable: true,
  width: `500px`,
  footer: [
    {
      text: "Close",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
};

const toHtml = (fruit) =>
  `
<div class="col">
    <div class="card">
      <img class="card-img-top" style = "height:300px;"
      src="${fruit["img"]}" />
      <div class="card-body">
      <h5 class="card-title">${fruit["title"]}</h5>
      <a href="#" class="btn btn-primary"   data-btn="price" data-id="${fruit["id"]}">Посмотреть цену</a>
      <a href="#" class = "btn btn-danger"  data-btn="close" data-id="${fruit["id"]}"> Удалить</a>
      
      </div>
    </div>
  </div>
  `;
function render() {
  const html = fruits.map(toHtml);
  document.getElementById("fruits").innerHTML = html;
}
render();
const priceModal = $.modal(options);
document.addEventListener("click", (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const btnId = +event.target.dataset.id;
  const fruit = fruits.find((value) => value.id === btnId);

  if (btnType === "price") {
    priceModal.setContent(`<p>${fruit.title} - ${fruit.price} RUB  </p>`);
    priceModal.open();
  } else if (btnType === "close") {
    $.confirmModal({
      title: "<p>Вы уверены?</p>",
      content: `<p>Вы удаляете фрукт: ${fruit} </p>`,
    })
      .then(() => {
        fruits = fruits.filter((value) => value.id !== btnId);
        render();
      })
      .catch(() => {});
  }
});
