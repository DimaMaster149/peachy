<template>
  <div
    @click="$emit('click')"
    :style="{ 'width': width + 'px', 'height': height + 'px' }"
    class="video-wrapper mb-3"
  >

    <!-- <video
      :id="`video-${index}`"
      ref="videoPlayer"
      class="video video-js"
    ></video> -->
    <video
      :id="`video-${index}`"
      width="320"
      height="240"
      class="video"
      muted="true"
      loop="false"
      playsinline
      ref="videoPlayer"
    >
      <source
        v-if="idmp4"
        :src="idmp4"
        type="video/mp4"
      >
      <source
        v-if="idwebm"
        :src="idwebm"
        type="video/ogg"
      >
      Your browser does not support the video tag.
    </video>

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
    };
  },

  mounted () {
    const videoEl = this.$refs.videoPlayer;
    if (videoEl) {
      this.$emit('player-ready');
    }
  },
};
</script>
