<template>
  <section>
    <header class="max-w-4xl mx-auto mt-16 text-center">
      <h1 class="text-4xl font-bold leading-tight text-white">{{ title }}</h1>
      <div class="h-1 mx-auto bg-white w-64 opacity-25 rounded-t"></div>
    </header>
    <div class="video max-w-4xl mx-auto mt-12 bg-black relative x-10 shadow-md">
      <iframe
        v-if="videoId"
        :src="youTubeUrl + '?rel=0&modestbranding=1&rel=0&cc_load_policy=1'"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <divider class="-mt-64" />
    <div class="bg-gray-200 pt-40"></div>
    <div class="bg-gray-200 pb-32 px-8 md:px-16">
      <div class="max-w-4xl mx-auto">
        <div class="mb-16">
          <attachment
            v-for="item in attachments"
            :key="item.sys.id"
            :attachment="item"
          />
        </div>
        <div class="text-xl font-light text-gray-700 mb-16">
          {{ description }}
        </div>
      </div>

      <hr class="border-b-1 bg-gray-400 mb-16 h-px" />

      <div class="max-w-4xl mx-auto">
        <section-component class="mb-16" :section="section" />
        <div class="flex flex-between">
          <nuxt-link
            class="bg-white text-gray-700 rounded border-b-2 py-2 px-6 border-brand-500 hover:bg-gray-100 shadow-md"
            to="/"
            ><icon-back
          /></nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Divider from "~/components/layout/Divider";
import SectionComponent from "~/components/Section";
import Attachment from "~/components/Attachment";
import IconBack from "~/components/icons/Back";
import get from "lodash/get";

export default {
  components: { Divider, SectionComponent, Attachment, IconBack },
  async asyncData({ app, params }) {
    let lesson = app.$contentful.getEntry(params.id);
    let section = app.$contentful.getEntries({ links_to_entry: params.id });
    [lesson, section] = await Promise.all([lesson, section]);
    return {
      ...lesson,
      section: section.items.length ? section.items[0] : null
    };
  },
  computed: {
    id() {
      return get(this, "sys.id", "");
    },
    storedPassphrase() {
      return this.$store.getters["auth/passphrase"](this.id);
    },
    title() {
      return get(this.fields, "title", "");
    },
    description() {
      return get(this.fields, "description", "");
    },
    videoId() {
      return get(this.fields, "youTubeVideoId", "");
    },
    youTubeUrl() {
      return `https://www.youtube-nocookie.com/embed/${this.videoId}`;
    },
    attachments() {
      return get(this.fields, "attachments", []);
    }
  },
  mounted() {
    this.$store.dispatch("progress/addId", this.id);
  }
};
</script>

<style scoped>
.video::before {
  content: "";
  display: block;
  width: 100%;
  padding-bottom: 56.25%;
}

.video > iframe {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
