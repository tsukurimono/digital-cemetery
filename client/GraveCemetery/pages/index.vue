<template>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import Web3 from "web3";

import GraveFactoryContract from "../contracts/GraveFactory.json";

declare global {
    interface Window {
        ethereum:any;
    }

    interface ContractObject {
      networks:{[key:number]:any};
      abi:any[];
    }
}

@Component({
  components: {}
})

export default class Index extends Vue {
  private web3:Web3|null = null

  async mounted() {
    this.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await this.web3.eth.getAccounts();
    const networkId = await this.web3.eth.net.getId();
    const object:ContractObject = GraveFactoryContract;
    const deployedNetwork = object.networks[networkId];
    const instance = new this.web3.eth.Contract(object.abi, deployedNetwork.address);
    console.log(instance);
  }
}
</script>
