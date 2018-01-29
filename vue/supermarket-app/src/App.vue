<template>
    <div id="app" class="container-fluid">
        <b-container fluid>
            <app-header/>
            <b-row>
                <b-col>
                    <transition name="slide" mode="out-in">
                        <router-view/>
                    </transition>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Header from './components/Header';

export default {
    name: 'App',
    components: {
        appHeader: Header
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
}

.slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-30px);
        opacity: 0;
    }
}
</style>
