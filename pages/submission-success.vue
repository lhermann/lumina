<template>
  <section class="bg-white px-16 py-48">
    <div class="flex justify-center items-center">
      <div
        class="rounded-full border-4 border-green-500 text-green-500 w-20 h-20 flex justify-center items-center"
      >
        <icon-done :size="60" />
      </div>
      <h1 class="text-4xl ml-8">{{ thankYouForYourSubmission }}</h1>
    </div>
  </section>
</template>

<script>
import IconDone from "~/components/icons/Done";

export default {
  components: { IconDone },
  computed: {
    thankYouForYourSubmission() {
      return this.$store.getters["localisation/get"](
        "thankYouForYourSubmission"
      );
    }
  }
};
</script>
