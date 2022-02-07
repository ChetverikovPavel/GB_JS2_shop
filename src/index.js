import ApiHandler from "./ApiHandler.mjs";
// import CartModel from "./CartModel.mjs";
// import EventEmitter from "./EventEmitter.mjs";
// import ShowcaseModel from "./ShowcaseModel";
// import View from "./Views.mjs";
import "./style/style.scss";


// function productfilter(list){
//     const searchString = document.querySelector('#search-input').value
//     const regExp = new RegExp(searchString, 'i');
//     const filtredList = list.filter(({title}) => regExp.test(title))
//     eventEmitter.emit(`showcaseFiltred`, list)
//     return filtredList;
// }

// function cartFilter(list){
//     const searchString = document.querySelector('#search-modal-input').value
//     const regExp = new RegExp(searchString, 'i');
//     const filtredList = list.filter(({title}) => regExp.test(title))
//     eventEmitter.emit(`cartFiltred`, list)
    
//     return filtredList;
// }

const API_URL = '/api/v1'

const api = new ApiHandler(API_URL)
// const eventEmitter = new EventEmitter()
// const view = new View()

// const cart = new CartModel(api, eventEmitter)
// const showcase = new ShowcaseModel(api, eventEmitter, cart)



Vue.component('products-list', {
    props: ['products'],
    template: `
        <div class="productss">
            <product-item v-for="product in products" v-bind:product="product"></product-item>
        </div>

    `
})

Vue.component('product-item', {
    props: ['product'],
    template:
    `<div v-bind:id="product.id" class="goods-item">
        <h3 v-bind:class='product.title.split(" ")[1]'>{{product.title}}</h3>
        <p>{{product.price}}</p>
        <button class='InCart'>Добавить в корзину</button>
    </div>`
})

Vue.component('cart-list', {
    props: ['carts'],
    template: `
        <div class="productss">
            <cart-item v-for="cart in carts" v-bind:cart="cart"></cart-item>
        </div>

    `
})


Vue.component('cart-item',{
    props: ['cart'],
    template:
    `<div v-bind:id="cart.id" class="goods-item">
        <h3 v-bind:class='cart.title.split(" ")[1]'>{{cart.title}}</h3>
        <p>{{cart.price}}</p>
        <button class='delCart'>Удалить из корзины</button>
    </div>`
})



const app = new Vue({
    el: '#app',
    data: {
        productsList: [],
        filteredProducts: [],
        searchLine: '',
        cartList: [],
        filteredCarts: [],
        cartSearchLine: '',
        modalState: '',
    },
    methods: {
        getProductList(onError){
            api.getCatalog(
            (data) => {
                this.productsList = JSON.parse(data)
                this.filteredProducts = JSON.parse(data)
            },
            onError
            )
        },

        getCartList(onError){
            api.getCart(
                (data) => {
                    this.cartList = JSON.parse(data)
                    this.filteredCarts = JSON.parse(data)
                },
                onError)
        },

        productFilter(){
            const regExp = new RegExp(this.searchLine, 'i');
            this.filteredProducts = this.productsList.filter(({title}) => regExp.test(title))
        },

        cartFilter(){
            const regExp = new RegExp(this.cartSearchLine, 'i');
            this.filteredCarts = this.cartList.filter(({title}) => regExp.test(title))
        },

        openModal(){
            this.modalState = 'is-open'
        },

        closeModal(){
            this.modalState = ''
        }
    },
    mounted() {
        this.getProductList()
        this.getCartList()
    }
})


// var modal = document.querySelector('.modal-container');

// var openModal = function() {
//   modal.classList.add('is-open')
//  }
//  var closeModal = function() {
//   modal.classList.remove('is-open')
//  }
  

// eventEmitter.subscribe(`showcaseFethed`, (data) => {
//     view.renderGoodsList(data)

//     setTimeout(() => {
//         var cartButton = document.querySelector('.cart');
//         cartButton.addEventListener('click',  function(event){
//           openModal();
//           cart.fetch()
//         })

//         var addButtons = document.querySelectorAll(".InCart");
//         addButtons.forEach(function(elem) {
//             elem.addEventListener('click', function(event){
//                 let buyed = {};
//                 buyed.id = event.currentTarget.parentNode.dataset.id;
//                 buyed.title = event.currentTarget.parentNode.querySelector('h3').innerText;
//                 buyed.price = event.currentTarget.parentNode.querySelector('p').innerText;
//                 cart.add(buyed)
//             })
//         })

//         document.querySelector('#search-btn').addEventListener('click', function(event){view.renderGoodsList(filter(data))})
//     }, 1500)
// })

// eventEmitter.subscribe(`cartFethed`, (data) => {
//     view.renderModalsList(data)
//     setTimeout(() => {
//         var closeButton = document.querySelector('.close');
//         closeButton.addEventListener('click', closeModal);
//         var delButtons = document.querySelectorAll(".delCart");
//         delButtons.forEach(function(elem) {
//             elem.addEventListener('click', function(event){
//                 cart.remove(event.currentTarget.parentNode.dataset.id)
//             })
//         });
//         document.querySelector('#search-modal-btn').addEventListener('click', function(event){view.renderModalsList(modalFilter(data))})
//     }, 1500)
// })

// eventEmitter.subscribe(`removeItem`, () => {
//     setTimeout(() => {
//         cart.fetch()
//     }, 100)
// })


// eventEmitter.subscribe(`showcaseFiltred`, (data) =>{
//     setTimeout(() => {
//         var cartButton = document.querySelector('.cart');
//         cartButton.addEventListener('click',  function(event){
//           openModal();
//           cart.fetch()
//         })

//         var addButtons = document.querySelectorAll(".InCart");
//         addButtons.forEach(function(elem) {
//             elem.addEventListener('click', function(event){
//                 let buyed = {};
//                 buyed.id = event.currentTarget.parentNode.dataset.id;
//                 buyed.title = event.currentTarget.parentNode.querySelector('h3').innerText;
//                 buyed.price = event.currentTarget.parentNode.querySelector('p').innerText;
//                 cart.add(buyed)
//             })
//         })

//         document.querySelector('#search-btn').addEventListener('click', function(event){view.renderGoodsList(filter(data))})
//     }, 1000)
// })

// eventEmitter.subscribe(`cartFiltred`, (data) => {
//     view.renderModalsList(data)
//     setTimeout(() => {
//         var closeButton = document.querySelector('.close');
//         closeButton.addEventListener('click', closeModal);
//         var delButtons = document.querySelectorAll(".delCart");
//         delButtons.forEach(function(elem) {
//             elem.addEventListener('click', function(event){
//                 cart.remove(event.currentTarget.parentNode.dataset.id)
//             })
//         })
//         document.querySelector('#search-modal-btn').addEventListener('click', function(event){view.renderModalsList(modalFilter(data))})
//     },1500)
// })

// showcase.fetch()



