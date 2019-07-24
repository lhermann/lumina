<template>
  <div>
    <div class="w-10 ml-4">
      <div
        class="w-3 mx-auto bg-white h-4 shadow-md"
        :class="{ 'opacity-50': placeholder }"
      >
        <div
          class="connect h-4"
          :class="{
            'border-gray-400': !isPreviousVisited,
            'border-green-500': isPreviousVisited
          }"
        ></div>
      </div>
    </div>
    <nuxt-link
      class="w-full flex items-center bg-white rounded shadow-md px-4"
      :class="{ 'opacity-50': placeholder, 'hover:bg-gray-100': !placeholder }"
      :disabled="placeholder"
      :to="`/lessons/${id}`"
    >
      <div class="w-10 mr-4">
        <div
          class="connect h-2"
          :class="{
            'border-gray-400': !isPreviousVisited,
            'border-green-500': isPreviousVisited
          }"
        ></div>
        <div
          class="circle"
          :class="{
            'border-gray-400': !isVisited,
            'border-green-500': isVisited
          }"
        >
          <span v-if="isVisited" class="text-green-500"><icon-done /></span>
          <span v-else class="text-blue-500"><icon-play /></span>
        </div>
        <div
          class="connect h-2"
          :class="{
            'border-transparent': index + 1 >= of,
            'border-gray-400': index + 1 < of && !(nextDone && isVisited),
            'border-green-500': index + 1 < of && nextDone && isVisited
          }"
        ></div>
      </div>
      <div class="flex-1 text-left truncate">
        <span class="font-semibold text-gray-400 mr-2">#{{ number }}</span>
        {{ title }}
      </div>
      <icon-wait v-if="placeholder" />
      <icon-arrow-right v-else />
    </nuxt-link>
  </div>
</template>

<script>
import IconPlay from "~/components/icons/Play";
import IconDone from "~/components/icons/Done";
import IconArrowRight from "~/components/icons/ArrowRight";
import IconWait from "~/components/icons/Wait";
import get from "lodash/get";

export default {
  components: { IconPlay, IconDone, IconArrowRight, IconWait },
  props: {
    lesson: { type: Object, default: null },
    index: { type: Number, default: 0 },
    of: { type: Number, default: 0 },
    previousDone: { type: Boolean, default: false },
    nextDone: { type: Boolean, default: false }
  },
  computed: {
    placeholder() {
      return get(this.lesson, "fields.placeholder", false);
    },
    isVisited() {
      return this.$store.getters["progress/visited"](this.id);
    },
    isPreviousVisited() {
      return (
        (this.previousDone && this.isVisited) ||
        (this.isVisited && this.index === 0)
      );
    },
    id() {
      return get(this.lesson, "sys.id", "");
    },
    number() {
      return get(this.lesson, "fields.number");
    },
    title() {
      return get(this.lesson, "fields.title");
    }
  },
  methods: {
    onClick() {
      this.$router.push(`/lessons/${this.id}`);
    }
  }
};
</script>

<style scoped>
.connect {
  @apply mx-auto relative z-10;
  @apply border-l-2;
  width: 0;
}

.circle {
  @apply w-10 h-10 text-center relative z-20;
  @apply flex items-center justify-center -my-px;
  @apply rounded-full border-2;
}
</style>
