<template>
  <hooper
    id="video-carousel"
    group="video"
    ref="video-carousel"
    :settings="hooperSettings"
    :style="`width: ${width}px; height:${height}px`"
    @slide="slideChange"
  >
    <template v-for="(slide, index) in medias">
      <slide
        :key="index"
        class="hooper-slide-item slide-video"
      >
        <video
          class="video"
          muted="true"
          loop="true"
          playsinline
          :class="`video-${index}`"
          :src="slide.carouselIdmp4"
        ></video>
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

  computed: {
    indexesToShow () {
      const nextIndex = this.currentIndex + 2 > this.medias.length ? 0 : this.currentIndex + 1;
      const prevIndex = this.currentIndex - 1 < 0 ? this.medias.length - 1 : this.currentIndex - 1;
      const indexes = [prevIndex, this.currentIndex, nextIndex];
      return indexes;
    },
  },

  watch: {
    startIndex (startIndex) {
      this.$refs['video-carousel'].slideTo(startIndex)
    },
    toStartFirstItem (value) {
      this.$refs['video-carousel'].update();
      if (value) {
        this.$refs['video-carousel'].slideTo(this.startIndex)
        const currentVideoSelector = `.video-${this.startIndex}`
        const currentVideo = document.querySelector(currentVideoSelector);
        if (currentVideo && currentVideo.play) {
          currentVideo.play()
        }

        this.$emit('first-item-started');
      }
    }
  },

  created () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },

  methods: {
    slideChange ({ currentSlide, slideFrom }) {
      console.log(currentSlide, slideFrom, this.medias.length)
      if (currentSlide === slideFrom) {
        console.log('returned')
        return;
      }

      let activeIndex = currentSlide;
      let previousIndex = slideFrom;

      this.currentIndex = activeIndex;
      const currentVideoSelector = `.video-${activeIndex}`
      const currentVideo = document.querySelector(currentVideoSelector);
      if (currentVideo && currentVideo.play) {
        currentVideo.play()
      }

      const prevVideoSelector = `.video-${previousIndex}`;
      const prevVideo = document.querySelector(prevVideoSelector);

      if (prevVideo && prevVideo.play && !prevVideo.paused) {
        try {
          prevVideo.pause();
          prevVideo.currentTime = 0;
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
};
</script>
