<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
  >
    <path :fill="props.fill" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
</template>

<script>
export default {
  props: {
    size: { type: Number, default: 24 },
    fill: { type: String, default: "currentcolor" }
  }
};
</script>
