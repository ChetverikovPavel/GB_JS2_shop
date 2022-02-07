import { createStore } from 'vuex'

const API_URL = '/api/v1/';


export default createStore({
  state: {
    showcase: [],
    cart: [],
    filterString: ''
  },
  getters: {
    getProducts: (state) => [...state.showcase.filter((item) => new RegExp(state.filterString, 'i').test(item.title))],
    getCart: (state) => [...state.cart.filter((item) => new RegExp(state.filterString, 'i').test(item.title))],
    getFilter: (state) => state.filterString
  },
  mutations: {
    setProducts: (state, products) => state.showcase = products,
    setCart: (state, products) => state.cart = products,
    addToCart: (state, product) => state.cart.push(product),
    setFilter: (state, filter) => state.filterString = filter,
    removeFromCart: (state, product) => {
      const index = state.cart.findIndex((item) => item.id == product.id)
      state.cart.splice(index, 1)
    }
  },
  actions: {
    loadProducts({commit}) {
      return fetch(`${API_URL}/catalog`)
        .then((req) => req.json())
        .then((data) => {
          commit('setProducts', data)
      })
    },

    loadCart({commit}) {
      return fetch(`${API_URL}/cart`)
        .then((req) => req.json())
        .then((data) => {
          commit('setCart', data)
      })
    },

    addToCart({commit}, product) {
      return fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then(() => {
        commit('addToCart', product)
      })
    },

    removeFromCart({commit}, product) {
      return fetch(`${API_URL}/cart`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then(() => {
        commit('removeFromCart', product)
      })
    }
  }
})
