<template>
  <div>
    carousel
  </div>
</template>

<script>
import emitter, { SHOW_CAROUSEL } from '../eventBus';

export default {
  name: 'carousel',
  data () {
    return {
      unbind: null,
    };
  },
  created () {
    this.unbind = emitter.on(SHOW_CAROUSEL, this.openCarousel);
  },
  methods: {
    openCarousel () {
      console.log('CAROUSEL OPENED');
    },
  },
};
</script>
