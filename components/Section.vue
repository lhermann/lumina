<template>
  <article class="my-6">
    <header class="flex items-center bg-white rounded shadow-md p-2 pl-6">
      <icon-locked class="mr-4" />
      <h3 class="flex-grow">Section {{ number }} &ndash; {{ title }}</h3>
      <button class="hover:bg-gray-400">Unlock</button>
    </header>
    <ul></ul>
  </article>
</template>

<script>
import IconLocked from "~/components/icons/Locked";
import get from "lodash/get";

export default {
  components: { IconLocked },
  props: {
    section: { type: Object, default: null }
  },
  computed: {
    number() {
      return get(this.section, "fields.number");
    },
    title() {
      return get(this.section, "fields.title");
    },
    items() {
      return get(this.section, "fields.lesson");
    }
  }
  // async created() {
  //   const id = get(this.section, "sys.id");
  //   console.log({ id });
  //   if (id) {
  //     const response = await this.$contentful.getEntry(id);
  //     console.log({ response });
  //     this.response = response;
  //   }
  // }
};
</script>

<style scoped>
button {
  @apply bg-gray-300 text-gray-600 py-1 px-3 rounded;
}
</style>
