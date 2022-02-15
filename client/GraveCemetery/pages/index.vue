<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="4" v-for="(item,index) in graves" :key="index">
          <grave-list-element 
            :name="item.name"
            :birth="item.birth"
            :death="item.death"
            :portraitURL="item.portraitURL"
          />
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

import { Web3Gateway, Grave } from "@/gateway/Web3Gateway";
import { DefaultWeb3Gateway } from "@/gateway/DefaultWeb3Gateway"; // TODO: Use Injection function.

import GraveListElement from '@/components/GraveListElement.vue';

@Component({
  components: {
    GraveListElement
  }
})

export default class Index extends Vue {
  private web3Gateway!:Web3Gateway
  readonly PER_PAGE:number = 24;
  private pageIndex:number = 0;
  private graves:Array<Grave> = []

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
    this.loadGraves();
  }

  async loadGraves() {
    this.graves = await this.web3Gateway.getGraves(this.PER_PAGE, this.pageIndex * this.PER_PAGE);
  }

  @Watch('pageIndex')
  private onPageIndexChanged(val:number, oldVal:number) {
    this.loadGraves();
  }
}
</script>
