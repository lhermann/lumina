<template>
  <nav id="header" class="w-full text-white">
    <div
      class="w-full mx-auto flex flex-wrap items-center justify-between py-2 px-16"
    >
      <nuxt-link
        class="flex items-center no-underline hover:no-underline"
        to="/"
      >
        <Logo />
        <h1 class="pl-4 font-semibold text-2xl lg:text-4xl">
          {{ pageTitle | uppercase }}
        </h1>
      </nuxt-link>
    </div>

    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>

<script>
import Logo from "./Logo";
import { mapGetters } from "vuex";

export default {
  components: { Logo },
  computed: {
    ...mapGetters({
      pageTitle: "title"
    })
  }
};
</script>
