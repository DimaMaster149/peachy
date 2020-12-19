<template>
  <splide
    :options="options"
    :slides="medias"
    @splide:visible="slideVisible"
  >
    <template v-for="(slide, index) in medias">
      <splide-slide
        v-if="type == 'video'"
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
        // video: {
        //   autoplay: true,
        //   loop: true,
        //   mute: true,
        //   hideControls: true,
        //   playerOptions: {
        //     htmlVideo: {
        //       playsinline: true,
        //       preload: 'auto',
        //     },
        //   },
        // },
      },
      loadedVideos: [],
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

  methods: {
    slideVisible (slide) {
      const { index } = slide
      const currentVideoSelector = `.video-${index}`
      const currentVideo = document.querySelector(currentVideoSelector);
      // if (!currentVideo.oncanplay) {
      //   currentVideo.oncanplay = () => {
      currentVideo.play()
      //   }
      // }

      const prevIndex = slide.Components.Controller.prevIndex;
      const prevVideoSelector = `.video-${prevIndex}`;
      const prevVideo = document.querySelector(prevVideoSelector);

      if (!prevVideo.paused) {
        prevVideo.pause();
        prevVideo.currentTime = 0;
      }

      this.loadVideo(index);
    },
    loadVideo (index) {
      if (!this.loadedVideos.includes(`.video-${index}`)) {
        this.loadedVideos.push(`.video-${index}`)
      }

      if (this.type == 'video' && !this.loadedVideos.includes(`.video-${index + 1}`)) {
        const selector = `.video-${index + 1}`;
        const nextVideo = document.querySelector(selector);
        if (nextVideo) {
          this.loadedVideos.push(selector)
          nextVideo.load();
        }
      }
    }
  }
};
</script>
