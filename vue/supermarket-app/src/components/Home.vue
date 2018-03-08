<template>
    <b-container fluid>
        <img src="../assets/logo.png">
        <h1 class="app-title">Supermarket X app</h1>
        <h3>Buy all your products online</h3>
        <hr>
        <p>Current value on your cart: {{ total | currency }}</p>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { VALUE } from '../store/types';

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters({
            total: VALUE
        })
    }
};
</script>
