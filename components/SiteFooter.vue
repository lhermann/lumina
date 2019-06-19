<template>
  <footer class="bg-white border-t">
    <div class="container mx-auto px-8">
      <div class="w-full flex items-center flex-col md:flex-row py-6">
        <div class="mb-6 mr-6">
          <nuxt-link
            to="/"
            class="flex items-center no-underline hover:no-underline"
          >
            <Logo />
            <h1 class="pl-4 font-semibold text-2xl lg:text-4xl">
              {{ pageTitle || uppercase }}
            </h1>
          </nuxt-link>
        </div>

        <div v-for="page in pages" :key="page.sys.id" class="mb-6 mr-6">
          <nuxt-link
            :to="pageUrl(page)"
            class="no-underline hover:underline text-gray-800 hover:text-green-600"
          >
            {{ page.fields.title }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Logo from "./Logo";
import { mapGetters } from "vuex";

export default {
  components: { Logo },
  computed: {
    ...mapGetters({
      pageTitle: "title",
      pages: "pages"
    })
  },
  methods: {
    pageUrl(page) {
      if (page.fields.key === "home") return "/";
      return `/pages/${page.sys.id}`;
    }
  }
};
</script>
