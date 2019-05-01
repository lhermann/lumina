<template>
  <section class="bg-white p-16">
    <h1 class="text-4xl mb-4">Encrypt with Pass Phrase</h1>
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="plaintext"
      >
        Plaintext
      </label>
      <input
        v-model="plaintext"
        class="focus:outline-none focus:shadow-outline"
        id="plaintext"
        type="text"
      />
    </div>
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="passphrase"
      >
        Passphrase
      </label>
      <input
        v-model="passphrase"
        class="focus:outline-none focus:shadow-outline"
        id="passphrase"
        type="text"
      />
    </div>
    <div class="mb-4">
      <button
        @click="onGenerate"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Cipher
      </button>
    </div>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2">
        Cipher
        <span class="text-gray-500 font-normal">
          Use this to encrypt YouTube IDs – Algorithm: AES
        </span>
      </label>
      <input
        v-model="cipher"
        class="focus:outline-none focus:shadow-outline"
        type="text"
        readonly
      />
    </div>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2">
        Passphrase Hash
        <span class="text-gray-500 font-normal">
          Copy this one into the section – Algorithm: SHA256
        </span>
      </label>
      <input
        v-model="hash"
        class="focus:outline-none focus:shadow-outline"
        type="text"
        readonly
      />
    </div>
  </section>
</template>

<script>
import sha256 from "crypto-js/sha256";
import aes from "crypto-js/aes";

export default {
  data() {
    return {
      plaintext: "I am a secret",
      cipher: "",
      passphrase: "durian-dove-heart-3",
      hash: ""
    };
  },
  methods: {
    onGenerate() {
      this.cipher = aes.encrypt(this.plaintext, this.passphrase).toString();
      this.hash = sha256(this.passphrase);
    }
  }
};
</script>

<style scoped>
input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
</style>
