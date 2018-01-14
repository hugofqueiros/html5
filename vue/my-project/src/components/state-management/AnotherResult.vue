<template>
  <div>
    <p>Counter is: {{ doubleCounter }}</p>
    <p>Number of Clicks: {{ stringCounter }}</p>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../store/types";

export default {
  computed: {
    // counter() {
    //   return this.$store.getters.doubleCounter;
    // },
    // clicks() {
    //   return this.$store.getters.stringCounter;
    // },
    // create all computed from vuex helper
    ...mapGetters({
      doubleCounter: types.DOUBLE_COUNTER,
      stringCounter: types.CLICK_COUNTER
    })
  }
};
</script>
