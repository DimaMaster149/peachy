<template>
  <div
    @click="$emit('click')"
    :style="{ 'width': width + 'px', 'height': height + 'px' }"
    class="video-wrapper mb-3"
  >
    <video
      :id="`video-${index}`"
      class="video"
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
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
  },

  computed: {
    link () {
      return this.id;
    },
  },
};
</script>
