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
            <v-alert
              dense
              v-if="!isInheritor || graveAddress==undefined"
              outlined
              type="error"
            >{{ $t('error.only-inheritor') }}
            </v-alert>
            <v-alert
              dense
              v-if="isFinalized || graveAddress==undefined"
              outlined
              type="error"
            >{{ $t('error.before-finalized') }}
            </v-alert>
            <v-text-field
              label="Name"
              placeholder="Name"
              :counter="256"
              :disabled="!isEditable"
              v-model="nameTextField"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <date-picker-element min="1900-01-01" :initial="initialBirth" pickerLabel="Day of birth" :disabled="!isEditable" @dateUpdate='birthTextField = $event' />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <date-picker-element min="1900-01-01" :initial="initialDeath" pickerLabel="Day of death" :disabled="!isEditable" @dateUpdate='deathTextField = $event' />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="PortraitURL"
              placeholder="PortraitURL"
              :counter="256"
              :disabled="!isEditable"
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
              :disabled="!isEditable"
              v-model="epigraphTextarea"
              outlined
              dense
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn block color="primary" :disabled="!isEditable" v-on:click="updateButtonClicked">Update</v-btn>
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

export default class GraveEdit extends Vue {
  private web3Gateway!:Web3Gateway
  private nameTextField:string = ""
  private birthTextField:string = ""
  private deathTextField:string = ""
  private portraitURLTextField:string = ""
  private epigraphTextarea:string = ""

  private initialBirth:string = "0000-01-01"
  private initialDeath:string = "9999-12-31"
  private inheritor:string = ""
  private isFinalized:boolean = false

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

      this.nameTextField = this.grave.name;
      this.birthTextField = this.initialBirth = DateTime.fromSeconds( this.grave.birth ).toUTC().toISODate();
      this.deathTextField = this.initialDeath = DateTime.fromSeconds( this.grave.death ).toUTC().toISODate();
      this.portraitURLTextField = this.grave.portraitURL;
      this.epigraphTextarea = this.grave.epigraph;
      this.inheritor = this.grave.inheritor;
      this.isFinalized = this.grave.isFinalized;
    }
  }

  get graveAddress() {
      return this.$route.params.id;
  }

  updateButtonClicked() {
    this.web3Gateway.updateGrave( 
      this.graveAddress,
      this.nameTextField, 
      DateTime.fromSQL(this.birthTextField, {zone: "utc"}).toLocal().toSeconds(),
      DateTime.fromSQL(this.deathTextField, {zone: "utc"}).toLocal().toSeconds(),
      this.portraitURLTextField,
      this.epigraphTextarea
      )
  }

  get isInheritor() {
    return this.inheritor == this.myAddress;
  }

  get isEditable() {
    return (this.isInheritor && !this.isFinalized) || this.grave == undefined;
  }
}
</script>
