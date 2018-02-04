<template>
    <b-container class="Products-container">
        <b-row>
            <b-col cols="12" md="4" lg="3" v-for="(prod, i) in products" :key="i">
                <card :prod="prod" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { GET_PRODUCTS } from '../../store/types';
import Card from '../card/Card';
// import store from '../../store';

export default {
    created() {
        this.fetchData();
    },
    beforeRouteEnter(to, from, next) {
        // store.dispatch('fetchProducts');
        next();
    },
    methods: {
        ...mapActions({
            fetchData: 'fetchProducts'
        })
    },
    computed: {
        ...mapGetters({
            products: GET_PRODUCTS
        })
    },
    components: {
        Card
    }
};
</script>

<style scoped>
.Products-container {
    margin-top: 30px;
}
</style>
