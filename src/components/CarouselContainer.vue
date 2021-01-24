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
      <video-carousel
        v-show="showCarousel && type == 'video'"
        :medias="videos"
        :startIndex="startIndex"
        :toStartFirstItem="toStartFirstVideo"
        @first-item-started="toStartFirstVideo = false"
      />
      <image-carousel
        v-show="showCarousel && type == 'image'"
        :medias="images"
        :startIndex="startIndex"
        :toStartFirstItem="toStartFirstImage"
        @first-item-started="toStartFirstImage = false"
      />

    </div>
  </div>

</template>

<script>
import ImageCarousel from './ImageCarousel.vue'
import VideoCarousel from './VideoCarousel.vue'
import emitter, { SHOW_CAROUSEL } from '../eventBus';

export default {
  name: 'carousel-container',

  components: {
    ImageCarousel,
    VideoCarousel,
  },

  data () {
    return {
      unbind: null,
      showCarousel: false,
      startIndex: 0,
      type: '',
      toStartFirstItem: false,
      toStartFirstVideo: false,
      toStartFirstImage: false,
      images: [],
      videos: [],
    };
  },


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
      if (type == 'video') {
        this.startIndex = index
      } else {
        this.startIndex = index
        // this.startIndex = index + this.videos.length
      }

      this.$nextTick(() => {
        this.$refs.carouselContainer.focus();
        if (type == 'video') {
          this.toStartFirstVideo = true;
        } else {
          this.toStartFirstImage = true;
        }
        // this.toStartFirstItem = true;
        this.showCarousel = true;
      });
    },
    hideCarousel () {
      this.showCarousel = false;
      this.startIndex = 0;
      this.startIndex = 0;
    },
  },
};
</script>
