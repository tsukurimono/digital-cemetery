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
            <date-picker-element min="1900-01-01" pickerLabel="Day of birth" @dateUpdate='birthTextField = $event' />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <date-picker-element min="1900-01-01" pickerLabel="Day of death" @dateUpdate='deathTextField = $event' />
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
            <v-btn block color="primary" dark v-on:click="createButtonClicked">Create</v-btn>
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

@Component({
  components: {
    DatePickerElement
  }
})

export default class GraveCreate extends Vue {
  private web3Gateway!:Web3Gateway
  private nameTextField:string = ""
  private birthTextField:string = ""
  private deathTextField:string = ""
  private portraitURLTextField:string = ""

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
  }

  createButtonClicked() {
    this.web3Gateway.createGrave( 
      this.nameTextField, 
      Number(Date.parse(this.birthTextField)/1000),
      Number(Date.parse(this.deathTextField)/1000),
      this.portraitURLTextField
      )
  }
}
</script>
