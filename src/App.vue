<template>
  <div id="app">
    <assets-gallery :assets="assets" />
  </div>
</template>

<script>
import AssetsGallery from './components/AssetsGallery.vue';

export default {
  name: 'App',

  components: {
    AssetsGallery
  },

  data () {
    return {
      assets: [{
        type: 'video',
        id: '1UrHwQw5cXPg-ZTE_lt0xepSJP1Em9-_t',
      }, {
        type: 'image',
        id: '1RBQXWmWFC5HMNPaYvq8JveQQMnBT54VL'
      }, {
        type: 'video',
        id: '1UrHwQw5cXPg-ZTE_lt0xepSJP1Em9-_t',
      }, {
        type: 'image',
        id: '1RBQXWmWFC5HMNPaYvq8JveQQMnBT54VL'
      }, {
        type: 'video',
        id: '1UrHwQw5cXPg-ZTE_lt0xepSJP1Em9-_t',
      }, {
        type: 'image',
        id: '1RBQXWmWFC5HMNPaYvq8JveQQMnBT54VL'
      }, {
        type: 'video',
        id: '1UrHwQw5cXPg-ZTE_lt0xepSJP1Em9-_t',
      }, {
        type: 'image',
        id: '1RBQXWmWFC5HMNPaYvq8JveQQMnBT54VL'
      }, {
        type: 'video',
        id: '1UrHwQw5cXPg-ZTE_lt0xepSJP1Em9-_t',
      }, {
        type: 'image',
        id: '1RBQXWmWFC5HMNPaYvq8JveQQMnBT54VL'
      }, {
        type: 'video',
        id: '1UrHwQw5cXPg-ZTE_lt0xepSJP1Em9-_t',
      }, {
        type: 'image',
        id: '1RBQXWmWFC5HMNPaYvq8JveQQMnBT54VL'
      }, {
        type: 'video',
        id: '1UrHwQw5cXPg-ZTE_lt0xepSJP1Em9-_t',
      }, {
        type: 'image',
        id: '1RBQXWmWFC5HMNPaYvq8JveQQMnBT54VL'
      },],
    };
  },
};
</script>
