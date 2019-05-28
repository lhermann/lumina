<template>
  <section>
    <header class="max-w-4xl mx-auto mt-16 text-center">
      <h1 class="text-4xl font-bold leading-tight text-white">{{ title }}</h1>
      <div class="h-1 mx-auto bg-white w-64 opacity-25 rounded-t"></div>
    </header>

    <divider />

    <div class="bg-gray-200 pt-16 pb-32 px-8 md:px-16">
      <div class="max-w-4xl mx-auto">
        <div class="content" v-html="content"></div>
      </div>
    </div>
  </section>
</template>

<script>
import Divider from "~/components/layout/Divider";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import get from "lodash/get";

export default {
  components: { Divider },
  asyncData({ app, params, payload }) {
    if (payload) return payload;
    else app.$contentful.getEntry(params.id, { locale: app.$locale });
  },
  computed: {
    id() {
      return get(this, "sys.id", "");
    },
    title() {
      return get(this.fields, "title", "");
    },
    content() {
      return documentToHtmlString(get(this.fields, "content"));
    }
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

.video > iframe,
.video > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
