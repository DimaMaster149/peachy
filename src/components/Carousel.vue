<template>
  <div>
    <light-box
      v-if="showCarousel"
      :media="medias"
      :startAt=startMediaIndex
      :showFooterCount="false"
      :showThumbs="false"
      @onClosed="carouselClosed"
    />
  </div>
</template>

<script>
import LightBox from 'vue-image-lightbox'
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css';
import emitter, { SHOW_CAROUSEL } from '../eventBus';

export default {
  name: 'carousel',

  components: {
    'light-box': LightBox,
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
    };
  },

  computed: {
    medias () {
      const medias = this.type == 'video'
        ? this.videos.map(video => ({
          thumb: video.id,
          sources: [{ src: video.id, type: 'video/mp4' }],
          type: 'video',
          width: this.width,
          height: this.height,
        }))
        : this.images.map(image => ({
          thumb: image.id,
          src: image.id,
          type: 'image'
        }));

      return medias;
    }
  },

  created () {
    this.images = window.images;
    this.videos = window.videos;
    this.unbind = emitter.on(SHOW_CAROUSEL, this.openCarousel);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },

  beforeDestroy () {
    this.unbind();
  },

  methods: {
    openCarousel ({ id, type }) {
      this.type = type;
      this.showCarousel = true;
      this.startMediaIndex = 0;
      console.log({ id, type }, 'CAROUSEL OPENED');
    },
    carouselClosed () {
      this.showCarousel = false;
      this.startMediaIndex = 0;
    },
  },
};
</script>
