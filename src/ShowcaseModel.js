import ProductList from "./ProductList.mjs"

export default class ShowcaseModel extends ProductList{
    constructor(apiHandler, eventEmitter, cart) {
        super([])
        this.api = apiHandler
        this.cart = cart
        this.eventEmitter = eventEmitter     
    }

    fetch(onError) {
        this.api.getCatalog(
        (data) => {
            this.list = JSON.parse(data)
            this.eventEmitter.emit(`showcaseFethed`, this.list)
        },
        onError
        )
    }
    
    buy(id, onError) {
        const product = this.find(id)
        if(product) cart.add(product, onError)
    }
}