import ApiHandler from "./ApiHandler.mjs";
import CartModel from "./CartModel.mjs";
import EventEmitter from "./EventEmitter.mjs";
import ShowcaseModel from "./ShowcaseModel";
import View from "./Views.mjs";
import "./style/style.scss";


function filter(list){
    const searchString = document.querySelector('#search-input').value
    const regExp = new RegExp(searchString, 'i');
    const filtredList = list.filter(({title}) => regExp.test(title))
    eventEmitter.emit(`showcaseFiltred`, list)
    return filtredList;
}

function modalFilter(list){
    const searchString = document.querySelector('#search-modal-input').value
    const regExp = new RegExp(searchString, 'i');
    const filtredList = list.filter(({title}) => regExp.test(title))
    eventEmitter.emit(`cartFiltred`, list)
    
    return filtredList;
}

const API_URL = '/api/v1'

const api = new ApiHandler(API_URL)
const eventEmitter = new EventEmitter()
const view = new View()

const cart = new CartModel(api, eventEmitter, view)
const showcase = new ShowcaseModel(api, eventEmitter, view, cart)


var modal = document.querySelector('.modal-container');

var openModal = function() {
  modal.classList.add('is-open')
 }
 var closeModal = function() {
  modal.classList.remove('is-open')
 }
  

eventEmitter.subscribe(`showcaseFethed`, (data) => {
    view.renderGoodsList(data)

    setTimeout(() => {
        var cartButton = document.querySelector('.cart');
        cartButton.addEventListener('click',  function(event){
          openModal();
          cart.fetch()
        })

        var addButtons = document.querySelectorAll(".InCart");
        addButtons.forEach(function(elem) {
            elem.addEventListener('click', function(event){
                let buyed = {};
                buyed.id = event.currentTarget.parentNode.dataset.id;
                buyed.title = event.currentTarget.parentNode.querySelector('h3').innerText;
                buyed.price = event.currentTarget.parentNode.querySelector('p').innerText;
                cart.add(buyed)
            })
        })

        document.querySelector('#search-btn').addEventListener('click', function(event){view.renderGoodsList(filter(data))})
    }, 1500)
})

eventEmitter.subscribe(`cartFethed`, (data) => {
    view.renderModalsList(data)
    setTimeout(() => {
        var closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', closeModal);
        var delButtons = document.querySelectorAll(".delCart");
        delButtons.forEach(function(elem) {
            elem.addEventListener('click', function(event){
                cart.remove(event.currentTarget.parentNode.dataset.id)
            })
        });
        document.querySelector('#search-modal-btn').addEventListener('click', function(event){view.renderModalsList(modalFilter(data))})
    }, 1500)
})

eventEmitter.subscribe(`removeItem`, () => {
    setTimeout(() => {
        cart.fetch()
    }, 100)
})


eventEmitter.subscribe(`showcaseFiltred`, (data) =>{
    setTimeout(() => {
        var cartButton = document.querySelector('.cart');
        cartButton.addEventListener('click',  function(event){
          openModal();
          cart.fetch()
        })

        var addButtons = document.querySelectorAll(".InCart");
        addButtons.forEach(function(elem) {
            elem.addEventListener('click', function(event){
                let buyed = {};
                buyed.id = event.currentTarget.parentNode.dataset.id;
                buyed.title = event.currentTarget.parentNode.querySelector('h3').innerText;
                buyed.price = event.currentTarget.parentNode.querySelector('p').innerText;
                cart.add(buyed)
            })
        })

        document.querySelector('#search-btn').addEventListener('click', function(event){view.renderGoodsList(filter(data))})
    }, 1000)
})

eventEmitter.subscribe(`cartFiltred`, (data) => {
    view.renderModalsList(data)
    setTimeout(() => {
        var closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', closeModal);
        var delButtons = document.querySelectorAll(".delCart");
        delButtons.forEach(function(elem) {
            elem.addEventListener('click', function(event){
                cart.remove(event.currentTarget.parentNode.dataset.id)
            })
        })
        document.querySelector('#search-modal-btn').addEventListener('click', function(event){view.renderModalsList(modalFilter(data))})
    },1500)
})

showcase.fetch()



