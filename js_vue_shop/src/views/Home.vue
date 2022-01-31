<template>
  <div class="home">
    <product-card v-for="product of showcase" :key="product.id" :data="product" :target="'showcase'" v-on:productAction="onBuy"></product-card>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  components: { ProductCard },
  name: 'Home',
  computed: {
    showcase() {
      return this.$store.getters.getProducts
    }
  },
  methods: {
    onBuy(product) {
      this.$store.dispatch('addToCart', product)
    }
  },
}

</script>
