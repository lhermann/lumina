<template>
  <div class="gradient">
    <SiteHeader />
    <nuxt />
    <SiteFooter />
    <div v-html="trackingScript"></div>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default {
  components: { SiteHeader, SiteFooter },
  computed: {
    trackingScript() {
      return process.env.NUXT_ENV_TRACKING_SCRIPT || "";
    }
  }
};
</script>

<style>
/* style */
.gradient {
  background: linear-gradient(90deg, #04663d 0%, #30a079 100%);
}
</style>
