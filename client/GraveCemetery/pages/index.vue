<template>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import Web3 from "web3";

import GraveFactoryContract from "../contracts/GraveFactory.json";
import { Web3Gateway } from "../gateway/Web3Gateway";
import { DefaultWeb3Gateway } from "../gateway/DefaultWeb3Gateway"; // TODO: Use Injection function.

@Component({
  components: {}
})

export default class Index extends Vue {
  private web3Gateway!:Web3Gateway

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
    console.log(await this.web3Gateway.getGraves(10,0));
  }
}
</script>
