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
  props: [
    'showcase',
    'cart'
  ],
  methods: {
    onBuy(product) {
      this.$emit('productAdd', product)
    }
  },
}

</script>
