<template>
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
import { mapGetters } from 'vuex';
import { VALUE } from '../store/types';

export default {
    data() {
        return {
            title: 'Supermarket App'
        };
    },
    computed: {
        ...mapGetters({
            total: VALUE
        })
    }
};
</script>
