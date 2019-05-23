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
        <div class="bg-gray-200 text-gray-600 py-1 px-2 rounded">
          <span v-if="isLocked">Unlock</span>
          <icon-collapse v-else-if="isExpanded" />
          <icon-expand v-else />
        </div>
      </button>
    </header>
    <ul v-if="!isLocked && isExpanded">
      <li v-for="(item, i) in lessons" :key="item.number">
        <lesson
          :lesson="item"
          :index="i"
          :of="lessons.length"
          :previous-done="lessonVisited(i - 1)"
          :next-done="lessonVisited(i + 1)"
        />
      </li>
    </ul>
    <div v-else>
      <div class="w-10 ml-4">
        <div class="w-3 mx-auto bg-white h-4 shadow-md">
          <div
            class="mx-auto relative z-10 border-l-2 h-4"
            :class="{
              'border-gray-400': !isDone,
              'border-green-500': isDone
            }"
            style="width: 0;"
          ></div>
        </div>
      </div>
      <button
        class="inline-flex items-center bg-white rounded shadow-md px-4 py-2 font-semibold hover:bg-gray-100"
        :class="{ 'text-gray-400': !isDone, 'text-green-500': isDone }"
        @click="onClick"
      >
        <icon-locked class="mr-2" v-if="isLocked" />
        <span>{{ lessonCount }} Lessons</span>
      </button>
    </div>

    <!-- Passphrase Modal -->
    <modal
      :active.sync="modalActive"
      title="Unlock Section"
      action="Unlock"
      @action="onUnlock"
    >
      <label class="font-semibold" for="password">
        Enter the Passphrase for Section {{ number }}
      </label>
      <input
        v-model="passphrase"
        id="password"
        class="block mx-auto border border-blue-300 rounded py-2 px-3 text-grey-700 shadow-inner my-2"
        type="password"
        size="40"
      />
      <div v-if="wrongPassphrase" class="text-red-500">
        <icon-close class="inline" /> Wrong Passphrase!
      </div>
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
import IconClose from "~/components/icons/Close";
import sha256 from "crypto-js/sha256";
import get from "lodash/get";
import fill from "lodash/fill";

export default {
  components: {
    Lesson,
    Modal,
    IconLocked,
    IconClass,
    IconDoneAll,
    IconExpand,
    IconCollapse,
    IconClose
  },
  props: {
    section: { type: Object, default: null }
  },
  data() {
    return {
      isExpanded: true,
      pending: true,
      lessons: this.createDummyLessons(this.lessonCount),
      modalActive: false,
      passphrase: "",
      locked: true,
      wrongPassphrase: false
    };
  },
  computed: {
    isLocked() {
      if (this.hash) return this.locked;
      return false;
    },
    isDone() {
      return this.lessons.every((a, i) => this.lessonVisited(i));
    },
    id() {
      return get(this.section, "sys.id");
    },
    number() {
      return get(this.section, "fields.number");
    },
    title() {
      return get(this.section, "fields.title");
    },
    lessonCount() {
      return get(this.section, "fields.lessons", []).length;
    },
    hash() {
      return get(this.section, "fields.hash");
    },
    storedPassphrase() {
      return this.$store.getters["auth/passphrase"](this.id);
    }
  },
  methods: {
    onClick() {
      if (this.isLocked) {
        this.modalActive = true;
      } else {
        this.isExpanded = !this.isExpanded;
      }
    },
    onUnlock() {
      if (sha256(this.passphrase).toString() === this.hash) {
        this.locked = false;
        this.modalActive = false;
        this.isExpanded = true;
        this.persistPassphrase();
      } else {
        this.wrongPassphrase = true;
      }
      this.passphrase = "";
    },
    persistPassphrase() {
      const id = get(this.section, "sys.id");
      if (id) {
        const passphrase = this.passphrase;
        // Store the passphrase for this section
        this.$store.dispatch("auth/addPassphrase", { id, passphrase });
        // store the passphrase for all lessons
        this.lessons.forEach(item => {
          const id = get(item, "sys.id");
          this.$store.dispatch("auth/addPassphrase", { id, passphrase });
        });
      }
    },
    createDummyLessons(count) {
      return fill(Array(count)).map((a, i) => ({
        number: "d" + i,
        dummy: true
      }));
    },
    lessonVisited(index) {
      if (index < 0 || index >= this.lessonCount) return false;
      const id = get(this.lessons[index], "sys.id", "");
      return this.$store.getters["progress/visited"](id);
    }
  },
  watch: {
    modalActive(newState) {
      if (!newState) this.wrongPassphrase = false;
    },
    storedPassphrase(phrase) {
      if (sha256(phrase).toString() === this.hash) this.locked = false;
    }
  },
  async mounted() {
    // Load lessons
    if (this.id) {
      const response = await this.$contentful.getEntry(this.id);
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
