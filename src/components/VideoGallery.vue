<template>
  <div>
    {{videos.length}} videos
    <div
      ref="assets"
      class="assets"
    >
      <template v-for="(video, index) in videos">
        <base-video
          v-if="video.type === 'video'"
          :id="video.id"
          :index="index"
          :key="index"
          :width="width"
          :height="height"
        />

        <base-image
          v-else
          :id="video.id"
          :key="index"
          :width="width"
          :height="height"
        />
      </template>
    </div>
  </div>
</template>

<script>
import BaseVideo from './BaseVideo';
import BaseImage from './BaseImage';

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
    };
  },

  created () {
    this.videos = window.videos;
  },

  async mounted () {
    this.width = (this.$refs.assets.clientWidth * 0.33) - 8;
    this.height = this.width / 2 * 3;

    if (this.indexesToPlay && this.indexesToPlay.length > 0) {
      let first = true;
      document.getElementById(`video-${this.indexesToPlay[0]}`).oncanplay = () => {
        if (first) {
          this.playVideo();
          first = false;
        }
      }
    }
  },

  methods: {
    playVideo () {
      const index = this.indexesToPlay[this.videoCount];
      const video = document.getElementById(`video-${index}`);
      this.videoCount++;
      if (video.play) {
        video.play()
        setTimeout(() => {
          video.pause();
          video.currentTime = 0;
          if (this.indexesToPlay.length > this.videoCount) {
            this.playVideo();
          }
        }, 3000)
      }
    },
    timeout (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
};
</script>
