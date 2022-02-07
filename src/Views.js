export default class View {
    constructor() {
        this.$showcase = document.querySelector('.showcase');
        this.$modal = document.querySelector('.modal-content');        
    }

    renderGoodsItem = ({ id, title, price }) => {
        return `<div data-id=${id} class="goods-item"><h3 class = ${title.split(" ")[1]}>${title}</h3><p>${price}</p><button class='InCart'>Добавить в корзину</button></div>`;
    };
      
    renderModalsItem = ({ id, title, price }) => {
        return `<div data-id=${id} class="goods-item"><h3 class = ${title.split(" ")[1]}>${title}</h3><p>${price}</p><button class='delCart'>Удалить из корзины</button></div>`;
    };
    
    renderGoodsList = (list) => {
        let goodsList = list.map(
                (item) =>  {
                    return this.renderGoodsItem(item)
                }
            ).join('');
        this.$showcase.insertAdjacentHTML('beforeend', "<button class='cart'>Просмотр корзины</button>");
        this.$showcase.insertAdjacentHTML('beforeend', goodsList);
        }  

    renderModalsList = (list) => {
    this.$modal.innerHTML = '';
        let modalList = list.map(
                (item) =>  {
                    return this.renderModalsItem(item)
                }
            ).join('');
        this.$modal.insertAdjacentHTML('beforeend', '<button class="close">Закрыть</button>')
        this.$modal.insertAdjacentHTML('beforeend', modalList);
    }
}