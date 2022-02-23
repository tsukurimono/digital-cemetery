<i18n>
{
  "ja": {
    "error": {
      "only-inheritor": "管理者だけが修正することができます。",
      "grave-notfound": "対象のお墓が見つかりませんでした。"
    }
  },
  "en": {
    "error": {
      "only-inheritor": "Only inheritor can change these information.",
      "grave-notfound": "Grave notfound."
    }
  }
}
</i18n>

<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-alert
              dense
              v-if="!isInheritor"
              outlined
              type="error"
            >{{ $t('error.only-inheritor') }}
            </v-alert>
            <v-alert
              dense
              v-if="graveAddress==undefined"
              outlined
              type="error"
            >{{ $t('error.grave-notfound') }}
            </v-alert>
            <v-text-field
              label="PortraitURL"
              placeholder="PortraitURL"
              :counter="256"
              v-model="portraitURLTextField"
              :disabled="!isInheritor"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn block color="primary" v-on:click="updateButtonClicked" :disabled="!isInheritor">Update</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

import { Web3Gateway, Grave } from "@/gateway/Web3Gateway";
import { DefaultWeb3Gateway } from "@/gateway/DefaultWeb3Gateway"; // TODO: Use Injection function.

@Component({
  components: {
  }
})

export default class GraveCreate extends Vue {
  private web3Gateway!:Web3Gateway
  private portraitURLTextField:string = ""

  private inheritor:string = ""

  private grave:Grave|undefined = undefined
  private myAddress = ""

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
    this.myAddress = await this.web3Gateway.myAddress();
    await this.loadGrave();
  }

  async loadGrave() {
    if(this.$route.params.id != undefined) {
      this.grave = await this.web3Gateway.getGrave(this.graveAddress);

      this.portraitURLTextField = this.grave.portraitURL;
      this.inheritor = this.grave.inheritor;
    }
  }

  get graveAddress() {
      return this.$route.params.id;
  }

  updateButtonClicked() {
    this.web3Gateway.setPortraitURL( 
      this.graveAddress,
      this.portraitURLTextField
      )
  }

  get isInheritor() {
    return this.inheritor == this.myAddress;
  }
}
</script>
