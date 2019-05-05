<template>
  <nav id="header" class="w-full text-white">
    <div
      class="w-full mx-auto flex flex-wrap items-center justify-between py-2 px-16"
    >
      <nuxt-link
        class="flex items-center no-underline hover:no-underline"
        to="/"
      >
        <Logo class="h-8" />
        <h1 class="pl-4 font-semibold text-2xl lg:text-4xl">
          {{ pageTitle | uppercase }}
        </h1>
      </nuxt-link>

      <!-- <div class="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div> -->

      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <a class="inline-block py-2 px-4 font-bold no-underline" href="#"
              >Active</a
            >
          </li>
          <li class="mr-3">
            <a
              class="inline-block no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
              href="#"
              >link</a
            >
          </li>
        </ul>
        <button
          id="navAction"
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
        >
          Action
        </button>
      </div>
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

<style scoped>
/* Styles */
</style>
