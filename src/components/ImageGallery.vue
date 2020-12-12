<template>
  <div>
    {{images.length}} photos
    <div
      ref="assets"
      class="assets"
    >
      <template v-for="(image, index) in images">
        <base-image
          :id="image.id"
          :key="index"
          :width="width"
          :height="height"
          @click="openCarousel(image.id)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import BaseImage from './BaseImage';
import emitter, { SHOW_CAROUSEL } from '../eventBus';

export default {
  name: 'assets-gallery',

  components: {
    BaseImage
  },

  data () {
    return {
      width: 100,
      height: 100,
      images: [],
    };
  },

  created () {
    this.images = window.images;
  },

  mounted () {
    this.width = (this.$refs.assets.clientWidth * 0.33) - 8;
    this.height = this.width / 2 * 3;
  },

  methods: {
    openCarousel (id) {
      emitter.emit(SHOW_CAROUSEL, { id, type: 'image' });
    },
  },
};
</script>
