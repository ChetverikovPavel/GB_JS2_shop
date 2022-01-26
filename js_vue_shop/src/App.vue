<template>
  <div>
      <header>
        <h2>Vue Shop</h2>
        <nav>
          <router-link to="/">Каталог</router-link>
          <router-link to="/cart">Корзина</router-link>
        </nav>
      </header>
      <router-view :showcase="showcase" :cart="cart" v-on:productAdd="addToCart" v-on:productDelete="removeFromCart"></router-view>
  </div>
</template>

<script>
const API_URL = '/api/v1'

export default {
  data() {
    return {
      showcase: [],
      cart: []
    }
  },
  methods: {
    addToCart(product) {
      fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
        .then(() => {
          this.cart.push(product)
        })
    },

    removeFromCart(product) {
      fetch(`${API_URL}/cart`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
        .then(() => {
          const index = this.cart.findIndex((item) => item.id == product.id)
          this.cart.splice(index, 1)
        })
    }
  },
  mounted() {
    fetch(`${API_URL}/catalog`)
      .then((req) => req.json())
      .then((data) => {
        this.showcase = data
      }),
    
    fetch(`${API_URL}/cart`)
      .then((req) => req.json())
      .then((data) => {
        this.cart = data
      })
  },
}
</script>

<style lang="scss">
  *{
    padding: 0;
    margin: 0;
  }
  header {
    height: 80px;
    padding: 10px 20px;
    background: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    nav {
      display: flex;
      justify-content: space-between;
      width: 50%;
      align-items: center;
      

    }
  }
</style>
