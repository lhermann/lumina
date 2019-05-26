<template>
  <div class="attachment border-brand-500 bg-white hover:bg-gray-100">
    <a :href="url" class="flex items-center py-2 px-6">
      <span class="mr-4"><icon-attachment /></span>
      <div class="flex-1 truncate">
        {{ title }}
        <span v-if="filename" class="text-gray-500 font-semibold text-xs ml-2">
          {{ filename }}
        </span>
      </div>
      <div v-if="size" class="text-gray-500 font-semibold text-xs ml-4">
        {{ size }}
      </div>
    </a>
  </div>
</template>

<script>
import IconAttachment from "~/components/icons/Attachment";
import get from "lodash/get";
import isNumber from "lodash/isNumber";
import last from "lodash/last";

export default {
  components: { IconAttachment },
  props: {
    attachment: { type: Object, default: null }
  },
  computed: {
    title() {
      return get(this.attachment, "fields.title");
    },
    url() {
      return get(this.attachment, "fields.file.url", "");
    },
    filename() {
      return last(this.url.split("/"));
    },
    size() {
      return this.humanFileSize(
        get(this.attachment, "fields.file.details.size")
      );
    }
  },
  methods: {
    humanFileSize(size) {
      if (!isNumber(size) || size === 0) return null;
      const i = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      );
    }
  }
};
</script>

<style scoped>
.attachment {
  @apply text-gray-700 rounded border-b-2 shadow-md;
}
</style>
