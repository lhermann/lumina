<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
  >
    <path
      :fill="props.fill"
      d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"
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
