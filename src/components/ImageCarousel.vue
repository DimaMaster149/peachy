<template>
  <hooper
    id="image-carousel"
    group="image"
    ref="image-carousel"
    :settings="hooperSettings"
    :style="`width: ${width}px; height:${height}px`"
    @slideChange="slideChange"
  >
    <template v-for="(slide, index) in medias">
      <slide
        :key="index"
        class="hooper-slide-item slide-image"
      >
        <img
          class="carousel-image__inner"
          :src="slide.carouselId"
          :width="width"
        >
      </slide>
    </template>
    <hooper-navigation slot="hooper-addons">
      <svg
        slot="hooper-prev"
        class="icon icon-arrowLeft"
        viewBox="0 0 24 24"
        width="48px"
        height="48px"
        fill="#fff"
      >
        <title>Arrow Left</title>
        <path
          d="M0 0h24v24H0z"
          fill="none"
        ></path>
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
      </svg>
      <svg
        slot="hooper-next"
        viewBox="0 0 24 24"
        width="48px"
        height="48px"
        fill="#fff"
        class=""
      >
        <title>Arrow Right</title>
        <path
          d="M0 0h24v24H0z"
          fill="none"
        ></path>
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
      </svg>
    </hooper-navigation>
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: 'carousel',

  components: {
    Hooper,
    Slide,
    HooperNavigation
  },

  props: {
    medias: {
      type: Array,
    },
    startIndex: {
      type: Number,
    },
    toStartFirstItem: {
      type: Boolean,
    },
    videosLength: {
      type: Number,
    },
  },

  data () {
    return {
      width: 0,
      height: 0,
      loadedVideos: [],
      currentIndex: 0,
      hooperSettings: {
        itemsToShow: 1,
        centerMode: false,
        wheelControl: false,
      },
    };
  },

  watch: {
    startIndex (startIndex) {
      this.$refs['image-carousel'].slideTo(startIndex)
    },
    toStartFirstItem (value) {
      this.$refs['image-carousel'].update();
      if (value) {
        this.$refs['image-carousel'].slideTo(this.startIndex)
        this.$emit('first-item-started');
      }
    }
  },

  created () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },
  methods: {
    slideChange (p) {
      console.log(p)
    }
  }

};
</script>
