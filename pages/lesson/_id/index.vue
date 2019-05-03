<template>
  <div>
    Lorem ipsum dolor sit amet.
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    console.log({ params });
    return { params };
  }
};
</script>

<style scoped>
/* Styles */
</style>
