<template>
    <div class="card">
        <h3>{{ data.title }}</h3>
        <p>{{ data.price }} $</p>
        <button v-on:click="onClick" v-if="target == 'showcase'">Добавить в корзину</button>
        <button v-on:click="onClick" v-if="target == 'cart'">Удалить из корзины</button>
    </div>
</template>

<script>
export default {
    name: "card",
    props: [
        "data",
        "target"
    ],
    methods: {
        onClick() {
            this.$emit('productAction', this.data)
        }
    },
}
</script>