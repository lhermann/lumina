<template>
  <article>
    <header class="bg-white rounded shadow-md hover:bg-gray-100">
      <button
        class="w-full flex items-center p-2 pl-4 border-t-2 border-brand-500"
        @click="onClick"
      >
        <div class="flex justify-center w-10 mr-4">
          <icon-locked class="text-gray-500" v-if="isLocked" />
          <icon-done-all class="text-green-600" v-else-if="isDone" />
          <icon-class class="text-blue-500" v-else />
        </div>
        <h3 class="flex-1 truncate text-left text-xl font-semibold">
          <span class="text-base text-gray-400 mr-2">Section {{ number }}</span>
          {{ title }}
        </h3>
        <button class="bg-gray-200 text-gray-600 py-1 px-2 rounded">
          <span v-if="isLocked">Unlock</span>
          <icon-collapse v-else-if="isExpanded" />
          <icon-expand v-else />
        </button>
      </button>
    </header>
    <ul v-if="!isLocked && isExpanded">
      <li v-for="(lesson, i) in lessons" :key="lesson.number">
        <lesson
          :lesson="lesson"
          :index="i"
          :of="lessons.length"
          :done="false"
        />
      </li>
    </ul>
    <div v-else class="ml-4">
      <div class="w-10">
        <div
          class="mx-auto relative z-10 border-l-4 h-4 border-gray-400"
          style="width: 0;"
        ></div>
      </div>
      <div class="font-semibold text-gray-400 py-1">
        <span>{{ lessonCount }} Lessons</span>
        <span v-if="pending">Loading ...</span>
      </div>
    </div>
    <modal :active.sync="modalActive" title="Unlock Section" action="Unlock">
      <label class="font-semibold" for="password">
        Enter the Passphrase for Section {{ number }}
      </label>
      <input
        v-modal="password"
        id="password"
        class="block mx-auto border border-blue-300 rounded py-2 px-3 text-grey-700 shadow-inner mt-2"
        type="password"
        size="40"
      />
    </modal>
  </article>
</template>

<script>
import Lesson from "~/components/Lesson";
import Modal from "~/components/Modal";
import IconLocked from "~/components/icons/Locked";
import IconClass from "~/components/icons/Class";
import IconDoneAll from "~/components/icons/DoneAll";
import IconExpand from "~/components/icons/Expand";
import IconCollapse from "~/components/icons/Collapse";
import get from "lodash/get";

export default {
  components: {
    Lesson,
    Modal,
    IconLocked,
    IconClass,
    IconDoneAll,
    IconExpand,
    IconCollapse
  },
  props: {
    section: { type: Object, default: null }
  },
  data() {
    return {
      isExpanded: true,
      pending: true,
      lessons: [],
      modalActive: false,
      password: ""
    };
  },
  computed: {
    isLocked() {
      return !!get(this.section, "fields.hash");
    },
    isDone() {
      return false;
    },
    number() {
      return get(this.section, "fields.number");
    },
    title() {
      return get(this.section, "fields.title");
    },
    lessonCount() {
      return get(this.section, "fields.lessons", []).length;
    }
  },
  methods: {
    onClick() {
      if (this.isLocked) {
        this.modalActive = true;
      } else {
        this.isExpanded = !this.isExpanded;
      }
    }
  },
  async created() {
    const id = get(this.section, "sys.id");
    if (id) {
      const response = await this.$contentful.getEntry(id);
      this.lessons = get(response, "fields.lessons", []);
      this.pending = false;
    }
  }
};
</script>

<style scoped>
/*button {
  @apply bg-gray-300 text-gray-600 py-1 px-3 rounded;
}*/
</style>
