<template>
  <section>
    <header class="max-w-4xl mx-auto mt-16 text-center">
      <h1 class="text-4xl font-bold leading-tight text-white">{{ title }}</h1>
      <div class="h-1 mx-auto bg-white w-64 opacity-25 rounded-t"></div>
    </header>
    <div class="relative">
      <div
        class="video max-w-4xl mx-auto mt-12 bg-black relative z-20 shadow-md"
      >
        <iframe
          v-if="videoId"
          class="z-30"
          :src="
            `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&rel=0&cc_load_policy=1`
          "
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div
          v-else-if="videoIdMissing"
          class="flex items-center justify-center z-20"
        >
          <div class="text-gray-700 text-xl2 font-bold text-center">
            <div class="mx-auto">
              <icon-close :size="60" />
            </div>
            <p>Missing Video</p>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 w-full z-10">
        <divider />
      </div>
    </div>
    <div class="bg-gray-200 pt-16 pb-32 px-8 md:px-16">
      <div class="max-w-4xl mx-auto">
        <div v-if="attachments.length" class="mb-10">
          <attachment
            v-for="item in attachments"
            :key="item.sys.id"
            :attachment="item"
          />
          <div
            v-if="isProtected"
            class="flex items-center text-sm text-gray-600 mt-2"
          >
            <span class="mr-3"><icon-locked :size="16"/></span>
            <span class="mr-3">Passphrase for attachments:</span>
            <input
              :value="storedPassphrase"
              class="border rounded py-1 px-2 text-gray-700 my-2"
              size="32"
              readonly
              ref="passphrase"
              @click="$refs.passphrase.select()"
            />
          </div>
        </div>
        <div v-if="description" class="text-xl font-light text-gray-700 mb-16">
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
          >
            <icon-back />
          </nuxt-link>
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
import IconLocked from "~/components/icons/Locked";
import IconClose from "~/components/icons/Close";
import get from "lodash/get";
import aes from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";

export default {
  components: {
    Divider,
    SectionComponent,
    Attachment,
    IconBack,
    IconLocked,
    IconClose
  },
  async asyncData({ app, params, payload }) {
    // fetch lesson
    let lesson;
    if (payload) lesson = Promise.resolve(payload);
    else lesson = app.$contentful.getEntry(params.id, { locale: app.$locale });

    // fetch section
    let section = app.$contentful.getEntries({
      links_to_entry: params.id,
      locale: app.$locale
    });

    // await both
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
    title() {
      return get(this.fields, "title", "");
    },
    storedPassphrase() {
      return this.$store.getters["auth/passphrase"](this.id);
    },
    isProtected() {
      return get(this.fields, "protected", false);
    },
    description() {
      return get(this.fields, "description", "");
    },
    videoIdMissing() {
      return !get(this.fields, "youTubeVideoId");
    },
    videoId() {
      let videoId = get(this.fields, "youTubeVideoId", "");
      if (this.isProtected) {
        videoId = this.storedPassphrase
          ? aes.decrypt(videoId, this.storedPassphrase).toString(utf8)
          : null;
      }
      return videoId;
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
