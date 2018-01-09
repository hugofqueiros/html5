<template>
  <div class="row">
    <app-quote
      v-for="(quote, index) in quotes"
      v-bind:key="index"
      @click.native="deleteQuote(index)"> <!-- to click on native -->
      {{ quote }}
    </app-quote>
  </div>
</template>

<script>
import Quote from "./Quote.vue";

export default {
  props: ["quotes"],
  components: {
    appQuote: Quote
  },
  methods: {
    deleteQuote(index) {
      this.$emit("quoteDeleted", index);
    }
  }
};
</script>
