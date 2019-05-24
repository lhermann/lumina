<template>
  <section>
    <!--Hero-->
    <div class="pt-16 pb-3 text-white">
      <div
        class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center px-8"
      >
        <!--Left Col-->
        <div
          class="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left md:px-12"
        >
          <component
            v-for="(item, i) in content"
            :key="i"
            :is="tag(item.nodeType)"
            :class="{
              'leading-normal text-2xl': item.nodeType === 'paragraph',
              'my-4': item.nodeType === 'heading-1'
            }"
            class="leading-normal text-2xl"
          >
            {{ item.content[0].value }}
          </component>
        </div>

        <!--Right Col-->
        <div class="w-full md:w-1/2 md:px-12 text-center">
          <!-- <img class="w-full md:w-4/5 z-50" src="/hero.png" /> -->
          <img class="inline" src="/hero-illustration.svg" />
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="relative">
      <divider position="header" />
    </div>

    <!-- Units -->
    <section class="bg-gray-200 py-16">
      <div class="px-8 md:px-16">
        <header class="mb-8">
          <h1 class="my-2 text-center text-gray-800">
            Lessons
          </h1>
          <div class="h-1 mx-auto gradient w-64 opacity-25 rounded-t"></div>
        </header>
        <div class="max-w-4xl mx-auto">
          <unit
            v-for="item in units"
            :key="item.fields.number"
            class="mb-16"
            :unit="item"
          />
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="relative">
      <divider position="footer" />
    </div>

    <!-- Call to Action -->
    <section class="container mx-auto text-center text-white py-6 mb-12">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight">
        Get in contact with us
      </h1>
      <div class="w-full mb-4">
        <div
          class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"
        ></div>
      </div>

      <contactform class="mx-auto my-8 text-left" />

      <!-- <nuxt-link
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
        :to="/contact/"
        >Contact</nuxt-link
      > -->
    </section>
  </section>
</template>

<script>
import Divider from "~/components/layout/Divider";
import Unit from "~/components/Unit";
import Contactform from "~/components/Contactform";
import first from "lodash/first";
import { mapGetters } from "vuex";

export default {
  components: { Divider, Unit, Contactform },
  data() {
    return {
      content: "",
      units: []
    };
  },
  async asyncData({ app }) {
    let landing = app.$contentful.getEntries({
      locale: "ms-MY",
      content_type: "page",
      "fields.key[match]": "landing"
    });
    let units = app.$contentful.getEntries({
      locale: "ms-MY",
      content_type: "unit"
    });
    [landing, units] = await Promise.all([landing, units]);
    return {
      content: first(landing.items).fields.content.content,
      units: units.items.sort((a, b) => a.fields.number - b.fields.number)
    };
  },
  head() {
    return {
      title: this.pageTitle
    };
  },
  computed: {
    ...mapGetters({
      pageTitle: "title"
    })
  },
  methods: {
    tag(nodeType) {
      switch (nodeType) {
        case "paragraph":
          return "p";
        case "heading-1":
          return "h1";
      }
    }
  }
};
</script>

<style scoped>
h1 {
  @apply text-5xl font-bold leading-tight;
}
</style>
