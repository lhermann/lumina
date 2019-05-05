<template>
  <section>
    <!--Hero-->
    <div class="pt-16 pb-3 text-white">
      <div
        class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center px-8"
      >
        <!--Left Col-->
        <div
          class="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left md:px-12"
        >
          <component
            v-for="(item, i) in content"
            :key="i"
            :is="tag(item.nodeType)"
            :class="{
              'leading-normal text-2xl': item.nodeType === 'paragraph',
              'my-4': item.nodeType === 'heading-1'
            }"
            class="leading-normal text-2xl"
          >
            {{ item.content[0].value }}
          </component>
        </div>

        <!--Right Col-->
        <div class="w-full md:w-1/2 md:px-12 text-center">
          <!-- <img class="w-full md:w-4/5 z-50" src="/hero.png" /> -->
          <img class="inline" src="/hero-illustration.svg" />
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="relative">
      <divider />
    </div>

    <!-- Units -->
    <section class="bg-gray-200 py-16">
      <div class="px-8 md:px-16">
        <header class="mb-8">
          <h1 class="my-2 text-center text-gray-800">
            Lessons
          </h1>
          <div class="h-1 mx-auto gradient w-64 opacity-25 rounded-t"></div>
        </header>
        <div class="max-w-4xl mx-auto">
          <unit v-for="item in units" :key="item.fields.number" :unit="item" />
        </div>
      </div>
    </section>

    <hr />

    <!-- Cards -->
    <section class="bg-white py-8">
      <div class="container mx-auto flex flex-wrap pt-4 pb-12">
        <h1
          class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
        >
          Title
        </h1>
        <div class="w-full mb-4">
          <div
            class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
          ></div>
        </div>

        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div
            class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
          >
            <a href="#" class="flex flex-wrap no-underline hover:no-underline">
              <p class="w-full text-gray-600 text-xs md:text-sm px-6">
                xGETTING STARTED
              </p>
              <div class="w-full font-bold text-xl text-gray-800 px-6">
                Lorem ipsum dolor sit amet.
              </div>
              <p class="text-gray-800 text-base px-6 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
            </a>
          </div>
          <div
            class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
          >
            <div class="flex items-center justify-start">
              <button
                class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
              >
                Action
              </button>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div
            class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
          >
            <a href="#" class="flex flex-wrap no-underline hover:no-underline">
              <p class="w-full text-gray-600 text-xs md:text-sm px-6">
                xGETTING STARTED
              </p>
              <div class="w-full font-bold text-xl text-gray-800 px-6">
                Lorem ipsum dolor sit amet.
              </div>
              <p class="text-gray-800 text-base px-6 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
            </a>
          </div>
          <div
            class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
          >
            <div class="flex items-center justify-center">
              <button
                class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
              >
                Action
              </button>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div
            class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
          >
            <a href="#" class="flex flex-wrap no-underline hover:no-underline">
              <p class="w-full text-gray-600 text-xs md:text-sm px-6">
                xGETTING STARTED
              </p>
              <div class="w-full font-bold text-xl text-gray-800 px-6">
                Lorem ipsum dolor sit amet.
              </div>
              <p class="text-gray-800 text-base px-6 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
            </a>
          </div>
          <div
            class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
          >
            <div class="flex items-center justify-end">
              <button
                class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
              >
                Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider Footer -->
    <svg
      class="wave-top"
      viewBox="0 0 1439 147"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
          <!-- Change the fill to match the previous section colour -->
          <g class="wave" fill="#fff">
            <path
              d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
            ></path>
          </g>
          <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
            <g
              transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) "
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                opacity="0.200000003"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <!-- Call to Action -->
    <section class="container mx-auto text-center py-6 mb-12">
      <h1
        class="w-full my-2 text-5xl font-bold leading-tight text-center text-white"
      >
        Call to Action
      </h1>
      <div class="w-full mb-4">
        <div
          class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"
        ></div>
      </div>

      <h3 class="my-4 text-3xl leading-tight">
        Main Hero Message to sell yourself!
      </h3>

      <button
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
      >
        Action!
      </button>
    </section>
  </section>
</template>

<script>
import Divider from "~/components/layout/Divider";
import Unit from "~/components/Unit";
import first from "lodash/first";
import { mapGetters } from "vuex";

export default {
  components: { Divider, Unit },
  async asyncData({ app }) {
    let landing = app.$contentful.getEntries({
      locale: "ms-MY",
      content_type: "page",
      "fields.key[match]": "landing"
    });
    let units = app.$contentful.getEntries({
      locale: "ms-MY",
      content_type: "unit"
    });
    [landing, units] = await Promise.all([landing, units]);
    return {
      content: first(landing.items).fields.content.content,
      units: units.items
    };
  },
  head() {
    return {
      title: this.pageTitle
    };
  },
  computed: {
    ...mapGetters({
      pageTitle: "title"
    })
  },
  methods: {
    tag(nodeType) {
      switch (nodeType) {
        case "paragraph":
          return "p";
        case "heading-1":
          return "h1";
      }
    }
  }
};
</script>

<style scoped>
h1 {
  @apply text-5xl font-bold leading-tight;
}
</style>
