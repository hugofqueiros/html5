<template>
    <b-card title="product"
        img-src="image"
        img-alt="image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">
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
        },
        company: {
            type: String,
            //required: true
        },
        product: {
            type: String,
            //required: true
        },
        description: {
            type: String
        },
        id: {
            type: Number
        },
        image: {
            type: String,
            //required: true
        },
        price: {
            type: Number
        },
        slogan: {
            type: String
        },
        type: {
            type: Number
        }
    },
    data() {
        return {};
    },
    created() {
        console.log('this: ', this);
    }
}
</script>

<style scoped>

</style>
