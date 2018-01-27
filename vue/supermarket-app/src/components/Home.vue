<template>
    <div>
        <img src="../assets/logo.png">
        <h1>Supermarket X app</h1>
        <h3>Buy all your products online</h3>
        <hr>
        <p>Your funds: {{ wallet | currency }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            wallet: 100
        };
    },
    computed: {
        funds() {

        }
    },
    methods: {

    },
}
</script>
