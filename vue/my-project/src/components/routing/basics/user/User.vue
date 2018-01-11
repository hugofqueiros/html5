<template>
    <div>
        <h1>The User Page</h1>
        <hr>
        <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
        <span></span>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  props: {
    naming: {
      type: String,
    },
    cenas: {
      type: Boolean
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      routeProp: 'owow'
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id;
    }
  },
  methods: {
    navigateToHome() {
      this.$router.push({ name: "homeroute" });
    }
  },
  created() {
    console.log('this.$route', this);
  }
};
</script>
