const $modal = document.querySelector('.modal-content');

const renderModalsItem = ({ id, title, price }) => {
  return `<div data-id=${id} class="goods-item"><h3 class = ${title.split(" ")[1]}>${title}</h3><p>${price}</p><button class='delCart'>Удалить из корзины</button></div>`;
};

const renderModalsList = (list) => {
  $modal.innerHTML = '';
  let modalList = list.map(
          (item) =>  {
              return renderModalsItem(item)
          }
      ).join('');
  $modal.insertAdjacentHTML('beforeend', '<button class="close">Закрыть</button>')
  $modal.insertAdjacentHTML('beforeend', modalList);
}

export default renderModalsList