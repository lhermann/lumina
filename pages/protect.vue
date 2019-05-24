<template>
  <section class="bg-white p-16">
    <h1 class="text-4xl mb-4">Encrypt with Pass Phrase</h1>
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="plaintext-input"
      >
        Plaintext
      </label>
      <input
        v-model="plaintextInput"
        class="focus:outline-none focus:shadow-outline"
        id="plaintext-input"
        type="text"
      />
    </div>
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2"
        for="cypher-input"
      >
        Cypher
      </label>
      <input
        v-model="cypherInput"
        class="focus:outline-none focus:shadow-outline"
        id="cypher-input"
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
        @click="onEncrypt"
        class="bg-green-600 hover:bg-green-700 border border-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Generate Cipher
      </button>
      <button
        @click="onDecrypt"
        class="bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white font-bold py-2 px-4 rounded"
      >
        Decrypt Cipher
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
        v-model="cipherOutput"
        class="focus:outline-none focus:shadow-outline"
        type="text"
        readonly
      />
    </div>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2">
        Plaintext
        <span class="text-gray-500 font-normal">
          Just for testing – Algorithm: AES
        </span>
      </label>
      <input
        v-model="plaintextOutput"
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
        v-model="hashOutput"
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
import utf8 from "crypto-js/enc-utf8";

export default {
  data() {
    return {
      // Input
      plaintextInput: "I am a secret",
      cypherInput: "",
      passphrase: "durian-dove-heart-3",
      // Output
      plaintextOutput: "",
      cipherOutput: "",
      hashOutput: ""
    };
  },
  methods: {
    onEncrypt() {
      this.cipherOutput = aes
        .encrypt(this.plaintextInput, this.passphrase)
        .toString();
      this.hashOutput = sha256(this.passphrase);
    },
    onDecrypt() {
      this.plaintextOutput = aes
        .decrypt(this.cypherInput, this.passphrase)
        .toString(utf8);
    }
  }
};
</script>

<style scoped>
input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
</style>
