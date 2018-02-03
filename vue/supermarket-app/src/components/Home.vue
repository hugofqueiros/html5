<template>
    <div>
        <img src="../assets/logo.png">
        <h1>Supermarket X app</h1>
        <h3>Buy all your products online</h3>
        <hr>
        <p>Your funds: {{ total | currency }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
// import store from '../store/store';

export default {
    data() {
        return {
            wallet: 100
        };
    },
    // created () {
    //     this.fetchData()
    // },
    // beforeRouteEnter(to, from, next) {
    //     store.dispatch('fetchProducts');
    // },
    computed: {
        total() {
            return this.wallet;
        }
    },
    methods: {
        ...mapActions({
            fetchData: "fetchProducts"
        }),
    }
};
</script>
