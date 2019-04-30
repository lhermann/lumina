<template>
  <div class="gradient">
    <SiteHeader />
    <nuxt />
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default {
  components: { SiteHeader, SiteFooter }
};
</script>

<style>
/* style */
.gradient {
  background: linear-gradient(90deg, #04663d 0%, #30a079 100%);
}
</style>
