<template>
  <div>
    <div class="w-10 ml-4">
      <div class="w-3 mx-auto bg-white h-4 shadow-md">
        <div
          class="connect h-4"
          :class="{
            'border-gray-400': !isPreviousVisited,
            'border-green-500': isPreviousVisited
          }"
        ></div>
      </div>
    </div>
    <button
      class="w-full flex items-center bg-white rounded shadow-md px-4"
      :class="{ 'opacity-50': isDummy, 'hover:bg-gray-100': !isDummy }"
      @click="onClick"
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
          <icon-done v-if="isVisited" class="text-green-500" />
          <icon-play v-else class="text-blue-500" />
        </div>
        <div
          class="connect h-2"
          :class="{
            'border-transparent': index + 1 >= of,
            'border-gray-400': index + 1 < of && !nextDone,
            'border-green-500': index + 1 < of && nextDone
          }"
        ></div>
      </div>
      <div class="flex-1 text-left truncate">
        <span class="font-semibold text-gray-400 mr-2">#{{ number }}</span>
        {{ title }}
      </div>
      <icon-arrow-right v-show="!isDummy" />
    </button>
  </div>
</template>

<script>
import IconPlay from "~/components/icons/Play";
import IconDone from "~/components/icons/Done";
import IconArrowRight from "~/components/icons/ArrowRight";
import get from "lodash/get";

export default {
  components: { IconPlay, IconDone, IconArrowRight },
  props: {
    lesson: { type: Object, default: null },
    index: { type: Number, default: 0 },
    of: { type: Number, default: 0 },
    previousDone: { type: Boolean, default: false },
    nextDone: { type: Boolean, default: false }
  },
  computed: {
    isDummy() {
      return Boolean(this.lesson.dummy);
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
      this.$router.push(`/lesson/${this.id}`);
    }
  }
};
</script>

<style scoped>
.connect {
  @apply mx-auto relative z-10;
  @apply border-l-4;
  width: 0;
}

.circle {
  @apply w-10 h-10 text-center relative z-20;
  @apply flex items-center justify-center -my-px;
  @apply rounded-full border-4;
}
</style>
