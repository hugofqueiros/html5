<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link to="/" class="navbar-brand">
                    {{ title }}
                </router-link>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <router-link to="/products" activeClass="active" tag="li">
                        <a>Products</a>
                    </router-link>
                    <router-link to="/cart" activeClass="active" tag="li">
                        <a>Cart</a>
                    </router-link>
                </ul>
                <strong class="navbar-text navbar-right">Wallet: {{ total | currency }}</strong>
                <ul class="nav navbar-nav navbar-right">

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            title: 'Supermarket App',
            total: 100
        };
    }
};
</script>
