<i18n>
{
  "ja": {
    "aged": "享年",
    "action": {
      "grave": "お墓を修正する",
      "nominate": "継承者を指定する",
      "inherit": "継承する",
      "finalize": "お墓を確定する",
      "associate": "自分に関連づける",
      "unassociate": "自分への関連を削除する",
      "url": "画像のURLを修正する",
      "information": "ステータスを表示する"
    },
    "properties": {
      "status": "お墓の状態",
      "inheritor": "管理者", 
      "successor": "継承予定者", 
      "you": "あなた", 
      "state": { 
        "editable": "修正可能", 
        "finalized": "確定済み" 
      }
    }
  },
  "en": {
    "aged": "aged",
    "action": {
      "grave": "Edit grave",
      "nominate": "Nominate",
      "inherit": "Inherit",
      "finalize": "Finalize",
      "associate": "Associate",
      "unassociate": "Unassociate",
      "url": "Edit PortraitURL",
      "information": "Show status"
    },
    "properties": {
      "status": "Grave status",
      "inheritor": "Inheritor", 
      "successor": "Successor", 
      "you": "You", 
      "state": { 
        "editable": "Editable", 
        "finalized": "Finalized" 
      }
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
            <v-row align="center">
              <v-col cols="3" class="text-left">
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
                      <v-list-item-title><v-icon>mdi-pencil</v-icon>{{ $t('action.grave') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item @click="finalizeButtonClicked" v-if="!isFinalized"> 
                      <v-list-item-title><v-icon>mdi-check</v-icon>{{ $t('action.finalize') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item link exact :to="localePath({name: 'grave-id-nominate', params: {id: graveAddress}})" nuxt v-if="isInheritor"> 
                      <v-list-item-title><v-icon>mdi-account-arrow-right</v-icon>{{ $t('action.nominate') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item @click="inheritButtonClicked" v-if="isSuccessor && !isInheritor"> 
                      <v-list-item-title><v-icon>mdi-account-arrow-left-outline</v-icon>{{ $t('action.inherit') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item @click="associateButtonClicked" v-if="!isAssociated"> 
                      <v-list-item-title><v-icon>mdi-bookmark-check</v-icon>{{ $t('action.associate') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item @click="unassociateButtonClicked" v-else> 
                      <v-list-item-title><v-icon>mdi-bookmark-off-outline</v-icon>{{ $t('action.unassociate') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item link exact :to="localePath({name: 'grave-id-editportrait', params: {id: graveAddress}})" nuxt> 
                      <v-list-item-title><v-icon>mdi-account-box-outline</v-icon>{{ $t('action.url') }}</v-list-item-title> 
                    </v-list-item> 
                    <v-list-item @click="informationButtonClicked"> 
                      <v-list-item-title><v-icon>mdi-information-outline</v-icon>{{ $t('action.information') }}</v-list-item-title> 
                    </v-list-item> 
                  </v-list> 
                </v-menu>
              </v-col>
              <v-spacer/>
              <v-col cols="3" class="text-right pr-10">
                <v-icon @click="prayButtonClicked">mdi-hands-pray</v-icon> {{ gravePrayed }} 
              </v-col>
              <v-dialog 
                v-model="showProperties" 
                width="500" 
              > 
                <v-card> 
                  <v-card-title>{{ $t('properties.status') }}</v-card-title> 
                  <v-card-text v-if="isFinalized">{{ $t('properties.state.finalized') }}</v-card-text> 
                  <v-card-text v-else>{{ $t('properties.state.editable') }}</v-card-text> 
                  <v-card-title>{{ $t('properties.inheritor') }}</v-card-title> 
                  <v-card-text><code>{{ graveInheritor }}</code> <span v-if="graveInheritor == myAddress">({{ $t('properties.you') }})</span></v-card-text> 
                  <v-card-title>{{ $t('properties.successor') }}</v-card-title> 
                  <v-card-text><code>{{ graveSuccessor }}</code> <span v-if="graveSuccessor == myAddress">({{ $t('properties.you') }})</span></v-card-text> 
                  <v-divider></v-divider> 
                  <v-card-actions> 
                    <v-spacer></v-spacer> 
                    <v-btn 
                      color="primary" 
                      text 
                      @click="showProperties = false" 
                    > 
                      Close
                    </v-btn> 
                  </v-card-actions> 
                </v-card> 
              </v-dialog>
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

export default class GraveIDIndex extends Vue {
  private defaultThumbnail = "default-portrait.png"
  private isInvalidThumbnail = false

  private showProperties:boolean = false

  private web3Gateway!:Web3Gateway
  private grave:Grave|null = null
  private myAddress = ""

  private successor:string = ""
  private inheritor:string = ""
  private isFinalized:boolean = false
  private isAssociated:boolean = false

  async mounted() {
    this.web3Gateway = await DefaultWeb3Gateway.build();
    await this.loadGrave();
  }

  async loadGrave() {
    this.grave = await this.web3Gateway.getGrave(this.graveAddress);
    this.myAddress = await this.web3Gateway.myAddress();
    this.isFinalized = this.grave.isFinalized;
    this.successor = this.grave.successor;
    this.inheritor = this.grave.inheritor;
    this.isAssociated = await this.web3Gateway.isAssociated(this.graveAddress);
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

  async prayButtonClicked() {
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

  inheritButtonClicked() {
    this.web3Gateway.inherit(this.graveAddress);
  }

  associateButtonClicked() {
    this.web3Gateway.associate(this.graveAddress);
  }

  unassociateButtonClicked() {
    this.web3Gateway.unassociate(this.graveAddress);
  }

  informationButtonClicked() {
    this.showProperties = true;
  }

  get isSuccessor() {
    return this.successor == this.myAddress;
  }

  get isInheritor() {
    return this.inheritor == this.myAddress;
  }
}
</script>