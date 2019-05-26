<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
  >
    <path
      :fill="props.fill"
      d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
    />
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
