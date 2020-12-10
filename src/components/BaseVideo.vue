<template>
  <div class="video-wrapper">
    <video
      :id="`video-${index}`"
      class="video"
      width="320"
      height="240"
      controls
    >
      <source
        :src="link"
        type='video/mp4'
      >
    </video>
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
  },

  computed: {
    link() {
      return `https://drive.google.com/uc?export=download&id=${this.id}`
    },
  },
};
</script>
