<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="container">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>whatever</h1>
        <hr>
        <router-view name="header-top"></router-view>
        <transition name="slide" mode="out-in">
          <router-view/>
        </transition>
        <router-view name="header-bottom"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.slide-leave-active {
        transition: opacity 1s ease;
        opacity: 0;
        animation: slide-out 1s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
