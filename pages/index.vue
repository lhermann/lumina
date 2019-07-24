<template>
  <section>
    <!--Hero-->
    <div class="pt-16 pb-3 overflow-hidden">
      <div
        class="wrapper px-3 flex flex-wrap flex-col md:flex-row items-center px-8"
      >
        <!--Left Col-->
        <div class="flex flex-col w-full md:w-1/2 justify-center items-start">
          <div
            class="hero content text-center md:text-left"
            v-html="htmlContent"
          ></div>
        </div>

        <!--Right Col-->
        <div class="w-full md:w-1/2 py-12 md:pl-16 xl:pl-24">
          <!-- <img class="inline" src="/hero-illustration.svg" /> -->
          <nuxt-link
            :to="heroUrl"
            class="block relative hero-img-wrapper px-12"
          >
            <div v-for="(image, i) in heroImages" :key="i" class="hero-img">
              <img
                class="w-full rounded shadow-xl"
                :src="image.fields.file.url"
                :alt="image.fields.description"
              />
              <div v-if="i === 0" class="hero-play">
                <icon-play :size="60" fill="white" />
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="relative">
      <divider position="header" />
    </div>

    <!-- Units -->
    <section class="bg-gray-200">
      <div class="wrapper py-16">
        <div class="px-8 md:px-16">
          <header class="mb-8">
            <h1 class="my-2 text-center text-gray-800">
              {{ ln.sections }}
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
      </div>
    </section>

    <!-- Divider -->
    <div class="relative">
      <divider position="footer" />
    </div>

    <!-- Call to Action -->
    <section class="container mx-auto text-center text-white py-6 mb-12">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight">
        {{ ln.getInContactWithUs }}
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
import IconPlay from "~/components/icons/Play";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { mapGetters } from "vuex";
import first from "lodash/first";

export default {
  components: { Divider, Unit, Contactform, IconPlay },
  data() {
    return {
      content: "",
      units: []
    };
  },
  async asyncData({ app }) {
    let landing = app.$contentful.getEntries({
      locale: app.$locale,
      content_type: "page",
      "fields.key[match]": "home"
    });
    let units = app.$contentful.getEntries({
      locale: app.$locale,
      content_type: "unit"
    });
    [landing, units] = await Promise.all([landing, units]);

    // Print unit and section names
    // const temp = units.items.sort((a, b) => a.fields.number - b.fields.number);
    // for (const unit of temp) {
    //   console.log(`Unit ${unit.fields.number} ${unit.fields.title}`);
    //   for (const section of unit.fields.sections) {
    //     console.log(`Section ${section.fields.number} ${section.fields.title}`);
    //   }
    // }

    // Print lesson names
    // let lessons = await app.$contentful.getEntries({
    //   locale: app.$locale,
    //   content_type: "lesson"
    // });
    // for (const lesson of lessons.items) {
    //   console.log(`Lesson ${lesson.fields.number} ${lesson.fields.title}`);
    // }

    return {
      content: first(landing.items).fields.content,
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
      pageTitle: "title",
      heroImages: "heroImages",
      heroLink: "heroLink",
      ln: "localisation/all"
    }),
    htmlContent() {
      return documentToHtmlString(this.content);
    },
    heroUrl() {
      return this.heroLink ? `/lessons/${this.heroLink.sys.id}` : "/";
    }
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
.hero {
  @apply text-white text-xl;
}
.hero h1 {
  @apply text-4xl font-bold leading-tight mt-0 border-0;
}

.hero-img-wrapper {
  width: 100%;
  padding-top: 56.25%;
}

.hero-img {
  @apply absolute top-0 left-0 w-full h-full bg-black rounded;
  z-index: 0;
  transition: transform 0.4s;
}
.hero-img:nth-child(1) {
  z-index: 3;
}
.hero-img:nth-child(2) {
  z-index: 2;
  transform: rotate(-3deg) translateY(8%) translateX(-9%);
}
.hero-img:nth-child(3) {
  z-index: 1;
  transform: rotate(5deg) translateY(-8%) translateX(9%);
}
.hero-img-wrapper:hover .hero-img:nth-child(1) {
  transform: scale(1.04);
}
.hero-img-wrapper:hover .hero-img:nth-child(2) {
  transform: rotate(-4deg) translateY(10%) translateX(-10%);
}
.hero-img-wrapper:hover .hero-img:nth-child(3) {
  transform: rotate(6deg) translateY(-10%) translateX(10%);
}
.hero-img > img {
  opacity: 0.6;
}
.hero-img:first-child > img {
  opacity: 1;
}

.hero-play {
  @apply absolute rounded-full p-2 z-10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
}

/*.hero p {
  @apply leading-normal text-2xl;
}*/
</style>
