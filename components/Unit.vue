<template>
  <section>
    <p class="font-semibold text-brand-400">{{ lnUnit }} #{{ number }}</p>
    <h2 class="text-4xl font-semibold leading-tight mb-4">{{ title }}</h2>
    <p class="text-lg font-light text-gray-600 mb-6">{{ description }}</p>
    <section-component
      class="mb-6"
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
    },
    lnUnit() {
      return this.$store.getters["localisation/get"]("unit").toUpperCase();
    }
  }
};
</script>
