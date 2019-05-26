<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
  >
    <path
      :fill="props.fill"
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
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
