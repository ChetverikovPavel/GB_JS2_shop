<template>
  <div>
      <header>
        <h2>Vue Shop</h2>
        <input v-model="query">
        <nav>
          <router-link to="/">Каталог</router-link>
          <router-link to="/cart">Корзина</router-link>
        </nav>
      </header>
      <router-view/>
  </div>
</template>

<script>
const API_URL = '/api/v1'

export default {
  computed: {
    query: {
      get() {
        return this.$store.getters.setFilter
      },

      set(value) {
        this.$store.commit('setFilter', value)
      }
    }
  },
  mounted() {
    this.$store.dispatch('loadProducts'),
    this.$store.dispatch('loadCart') 
    }
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

  .card{
    margin: 20px;
    }  
</style>
