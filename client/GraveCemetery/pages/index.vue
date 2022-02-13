<template>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import Web3 from "web3";

declare global {
    interface Window {
        ethereum:any;
    }
}

@Component({
  components: {}
})

export default class Index extends Vue {
  private web3:Web3|null = null

  async mounted() {
    console.log(window.ethereum);
    this.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await this.web3.eth.getAccounts();
    console.log(accounts);
  }
}
</script>
