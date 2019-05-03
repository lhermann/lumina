<template>
  <div>
    <div class="w-10 ml-4">
      <div class="connect border-gray-400 h-4"></div>
    </div>
    <button
      class="w-full flex items-center bg-white rounded shadow-md px-4 hover:bg-gray-100"
      @click="$emit('click')"
    >
      <div class="w-10 mr-4">
        <div
          class="connect h-2"
          :class="{ 'border-gray-400': !done, 'border-green-500': done }"
        ></div>
        <div
          class="circle"
          :class="{ 'border-gray-400': !done, 'border-green-500': done }"
        >
          <icon-done v-if="done" class="text-green-500" />
          <icon-play v-else class="text-blue-500" />
        </div>
        <div
          class="connect h-2"
          :class="{
            'border-transparent': index + 1 >= of,
            'border-gray-400': index + 1 < of && !done,
            'border-green-500': index + 1 < of && done
          }"
        ></div>
      </div>
      <div class="flex-1 text-left truncate">
        <span class="font-semibold text-gray-400 mr-2">#{{ number }}</span>
        {{ title }}
      </div>
      <icon-arrow-right />
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
    done: { type: Boolean, default: false },
    priorDone: { type: Boolean, default: false }
  },
  computed: {
    number() {
      return get(this.lesson, "fields.number");
    },
    title() {
      return get(this.lesson, "fields.title");
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
