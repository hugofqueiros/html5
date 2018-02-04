<template>
    <b-container fluid>
        <img src="../assets/logo.png">
        <h1>Supermarket X app</h1>
        <h3>Buy all your products online</h3>
        <hr>
        <p>Your funds: {{ total | currency }}</p>
    </b-container>
</template>

<script>

export default {
    data() {
        return {
            wallet: 100
        };
    },
    computed: {
        total() {
            return this.wallet;
        }
    }
};
</script>
