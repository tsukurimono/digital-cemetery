<i18n>
{
  "ja": {
    "aged": "享年"
  },
  "en": {
    "aged": "aged"
  }
}
</i18n>

<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-row>
        <v-col>
          <v-card>
            <v-img
              :src="defaultThumbnail"
              contain
              height="200px"
            ></v-img>

            <v-card-title>
              {{ graveName }}
            </v-card-title>

            <v-card-text> <code>{{ graveBirth }}</code> - <code>{{ graveDeath }}</code> ({{ $t('aged') }} {{ age }})</v-card-text>
            <v-card-text> {{ graveEpigraph }} </v-card-text>
            <v-row><v-spacer/><v-col cols="1"><v-icon @click="clickButtonClicked">mdi-hands-pray</v-icon> {{ gravePrayed }} </v-col></v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

import { Web3Gateway, Grave } from "@/gateway/Web3Gateway";
import { DefaultWeb3Gateway } from "@/gateway/DefaultWeb3Gateway"; // TODO: Use Injection function.

import { DateTime } from "luxon";

@Component({
  components: {
  }
})

export default class GraveCreate extends Vue {
  private defaultThumbnail = require('@/assets/default-portrait.png')

  private web3Gateway!:Web3Gateway
  private grave:Grave|null = null

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
    await this.loadGrave();
  }

  async loadGrave() {
    this.grave = await this.web3Gateway.getGrave(this.graveAddress);
  }

  get graveAddress() {
      return this.$route.params.id;
  }

  get graveName() {
    return this.grave?.name;
  }

  get graveBirth() {
    return DateTime.fromSeconds( this.grave?.birth ?? 0 ).toUTC().toISODate();
  }

  get graveDeath() {
    return DateTime.fromSeconds( this.grave?.death ?? 0 ).toUTC().toISODate();
  }

  get gravePortraitURL() {
    return this.grave?.portraitURL;
  }

  get graveEpigraph() {
    return this.grave?.epigraph;
  }

  get gravePrayed() {
    return this.grave?.prayed;
  }

  get age() {
    const duration = DateTime.fromSeconds( this.grave?.death ?? 0 ).diff(DateTime.fromSeconds( this.grave?.birth ?? 0 ), ['year', 'month', 'day']);
    return duration.years;
  }

  clickButtonClicked() {
    console.log("clicked");
  }
}
</script>