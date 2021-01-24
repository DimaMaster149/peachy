<template>
  <slider
    ref="carousel"
    v-model="slideIndex"
    :autoplay="false"
    :indicators="false"
    :before-next="beforeNext"
    :before-previous="beforePrevious"
    :style="`width: ${width}px; height:${height}px`"
  >
    <template v-for="(slide, index) in medias">
      <slider-item
        v-if="slide.carouselIdmp4"
        :class="{'hide': type !== 'video'}"
        :key="index"
        class="slide slide-video"
      >
        <video
          class="video"
          muted="true"
          loop="true"
          playsinline
          :class="`video-${index}`"
          :src="slide.carouselIdmp4"
        ></video>
      </slider-item>

      <slider-item
        v-else-if="slide.carouselId"
        :class="{'hide': type !== 'image'}"
        :key="index"
        class="slide slide-image"
      >
        <img
          class="carousel-image__inner"
          :src="slide.carouselId"
          :width="width"
        >
      </slider-item>
    </template>
    <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
  </slider>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
  name: 'carousel',

  components: {
    Slider,
    SliderItem,
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
      slideIndex: 0,
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
      this.slideIndex = startIndex;
    },
    toStartFirstItem (value) {
      if (value) {
        this.slideIndex = this.startIndex;
        if (this.type == 'video') {
          const currentVideoSelector = `.video-${this.startIndex}`
          const currentVideo = document.querySelector(currentVideoSelector);
          if (currentVideo && currentVideo.play) {
            currentVideo.play()
          }
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
    beforeNext () {
      let allowNext = true;
      let activeIndex, previousIndex;

      if (this.type === 'video' && this.slideIndex == this.videosLength - 1) {
        previousIndex = this.slideIndex;
        this.slideIndex = 0;
        activeIndex = this.slideIndex;
        allowNext = false;
      } else if (this.type == 'image' && this.slideIndex == this.medias.length - 1) {
        previousIndex = this.slideIndex;
        this.slideIndex = this.videosLength;
        activeIndex = this.slideIndex;
        allowNext = false;
      } else {
        previousIndex = this.slideIndex;
        activeIndex = this.slideIndex + 1;
      }

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

      return allowNext;
    },
    beforePrevious () {
      let allowPrevious = true;
      let activeIndex, previousIndex;

      if (this.type === 'video' && this.slideIndex == 0) {
        previousIndex = this.slideIndex;
        this.slideIndex = this.videosLength - 1;
        activeIndex = this.slideIndex;
        allowPrevious = false;
      } else if (this.type == 'image' && this.slideIndex == this.videosLength) {
        previousIndex = this.slideIndex;
        this.slideIndex = this.medias.length - 1;
        activeIndex = this.slideIndex;
        allowPrevious = false;
      } else {
        previousIndex = this.slideIndex;
        activeIndex = this.slideIndex - 1;
      }

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

      return allowPrevious;
    },
    // slideChange () {
    //   const { activeIndex, previousIndex } = this.swiper;
    //   this.currentIndex = activeIndex;
    //   const currentVideoSelector = `.video-${activeIndex}`
    //   const currentVideo = document.querySelector(currentVideoSelector);
    //   if (currentVideo && currentVideo.play) {
    //     currentVideo.play()
    //   }

    //   const prevVideoSelector = `.video-${previousIndex}`;
    //   const prevVideo = document.querySelector(prevVideoSelector);

    //   if (prevVideo && prevVideo.play && !prevVideo.paused) {
    //     try {
    //       prevVideo.pause();
    //       prevVideo.currentTime = 0;
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }
    // },
  },
};
</script>
