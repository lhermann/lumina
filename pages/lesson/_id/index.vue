<template>
  <section>
    <header class="max-w-4xl mx-auto mt-16 text-center">
      <h1 class="text-4xl font-bold leading-tight text-white">{{ title }}</h1>
      <div class="h-1 mx-auto bg-white w-64 opacity-25 rounded-t"></div>
    </header>
    <div class="max-w-4xl mx-auto mt-12 bg-black">
      <iframe
        v-if="videoId"
        class="shadow-md"
        width="100%"
        height="500px"
        :src="youTubeUrl"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <divider class="-mt-64" />
    <div class="bg-gray-200 pt-32 pb-16 px-8 md:px-16">
      <div class="max-w-4xl mx-auto">
        {{ description }}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
        molestias cum perspiciatis, a nobis ipsum qui. Eius assumenda minus
        sapiente!
      </div>
    </div>
  </section>
</template>

<script>
import Divider from "~/components/layout/Divider";
import get from "lodash/get";

export default {
  components: { Divider },
  async asyncData({ app, params }) {
    return await app.$contentful.getEntry(params.id);
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
    }
  }
};
</script>

<style scoped>
/* Styles */
</style>
