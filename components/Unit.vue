<template>
  <section class="max-w-4xl">
    <p class="font-semibold text-brand-400">UNIT #{{ number }}</p>
    <h2 class="mb-6">{{ title }}</h2>
    <p class="text-lg font-light text-gray-500">{{ description }}</p>
    <section-component
      v-for="item in sections"
      :key="item.fields.number"
      :section="item"
    />
  </section>
</template>

<script>
import SectionComponent from "~/components/Section";
import get from "lodash/get";

export default {
  components: { SectionComponent },
  props: {
    unit: { type: Object, default: null }
  },
  computed: {
    number() {
      return get(this.unit, "fields.number");
    },
    title() {
      return get(this.unit, "fields.title");
    },
    description() {
      return get(this.unit, "fields.description");
    },
    sections() {
      return get(this.unit, "fields.sections");
    }
  }
};
</script>

<style scoped>
h2 {
  @apply text-4xl font-semibold leading-tight;
}
</style>
