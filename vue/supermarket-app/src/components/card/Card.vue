<template>
    <b-card :title="product"
        :img-src="image"
        :img-alt="image"
        img-top
        tag="article"
        class="mb-2 Card">
        <p class=card-text>
            {{ description }}
        </p>
    </b-card>
</template>

<script>
export default {
    props: {
        prod: {
            type: Object
        }
    },
    data() {
        return {
            product: this.prod.product,
            image: this.prod.image,
            description: this.prod.description
        };
    }
};
</script>

<style scoped>
.Card {
    max-width: 20rem;
    margin: 0 auto;
}
</style>
