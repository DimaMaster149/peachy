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

    <!-- <video
      :id="`video-${index}`"
      class="video"
      muted
    >
      <source
        :src="link"
        type='video/mp4'
      >
    </video> -->
  </div>
</template>

<script>
export default {
  name: 'base-video',

  props: {
    id: {
      type: String,
      required: true,
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
        sources: [
          {
            src: this.id,
            type: "video/mp4"
          }
        ]
      },
    };
  },

  computed: {
    link () {
      return this.id;
    },
  },

  mounted () {
    const videojs = window.videojs;
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, () => {
      this.$emit('player-ready')
    })
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
};
</script>
