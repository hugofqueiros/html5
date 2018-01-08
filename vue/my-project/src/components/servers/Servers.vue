<template>
    <div class="container">
      <servers-header/>
      <hr>
      <servers-list/>
      <hr>
      <Footer/>
    </div>
</template>

<script>
import Header from './Header'
import ServerList from './ServerList'
import Footer from './Footer'

export default {
  components: {
    'servers-header': Header, // still works with serversHeader
    'servers-list': ServerList,
    Footer  // we can do this, it creates a normal js value-pair
  }
}
</script>

<style scoped>
  div {
    border: 1px solid blue;
  }
</style>
