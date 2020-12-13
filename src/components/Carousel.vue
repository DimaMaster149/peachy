<template>
  <splide
    :options="options"
    :extensions="extensions"
    :slides="medias"
  >
    <template v-for="(slide, index) in medias">
      <splide-slide
        v-if="type == 'video'"
        :class="`video-${index}`"
        :key="index"
        :data-splide-html-video="slide.carouselId"
      >
      </splide-slide>

      <splide-slide
        v-else
        :key="index"
      >
        <img
          class="carousel-image"
          :data-splide-lazy="slide.carouselId"
        >
      </splide-slide>
    </template>
  </splide>

</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';

import Video from '@splidejs/splide-extension-video';

export default {
  name: 'carousel',

  components: {
    Splide,
    SplideSlide,
  },

  props: {
    medias: {
      type: Array,
    },
    type: {
      type: String,
    },
    startIndex: {
      type: Number,
    },
  },

  data () {
    return {
      width: 0,
      height: 0,
      options: {
        type: 'loop',
        lazyLoad: 'nearby',
        rewind: true,
        gap: '1rem',
        width: 0,
        height: 0,
        perPage: 1,
        perMove: 1,
        start: 0, // start index
        video: {
          autoplay: true,
          loop: true,
          mute: true,
          hideControls: true,
          playerOptions: {
            htmlVideo: {
              playsinline: true,
              preload: 'auto',
            },
          },
          // disableOverlayUI: true
        },
      },
      extensions: {
        Video,
      },
    };
  },

  watch: {
    startIndex (startIndex) {
      this.options.start = startIndex;
    },
  },

  created () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.options.width = window.innerWidth;
    this.options.height = window.innerHeight;
    this.options.start = this.startIndex;
  },
};
</script>
