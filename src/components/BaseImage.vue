<template>
  <div
    @click="$emit('click')"
    :style="{'width': width + 'px', 'height': height + 'px'}"
    class="image-wrapper mb-3"
  >
    <img
      class="image"
      v-lazy="link"
    >
  </div>
</template>

<script>
export default {
  name: 'base-image',

  props: {
    id: {
      type: String,
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
