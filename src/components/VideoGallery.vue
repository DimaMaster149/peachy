<template>
  <div class="container">
    {{videos.length}} videos
    <div
      ref="assets"
      class="assets"
    >
      <template v-for="(video, index) in videos">
        <base-video
          v-if="video.type === 'video'"
          :idmp4="video.galleryIdmp4"
          :idwebm="video.galleryIdwebm"
          :index="index"
          :key="index"
          :width="width"
          :height="height"
          @click="openCarousel(index)"
          @player-ready="playerReady"
        />

        <base-image
          v-else
          :id="video.galleryId"
          :key="index"
          :width="width"
          :height="height"
          @click="openCarousel(index)"
        />
      </template>
    </div>
  </div>
</template>

<script>
const BaseVideo = () => import('./BaseVideo');
import BaseImage from './BaseImage';
import emitter, { SHOW_CAROUSEL } from '../eventBus';

export default {
  name: 'video-gallery',

  components: {
    BaseVideo,
    BaseImage
  },

  data () {
    return {
      indexesToPlay: [],
      videoCount: 0,
      width: 100,
      height: 100,
      videos: [],
      firstVideoPlayed: false,
    };
  },

  created () {
    this.videos = window.videos;
    this.indexesToPlay = window.videosToPlay.map(item => item - 1);
    this.timeToPlay = window.timeToPlay || 3000;
  },

  async mounted () {
    this.width = (this.$refs.assets.clientWidth * 0.33) - 8;
    this.height = this.width / 2 * 3;
  },

  methods: {
    playerReady () {
      if (this.indexesToPlay && this.indexesToPlay.length > 0) {
        const video = document.getElementById(`video-${this.indexesToPlay[0]}_html5_api`);
        if (video) {
          video.oncanplay = () => {
            if (!this.firstVideoPlayed) {
              this.playVideo();
              this.firstVideoPlayed = true;
            }
          }
        }
      }
    },
    playVideo () {
      const index = this.indexesToPlay[this.videoCount];
      const video = document.getElementById(`video-${index}_html5_api`);
      this.videoCount++;
      if (video.play) {
        video.play()
        
        setTimeout(() => {
          video.pause();
          video.currentTime = 0;
          if (this.indexesToPlay.length > this.videoCount) {
            this.playVideo();
          }
        }, 2500)
      }
    },
    timeout (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    openCarousel (index) {
      emitter.emit(SHOW_CAROUSEL, { index, type: 'video' });
    },
  },
};
</script>
