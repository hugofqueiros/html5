<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vuex</h1>
                <app-result></app-result>
                <app-another-result></app-another-result>
                <hr>
                <app-counter></app-counter>
                <app-another-counter></app-another-counter>
            </div>
        </div>
    </div>
</template>

<script>
import Counter from "./Counter.vue";
import Result from "./Result.vue";
import AnotherCounter from './AnotherCounter';
import AnotherResult from './AnotherResult';

export default {
  components: {
    appCounter: Counter,
    appAnotherCounter: AnotherCounter,
    appResult: Result,
    appAnotherResult: AnotherResult,
  }
};
</script>
