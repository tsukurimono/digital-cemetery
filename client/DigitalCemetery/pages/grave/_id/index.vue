<i18n>
{
  "ja": {
    "aged": "享年",
    "inheritor": "管理者",
    "successor": "継承予定者",
    "you": "あなた",
    "edit": {
      "grave": "お墓を修正する",
      "finalize": "お墓を確定する",
      "finalized": "確定済み",
      "url": "画像のURLを修正する"
    }
  },
  "en": {
    "aged": "aged",
    "inheritor": "Inheritor",
    "successor": "Successor",
    "you": "You",
    "edit": {
      "grave": "Edit grave",
      "finalize": "Finalize",
      "finalized": "Finalized",
      "url": "Edit PortraitURL"
    }
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
              :src="thumbnail"
              contain
              v-on:error="isInvalidThumbnail = true"
              height="300px"
            ></v-img>

            <v-card-title>
              {{ graveName }}
            </v-card-title>

            <v-card-text> <code>{{ graveBirth }}</code> - <code>{{ graveDeath }}</code> ({{ $t('aged') }} {{ age }})</v-card-text>
            <v-card-text style="white-space: pre-line; word-wrap:break-word;"> {{ graveEpigraph }} </v-card-text>
            <v-row>
              <v-col cols="1">
                <v-menu 
                  bottom 
                  origin="center center" 
                  transition="scale-transition" 
                > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-btn 
                      v-bind="attrs" 
                      v-on="on" 
                      dense
                      text
                    ><v-icon>mdi-menu</v-icon> 
                    </v-btn> 
                  </template> 
                  <v-list> 
                    <v-list-item link exact :to="localePath({name: 'grave-id-edit', params: {id: graveAddress}})" nuxt v-if="!isFinalized"> 
                      <v-list-item-title><v-icon>mdi-pencil</v-icon>{{ $t('edit.grave') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item @click="finalizeButtonClicked" v-if="!isFinalized"> 
                      <v-list-item-title><v-icon>mdi-check-outline</v-icon>{{ $t('edit.finalize') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item v-else> 
                      <v-list-item-title><v-icon>mdi-check-outline</v-icon>{{ $t('edit.finalized') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item> 
                      <v-list-item-title><v-icon>mdi-pencil</v-icon>{{ $t('edit.url') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item> 
                      <v-divider></v-divider>
                    </v-list-item> 
                    <v-list-item> 
                      <v-list-item-title>{{ $t('inheritor') }}: <code>{{ graveInheritor }}</code> <span v-if="graveInheritor == myAddress">({{ $t('you') }})</span></v-list-item-title> 
                    </v-list-item> 
                    <v-list-item> 
                      <v-list-item-title>{{ $t('successor') }}: <code>{{ graveSuccessor }}</code> <span v-if="graveSuccessor == myAddress">({{ $t('you') }})</span></v-list-item-title> 
                    </v-list-item> 
                  </v-list> 
                </v-menu>
              </v-col>
              <v-spacer/>
              <v-col cols="1">
                <v-icon @click="clickButtonClicked">mdi-hands-pray</v-icon> {{ gravePrayed }} 
              </v-col>
            </v-row>
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
  private defaultThumbnail = "/default-portrait.png"
  private isInvalidThumbnail = false

  private web3Gateway!:Web3Gateway
  private grave:Grave|null = null
  private myAddress = ""

  private isFinalized:boolean = false

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
    await this.loadGrave();
  }

  async loadGrave() {
    this.grave = await this.web3Gateway.getGrave(this.graveAddress);
    this.myAddress = await this.web3Gateway.myAddress();
    this.isFinalized = this.grave.isFinalized;
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

  get graveInheritor() {
    return this.grave?.inheritor;
  }

  get graveSuccessor() {
    return this.grave?.successor;
  }

  get age() {
    const duration = DateTime.fromSeconds( this.grave?.death ?? 0 ).diff(DateTime.fromSeconds( this.grave?.birth ?? 0 ), ['year', 'month', 'day']);
    return duration.years;
  }

  async clickButtonClicked() {
    if(this.grave!=null) { 
      this.grave.prayed = await this.web3Gateway.pray(this.graveAddress);
    } 
  }

  get thumbnail() {
    return this.gravePortraitURL && !this.isInvalidThumbnail ? this.gravePortraitURL : this.defaultThumbnail;
  }

  finalizeButtonClicked() {
    this.web3Gateway.finalize(this.graveAddress);
  }
}
</script>