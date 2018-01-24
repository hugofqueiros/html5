<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Supermarket App</router-link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/products" activeClass="active" tag="li"><a>Portfolio</a></router-link>
                    <router-link to="/cart" activeClass="active" tag="li"><a>Cart</a></router-link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: {{ total | currency }}</strong>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            total: 0
        }
    }
 }
</script>
