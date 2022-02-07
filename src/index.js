import getProductList from "./mock/data.js";
import renderGoodsList from "./showcase.js";
import renderModalsList from "./modal.js";
import "./style/style.scss";
import { send } from './utils.js'

const API_URL = 'http://localhost:3000/api/v1'

let productList = [];
let cart = [];


var modal = document.querySelector('.modal-container');

var openModal = function() {
  modal.classList.add('is-open')
 }
 var closeModal = function() {
  modal.classList.remove('is-open')
 }


send((error) => { console.log(err) }, (res) => { 
  let list = JSON.parse(res);
  productList = list;
  renderGoodsList(productList);
}, `${API_URL}/catalog`)

setTimeout(() => {
  var addButtons = document.querySelectorAll(".InCart");
  console.log(addButtons)
  addButtons.forEach(function(elem) {
    elem.addEventListener('click', function(event){
      
      let buyed = {};
      buyed.id = event.currentTarget.parentNode.dataset.id;
      buyed.title = event.currentTarget.parentNode.querySelector('h3').innerText;
      buyed.price = event.currentTarget.parentNode.querySelector('p').innerText;      
      console.log(buyed)
      send((error) => { console.log(err) }, (res) => {
        cart.push(buyed)
      }, `${API_URL}/cart`, 'POST', JSON.stringify(buyed), {"Content-Type": "application/json"})
    })
  })
}, 1000)

setTimeout(() => {
  var cartButton = document.querySelector('.cart');
  console.log(cartButton)
  cartButton.addEventListener('click',  function(event){
    openModal();
    
    send((error) => { console.log(err) }, (res) => { 
      let list = JSON.parse(res);
      console.log(list);
      productList = list;
      renderModalsList(productList);
      recurs();
    }, `${API_URL}/cart`)
    function recurs(){
      setTimeout(() => {
        var closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', closeModal);
        var delButtons = document.querySelectorAll(".delCart");
        console.log(delButtons)
        delButtons.forEach(function(elem) {
          elem.addEventListener('click', function(event){
            
            let del = {};
            del.id = event.currentTarget.parentNode.dataset.id;
            del.title = event.currentTarget.parentNode.querySelector('h3').innerText;
            del.price = event.currentTarget.parentNode.querySelector('p').innerText;      
            console.log(del)
            send((error) => { console.log(err) }, (res) => {
              
            }, `${API_URL}/cart`, 'DELETE', JSON.stringify(del), {"Content-Type": "application/json"})
            send((error) => { console.log(err) }, (res) => { 
              let list = JSON.parse(res);
              console.log(list);
              productList = list;
              renderModalsList(productList);
              recurs();
            }, `${API_URL}/cart`)
            
          })
        })
      }, 2000)
    }
  })
}, 1000)


