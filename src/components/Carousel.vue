<template>
  <splide
    :options="options"
    :slides="medias"
    :extensions="extensions"
    @splide:visible="slideVisible"
    ref="splide"
  >
    <template v-for="(slide, index) in medias">
      <splide-slide
        v-if="type == 'video'"
        :key="index"
        class="splide__slide--has-video"
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
          class="carousel-image__inner"
          :src="slide.carouselId"
          :width="width"
        >
      </splide-slide>
    </template>
  </splide>

</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// import Video from '@splidejs/splide-extension-video';

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
    toStartFirstItem: {
      type: Boolean,
    }
  },

  data () {
    return {
      width: 0,
      height: 0,
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
      extensions: {
        // Video
      }
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
      this.options.start = startIndex;
    },
    toStartFirstItem (value) {
      if (value) {
        this.$refs.splide.go(this.startIndex, false);
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
    this.options.width = window.innerWidth;
    this.options.height = window.innerHeight;
    this.options.start = this.startIndex;
  },

  methods: {
    slideVisible (slide) {
      const { index } = slide
      this.currentIndex = index;
      const currentVideoSelector = `.video-${index}`
      const currentVideo = document.querySelector(currentVideoSelector);
      if (currentVideo && currentVideo.play) {
        currentVideo.play()
      }

      const prevIndex = slide.Components.Controller.prevIndex;
      const prevVideoSelector = `.video-${prevIndex}`;
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
