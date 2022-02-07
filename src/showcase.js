const $showcase = document.querySelector('.showcase');

const renderGoodsItem = ({ id, title, price }) => {
  return `<div data-id=${id} class="goods-item"><h3 class = ${title.split(" ")[1]}>${title}</h3><p>${price}</p><button class='InCart'>Добавить в корзину</button></div>`;
};

const renderGoodsList = (list) => {
  let goodsList = list.map(
          (item) =>  {
              return renderGoodsItem(item)
          }
      ).join('');
  $showcase.insertAdjacentHTML('beforeend', "<button class='cart'>Просмотр корзины</button>");
  $showcase.insertAdjacentHTML('beforeend', goodsList);
}

export default renderGoodsList