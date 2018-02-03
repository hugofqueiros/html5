<template>
    <b-row>
        <b-col>
            <b-list-group>
                <b-list-group-item v-for="(prod, i) in products" :key="i" :prod="prod">
                    {{ prod }}
                    <card :prod="prod" />
                </b-list-group-item>
            </b-list-group>
        </b-col>
    </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Card from '../card/Card';

export default {
    created() {
        this.fetchData();
    },
    beforeRouteEnter(to, from, next) {
        //this.$store.dispatch('fetchProducts');
        console.log('beforeRouteEnter');
        next();
    },
    methods: {
        ...mapActions({
            fetchData: "fetchProducts"
        }),
    },
    computed: {
        ...mapGetters({
            products: 'getProducts'
        })
    },
    components: {
        Card
    }
}
</script>

<style scoped>

</style>
