import ApiHandler from "./ApiHandler";
import CartModel from "./CartModel";
import EventEmitter from "./EventEmitter";
import ShowcaseModel from "./ShowcaseModel";

const API_URL = 'http://localhost:3000/api/v1'

const api = new ApiHandler(API_URL)
const eventEmitter = new EventEmitter()

const cart = new CartModel(api, eventEmitter)
const showcase = new ShowcaseModel(api, eventEmitter, cart)

eventEmitter.subscribe(`showcaseFethed`, (data) => {
    console.log(data)
})

eventEmitter.subscribe(`cartFethed`, (data) => {
    console.log(data)
})

showcase.fetch()
cart.fetch()

