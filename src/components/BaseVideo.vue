<template>
  <div
    @click="$emit('click')"
    :style="{ 'width': width + 'px', 'height': height + 'px' }"
    class="video-wrapper mb-3"
  >

    <video
      :id="`video-${index}`"
      ref="videoPlayer"
      class="video video-js"
    ></video>

  </div>
</template>

<script>
export default {
  name: 'base-video',

  props: {
    idmp4: {
      type: String,
    },
    idwebm: {
      type: String,
    },
    index: {
      type: Number,
      required: true,
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
  },

  data () {
    return {
      player: null,
      videoOptions: {
        muted: true,
        autoplay: false,
        sources: []
      },
    };
  },

  created () {
    if (this.idmp4) {
      this.videoOptions.sources.push({
        src: this.idmp4,
        type: "video/mp4"
      });
    }

    if (this.idwebm) {
      this.videoOptions.sources.push({
        src: this.idwebm,
        type: "video/webm"
      })
    }
  },

  mounted () {
    const videojs = window.videojs;
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, () => {
      this.$emit('player-ready')
    });
    this.player.on('touchstart', () => {
      this.$emit('click')
    });
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
};
</script>
