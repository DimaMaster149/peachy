<template>
  <div class="assets">
    <template v-for="(asset, index) in assets">
      <base-video
        v-if="asset.type === 'video'"
        :id="asset.id"
        :index="index"
        :key="index"
      />

      <base-image
        v-else
        :id="asset.id"
        :key="index"
      />
    </template>
  </div>
</template>

<script>
import BaseVideo from './BaseVideo';
import BaseImage from './BaseImage';

export default {
  name: 'assets-gallery',

  components: {
    BaseVideo,
    BaseImage
  },

  props: {
    assets: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      indexesToPlay: [0, 2, 4],
      videoCount: 0,
    };
  },
  async mounted () {
    let first = true;
    document.getElementById(`video-${this.indexesToPlay[0]}`).oncanplay = () => {
      if (first) {
        this.playVideo();
        first = false;
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
    }
  }
}
</script>
