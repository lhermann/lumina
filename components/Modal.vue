<template>
  <transition name="fade">
    <div v-if="active" class="background flex items-center justify-center p-12">
      <!-- modal -->
      <section
        v-if="active"
        class="w-full max-w-2xl rounded bg-white p-6 shadow-lg"
      >
        <header class="flex items-center mb-6">
          <h2 class="flex-1 text-gray-600 text-xl">{{ title }}</h2>
          <button class="py-1 px-2" @click="close"><icon-close /></button>
        </header>
        <div class="text-center my-4">
          <slot />
        </div>
        <footer class="flex justify-center mt-6">
          <button
            v-if="action"
            class="py-2 px-6 border-green-500 hover:bg-gray-300 mr-4"
            @click="$emit('action')"
          >
            {{ action }}
          </button>
          <button
            class="py-2 px-6 border-red-500 hover:bg-gray-300"
            @click="close"
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  </transition>
</template>

<script>
import IconClose from "~/components/icons/Close";

export default {
  components: { IconClose },
  props: {
    active: { type: Boolean, default: false },
    title: { type: String, default: "" },
    action: { type: String, default: "" }
  },
  methods: {
    close() {
      this.$emit("update:active", false);
    }
  }
};
</script>

<style scoped>
.background {
  @apply fixed w-full h-full top-0 left-0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

button {
  @apply bg-gray-200 text-gray-700 rounded border-b-2;
}
</style>
