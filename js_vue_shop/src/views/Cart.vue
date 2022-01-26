<template>
  <div class="home">
    <product-card v-for="product of cart" :key="product.id" :data="product" :target="'cart'" v-on:productAction="onDelete"></product-card>
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
    onDelete(product) {
      this.$emit('productDelete', product)
    }
  },
}

</script>
