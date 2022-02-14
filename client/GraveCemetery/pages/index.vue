<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="4" v-for="n in 15" :key="n">
          <grave-list-element />
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

import { Web3Gateway } from "@/gateway/Web3Gateway";
import { DefaultWeb3Gateway } from "@/gateway/DefaultWeb3Gateway"; // TODO: Use Injection function.

import GraveListElement from '@/components/GraveListElement.vue';

@Component({
  components: {
    GraveListElement
  }
})

export default class Index extends Vue {
  private web3Gateway!:Web3Gateway

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
    console.log(await this.web3Gateway.getGraves(10,0));
  }
}
</script>
