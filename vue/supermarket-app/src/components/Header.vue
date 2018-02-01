<template>
    <!-- <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle"
                data-toggle="collapse" data-target="#myNavbar">
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
    </nav> -->
    <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <router-link to="/" class="navbar-brand">
            <b-navbar-brand>
                {{ title }}
            </b-navbar-brand>
        </router-link>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <router-link to="/products" activeClass="active" tag="li">
                    <b-nav-item>
                        <a>Products</a>
                    </b-nav-item>
                </router-link>
                <router-link to="/cart" activeClass="active" tag="li">
                    <b-nav-item>
                        <a>Cart</a>
                    </b-nav-item>
                </router-link>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-text right>
                   <strong>Wallet: {{ total | currency }}</strong>
                </b-nav-text>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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
