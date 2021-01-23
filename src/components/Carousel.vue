<template>
  <swiper
    :ref="`swiper-${type}`"
    :options="swiperOptions"
    @slideChange="slideChange"
  >
    <template v-for="(slide, index) in medias">
      <swiper-slide
        v-if="slide.carouselIdmp4"
        :class="{'hide': type !== 'video'}"
        :key="index"
      >
        <video
          class="video"
          muted="true"
          loop="true"
          playsinline
          :class="`video-${index}`"
          :src="slide.carouselIdmp4"
        ></video>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </swiper-slide>

      <swiper-slide
        v-else-if="slide.carouselId"
        :class="{'hide': type !== 'image'}"
        :key="index"
      >
        <img
          class="carousel-image__inner"
          :src="slide.carouselId"
          :width="width"
        >
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </swiper-slide>
    </template>

  </swiper>

</template>

<script>
import { Swiper as SwiperClass, Navigation } from 'swiper/js/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/css/swiper.css'

SwiperClass.use([Navigation])

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  name: 'carousel',

  components: {
    Swiper,
    SwiperSlide
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
    }
  },

  data () {
    return {
      width: 0,
      height: 0,
      swiperOptions: {
        width: 0,
        height: 0,
        initialSlide: 0,
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      options: {
        type: 'slide',
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
        },
      },
      loadedVideos: [],
      currentIndex: 0,
    };
  },

  computed: {
    indexesToShow () {
      const nextIndex = this.currentIndex + 2 > this.medias.length ? 0 : this.currentIndex + 1;
      const prevIndex = this.currentIndex - 1 < 0 ? this.medias.length - 1 : this.currentIndex - 1;
      const indexes = [prevIndex, this.currentIndex, nextIndex];
      return indexes;
    },
    swiper () {
      if (this.$refs[`swiper-${this.type}`]) {
        return this.$refs[`swiper-${this.type}`].$swiper
      } return {}
    }
  },

  watch: {
    startIndex (startIndex) {
      this.swiperOptions.initialSlide = startIndex;
    },
    toStartFirstItem (value) {
      if (value) {
        this.swiper.slideTo(this.startIndex);
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
    this.swiperOptions.width = window.innerWidth;
    this.swiperOptions.height = window.innerHeight;
    this.swiperOptions.start = this.initialSlide;
  },

  methods: {
    slideChange () {
      const { activeIndex, previousIndex } = this.swiper;
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
