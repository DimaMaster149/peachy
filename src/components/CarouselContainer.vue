<template>
  <div>
    <div
      v-show="showCarousel"
      class="carousel-container"
      tabindex="0"
      ref="carouselContainer"
      @keyup.esc="hideCarousel"
    >
      <div
        v-show="showCarousel"
        @click="hideCarousel"
        class="hide-carousel"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times"
          class="svg-inline--fa fa-times fa-w-11"
          role="img"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </div>

      <carousel
        v-show="showCarousel && type == 'video'"
        :medias="videos"
        :startIndex="startIndex"
        type="video"
        :toStartFirstItem="toStartFirstVideo"
        @first-item-started="toStartFirstVideo = false"
      />

      <carousel
        v-show="showCarousel && type == 'image'"
        :medias="images"
        :startIndex="startIndex"
        type="image"
        :toStartFirstItem="toStartFirstImage"
        @first-item-started="toStartFirstImage = false"
      />
    </div>
  </div>

</template>

<script>
const Carousel = () => import('./Carousel.vue');
import emitter, { SHOW_CAROUSEL } from '../eventBus';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default {
  name: 'carousel-container',

  components: {
    Carousel,
  },

  data () {
    return {
      unbind: null,
      showCarousel: false,
      startIndex: 0,
      type: '',
      toStartFirstVideo: false,
      toStartFirstImage: false,
      images: [],
      videos: [],
    };
  },

  // computed: {
  //   medias () {
  //     const medias = this.type == 'video' ? this.videos : this.images;
  //     return medias;
  //   }
  // },

  created () {
    this.images = window.images;
    this.videos = window.videos;
    this.unbind = emitter.on(SHOW_CAROUSEL, this.openCarousel);
  },

  beforeDestroy () {
    this.unbind();
  },

  methods: {
    openCarousel ({ index, type }) {
      this.type = type;
      this.startIndex = index;

      this.$nextTick(() => {
        this.$refs.carouselContainer.focus();
        this.toStartFirstVideo = true;
        this.showCarousel = true;
      });
    },
    hideCarousel () {
      this.showCarousel = false;
      this.startIndex = 0;
    },
  },
};
</script>
