<template>
  <hooper
    ref="carousel"
    :settings="hooperSettings"
    :style="`width: ${width}px; height:${height}px`"
    @slide="slideChange"
  >
    <template v-for="(slide, index) in medias">
      <slide
        v-if="slide.carouselIdmp4"
        :id="`carousel-slide-${index}`"
        :key="index"
        :style="`width: ${width}px; height:${height}px`"
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
      </slide>

      <slide
        v-else-if="slide.carouselId"
        :id="`carousel-slide-${index}`"
        :key="index"
        class="slide slide-image"
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
        v-slot:hooper-prev
        class="icon icon-arrowLeft"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <title>Arrow Left</title>
        <path
          d="M0 0h24v24H0z"
          fill="none"
        ></path>
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
      </svg>
      <svg
        v-slot:hooper-next
        class="icon icon-arrowLeft"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <title>Arrow Left</title>
        <path
          d="M0 0h24v24H0z"
          fill="#fff"
        ></path>
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
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
      this.$refs.carousel.slideTo(startIndex)
    },
    toStartFirstItem (value) {
      this.$refs.carousel.update();
      if (value) {
        this.$refs.carousel.slideTo(this.startIndex)
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
    slideChange ({ currentSlide, slideFrom }) {
      let activeIndex, previousIndex;

      if (currentSlide === null) {
        return;
      }

      const isNext = slideFrom < currentSlide;

      if (isNext && this.type === 'video' && slideFrom == this.videosLength - 1) {
        previousIndex = slideFrom;
        this.$refs.carousel.slideTo(0);
        activeIndex = 0;
      }
      else if (isNext && this.type == 'image' && slideFrom == this.medias.length - 1) {
        previousIndex = slideFrom;
        this.$refs.carousel.slideTo(this.videosLength);
        activeIndex = this.videosLength;
      }
      else if (!isNext && this.type === 'video' && slideFrom == 0) {
        previousIndex = slideFrom;
        this.$refs.carousel.slideTo(this.videosLength - 1);
        activeIndex = this.videosLength - 1;
      }
      else if (!isNext && this.type == 'image' && slideFrom == this.videosLength) {
        previousIndex = slideFrom;
        this.$refs.carousel.slideTo(this.medias.length - 1);
        activeIndex = this.medias.length - 1;
      }
      else {
        previousIndex = slideFrom;
        activeIndex = currentSlide;
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
    },



    // beforeNext () {
    //   let allowNext = true;
    //   let activeIndex, previousIndex;

    //   if (this.type === 'video' && this.slideIndex == this.videosLength - 1) {
    //     previousIndex = this.slideIndex;
    //     this.slideIndex = 0;
    //     activeIndex = this.slideIndex;
    //     allowNext = false;
    //   } else if (this.type == 'image' && this.slideIndex == this.medias.length - 1) {
    //     previousIndex = this.slideIndex;
    //     this.slideIndex = this.videosLength;
    //     activeIndex = this.slideIndex;
    //     allowNext = false;
    //   } else {
    //     previousIndex = this.slideIndex;
    //     activeIndex = this.slideIndex + 1;
    //   }

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

    //   return allowNext;
    // },
    // beforePrevious () {
    //   let allowPrevious = true;
    //   let activeIndex, previousIndex;

    //   if (this.type === 'video' && this.slideIndex == 0) {
    //     previousIndex = this.slideIndex;
    //     this.slideIndex = this.videosLength - 1;
    //     activeIndex = this.slideIndex;
    //     allowPrevious = false;
    //   } else if (this.type == 'image' && this.slideIndex == this.videosLength) {
    //     previousIndex = this.slideIndex;
    //     this.slideIndex = this.medias.length - 1;
    //     activeIndex = this.slideIndex;
    //     allowPrevious = false;
    //   } else {
    //     previousIndex = this.slideIndex;
    //     activeIndex = this.slideIndex - 1;
    //   }

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

    //   return allowPrevious;
    // },
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
