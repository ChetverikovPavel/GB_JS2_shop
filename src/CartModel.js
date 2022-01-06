import { remove } from "lodash"
import ProductList from "./ProductList"

export default class CartModel extends ProductList{
    constructor(apiHandler, eventEmitter, view) {
        super([])
        this.api = apiHandler
        this.eventEmitter = eventEmitter
        this.view = view
    }

    fetch(onError) {
        this.api.getCart(
        (data) => {
            this.list = JSON.parse(data)
            this.eventEmitter.emit(`cartFethed`, this.list)
            this.view.renderModalsList(this.list)
        },
        onError)
    }
    
    add(product) {
        this.api.addToCart(
        () => {
            this.list.push(product)
        },
        () => {
            
        }, 
        product
        )
    }

    remove(id, onError) {
        if(this.find(id)) {
            this.api.removeFromCart(
            () => {
                this.removed(id)
                this.eventEmitter.emit(`removeItem`, id)
            },() => {
            
            }, this.find(id)            
            )
            
        }
    }
}