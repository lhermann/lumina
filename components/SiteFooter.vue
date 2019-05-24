<template>
  <footer class="bg-white border-t">
    <div class="container mx-auto px-8">
      <div class="w-full flex items-center flex-col md:flex-row py-6">
        <div class="mb-6 mr-6">
          <a class="flex items-center no-underline hover:no-underline" href="#">
            <Logo class="h-8" />
            <h1 class="pl-4 font-semibold text-2xl lg:text-4xl">
              {{ pageTitle || uppercase }}
            </h1>
          </a>
        </div>

        <div v-for="page in pages" :key="page.sys.id" class="mb-6 mr-6">
          <nuxt-link
            :to="pageUrl(page)"
            class="no-underline hover:underline text-gray-800 hover:text-green-600"
          >
            {{ page.fields.title }}
          </nuxt-link>
        </div>

        <!-- <div class="flex-1">
          <p class="uppercase text-gray-500 md:mb-6">Links</p>
          <ul class="list-reset mb-6">
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                href="#"
                class="no-underline hover:underline text-gray-800 hover:text-orange-500"
                >FAQ</a
              >
            </li>
          </ul>
        </div> -->
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
      return `pages/${page.sys.id}`;
    }
  }
};
</script>

<style scoped>
/* Styles */
</style>
