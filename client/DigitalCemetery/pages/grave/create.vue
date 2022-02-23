<i18n>
{
  "ja": {
    "error": {
      "only-inheritor": "管理者だけが修正することができます。",
      "before-finalized": "確定前のものだけが修正できます。"
    }
  },
  "en": {
    "error": {
      "only-inheritor": "Only inheritor can change these information.",
      "before-finalized": "You cannot modify after finalization."
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
            <v-text-field
              label="Name"
              placeholder="Name"
              :counter="256"
              v-model="nameTextField"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <date-picker-element min="1900-01-01" :initial="initialBirth" pickerLabel="Day of birth" @dateUpdate='birthTextField = $event' />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <date-picker-element min="1900-01-01" :initial="initialDeath" pickerLabel="Day of death" @dateUpdate='deathTextField = $event' />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="PortraitURL"
              placeholder="PortraitURL"
              :counter="256"
              v-model="portraitURLTextField"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Epigraph"
              placeholder="Epigraph"
              v-model="epigraphTextarea"
              outlined
              dense
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn block color="primary" v-on:click="createButtonClicked">Create</v-btn>
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

import DatePickerElement from '@/components/DatePickerElement.vue';
import { DateTime } from "luxon";

@Component({
  components: {
    DatePickerElement
  }
})

export default class GraveCreate extends Vue {
  private web3Gateway!:Web3Gateway
  private nameTextField:string = ""
  private birthTextField:string = "0000-01-01"
  private deathTextField:string = "9999-12-31"
  private portraitURLTextField:string = ""
  private epigraphTextarea:string = ""

  private initialBirth:string = "0000-01-01"
  private initialDeath:string = "9999-12-31"

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
  }

  createButtonClicked() {
    this.web3Gateway.createGrave( 
      this.nameTextField, 
      DateTime.fromSQL(this.birthTextField, {zone: "utc"}).toLocal().toSeconds(),
      DateTime.fromSQL(this.deathTextField, {zone: "utc"}).toLocal().toSeconds(),
      this.portraitURLTextField,
      this.epigraphTextarea
      )
  }
}
</script>
