<template>
    <b-card :title="name" :img-src="image" :img-alt="image"
        img-top tag="article" class="mb-2 Card">

        <p class=card-text>
            {{ description }}
        </p>
        <b-button variant="primary" @click="addProductToCart">Add to Cart</b-button>
    </b-card>
</template>

<script>
import { mapActions } from 'vuex';
import { UPDATE_VALUE } from '../../store/types';

export default {
    props: {
        prod: {
            type: Object
        }
    },
    data() {
        return {
            name: this.prod.product,
            image: this.prod.image,
            description: this.prod.description
        };
    },
    methods: {
        ...mapActions({
            addToCart: 'addProductToCard',
            addProductPriceToValue: UPDATE_VALUE
        }),
        addProductToCart() {
            this.addToCart(this.prod);
            this.addProductPriceToValue(this.prod.price);
        }
    }
};
</script>

<style scoped>
.Card {
    max-width: 20rem;
    margin: 0 auto;
    cursor: pointer;
}

.card-text {
    height: 100px;
    overflow-y: hidden;
}

.card-title {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
</style>
