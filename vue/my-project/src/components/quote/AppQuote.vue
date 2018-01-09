<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button @click="selectedComponent = 'quote'">Quote</button>
        <button @click="selectedComponent = 'appAuthor'">Author</button>
        <button @click="selectedComponent = 'appNew'">New</button>
        <hr>
        <p>{{ selectedComponent }}</p>
        <!-- use dynamic components -->
        <keep-alive>
          <component :is="selectedComponent">
            <p>Default Content</p>
          </component>
        </keep-alive>
        <!-- <quote>
          <h2 slot="title">{{ quoteTitle }}</h2>
          <p>A wonderful Quote!</p>
        </quote> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from './Quote.vue';
  import New from './New.vue';
  import Author from './Author.vue';

  export default {
    data: function() {
      return {
        quoteTitle: 'The Quote',
        selectedComponent: 'quote'
      }
    },
    components: {
      quote: Quote,
      appAuthor: Author,
      appNew: New
    }
  }
</script>


