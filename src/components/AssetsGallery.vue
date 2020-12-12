<template>
  <div>
    <h1>NEW YEAR'S PARTY COLLECTION</h1>
    <div>
      Great to share festive NY mood.
      Shows some dancing, coctails and party vibe.
      Asian, white and black people represented.
    </div>
    <div
      ref="assets"
      class="assets"
    >
      <template v-for="(asset, index) in assets">
        <base-video
          v-if="asset.type === 'video'"
          :id="asset.id"
          :index="index"
          :key="index"
          :width="width"
          :height="height"
        />

        <base-image
          v-else
          :id="asset.id"
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
      indexesToPlay: [],
      videoCount: 0,
      width: 100,
      height: 100
    };
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
    }
  }
}
</script>
