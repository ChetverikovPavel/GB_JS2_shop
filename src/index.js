import ApiHandler from "./ApiHandler.mjs";
import CartModel from "./CartModel.mjs";
import EventEmitter from "./EventEmitter.mjs";
import ShowcaseModel from "./ShowcaseModel";
import View from "./Views.mjs";
import "./style/style.scss";

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
    },1500)
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
        },1500)
    })
})

eventEmitter.subscribe(`removeItem`, () => {
    setTimeout(() => {
        cart.fetch()
    }, 100)
})



showcase.fetch()



