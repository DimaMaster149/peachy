<template>
  <div>
    <div
      v-if="showCarousel"
      class="carousel-container"
      @keyup.esc="hideCarousel"
    >
      <div @click="hideCarousel" class="hide-carousel">X</div>

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
            :data-splide-html-video="slide.id"
          >
          </splide-slide>

          <splide-slide
            v-else
            :key="index"
          >
            <img
              class="carousel-image"
              :data-splide-lazy="slide.id"
            >
          </splide-slide>
        </template>
      </splide>
    </div>
  </div>

</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Video from '@splidejs/splide-extension-video';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';

import emitter, { SHOW_CAROUSEL } from '../eventBus';

export default {
  name: 'carousel',

  components: {
    Splide,
    SplideSlide,
  },

  data () {
    return {
      unbind: null,
      startMediaIndex: 0,
      showCarousel: false,
      images: [],
      videos: [],
      type: 'video',
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

  computed: {
    medias () {
      const medias = this.type == 'video' ? this.videos : this.images;

      return medias;
    }
  },

  created () {
    this.images = window.images;
    this.videos = window.videos;
    this.unbind = emitter.on(SHOW_CAROUSEL, this.openCarousel);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.options.width = window.innerWidth;
    this.options.height = window.innerHeight;
  },

  beforeDestroy () {
    this.unbind();
  },

  methods: {
    openCarousel ({ id, type }) {
      this.type = type;
      this.showCarousel = true;
      if (type == 'video') {
        this.options.start = this.videos.findIndex(v => v.id == id);
      } else {
        this.options.start = this.images.findIndex(i => i.id == id);
      }
      // set focus on carousel
    },
    hideCarousel () {
      this.showCarousel = false;
      this.options.start = 0;
    },
  },
};
</script>
