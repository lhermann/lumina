<template>
  <form
    class="w-full max-w-xl"
    name="contact"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    action="/submission-success/"
  >
    <input type="hidden" name="form-name" value="contact" />
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-xs font-bold mb-2"
          for="name"
        >
          {{ ln.name }}
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          id="name"
          name="name"
          type="text"
          placeholder="Jane"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-xs font-bold mb-2"
          for="email"
        >
          {{ ln.email }}
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          id="email"
          name="email"
          type="email"
          placeholder="hello@example.com"
          required
        />
      </div>
    </div>
    <div class="w-full mb-8">
      <label
        class="block uppercase tracking-wide text-xs font-bold mb-2"
        for="message"
      >
        {{ ln.message }}
      </label>
      <textarea
        class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-gray-500"
        id="message"
        name="message"
        type="text"
        rows="6"
        required
      />
    </div>
    <div class="text-center">
      <button
        class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6"
        type="submit"
      >
        {{ ln.send }} <icon-send />
      </button>
    </div>
  </form>
</template>

<script>
import IconSend from "~/components/icons/Class";
import { mapGetters } from "vuex";

export default {
  components: { IconSend },
  computed: {
    ...mapGetters({
      ln: "localisation/all"
    })
  }
};
</script>
