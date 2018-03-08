<template>
    <b-container class="Cart-container">
        <b-card v-show="!hasItemsOnCart" title="No items in your Cart!" class="text-center">
            <b-alert variant="danger"
                :show="!hasItemsOnCart">
                Add items to cart to be able to buy.
            </b-alert>
        </b-card>
        <b-list-group v-for="(prod, i) in cart" :key="i">
            <b-list-group-item variant="dark" class="Cart-list-item">
                <span>Product: {{ prod.product }}</span>
                <span>
                    Price: {{ prod.price | currency }}
                    <b-btn
                    @click="removeProductFromCard(prod.id)"
                    v-b-popover.hover="'Click to remove item from list'" title="Remove Item">
                        &#x2716;
                    </b-btn>
                </span>

            </b-list-group-item>
        </b-list-group>
        <b-button v-show="hasItemsOnCart" variant="primary" @click="buyProducts">
            Buy Product
        </b-button>
        <b-card v-show="hasBought" title="Your items were Successfully bought!" class="text-center">
            <b-alert variant="success"
                :show="hasBought">
                No real money was taken out of your account :).
            </b-alert>
        </b-card>
    </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_CART } from '../../store/types';
import Card from '../card/Card';

export default {
    data() {
        return {
            hasBought: false
        };
    },
    computed: {
        ...mapGetters({
            cart: GET_CART
        }),
        hasItemsOnCart() {
            return (this.cart.length > 0);
        }
    },
    methods: {
        ...mapActions({
            removeProductFromCard: 'removeProductFromCard'
        }),
        buyProducts() {
            this.hasBought = true;
        }
    },
    components: {
        Card
    }
};
</script>

<style scoped>
.Cart-container {
    margin-top: 30px;
}
.Cart-list-item {
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
