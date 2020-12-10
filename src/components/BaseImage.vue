<template>
  <div class="image-wrapper">
    <img class="image" :src="link">
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
  },

  computed: {
    link() {
      return `https://drive.google.com/uc?export=view&id=${this.id}`;
    }
  }
};
</script>
