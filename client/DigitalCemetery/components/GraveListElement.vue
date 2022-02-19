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
  <v-card link exact :to="localePath({name: 'grave-id', params: {id: address}})" nuxt>
    <v-img
      :src="defaultThumbnail"
      contain
      height="200px"
    ></v-img>

    <v-card-title>
      {{ name }}
    </v-card-title>

    <v-card-text> <code>{{ birthISOString }}</code> - <code>{{ deathISOString }}</code> ({{ $t('aged') }} {{ age }})</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { DateTime } from "luxon";

@Component
export default class GraveListElement extends Vue {
  private defaultThumbnail = require('@/assets/default-portrait.png')

  @Prop({default: "0x0"})
  address!:string

  @Prop({default: "No Name"})
  name!:string

  @Prop({default: 0})
  birth!:number

  @Prop({default: 0})
  death!:number

  @Prop({default: "https://<portrait-url>"})
  portraitURL!:string

  get birthISOString() {
    return DateTime.fromSeconds( this.birth ).toUTC().toISODate();
  }

  get deathISOString() {
    return DateTime.fromSeconds( this.death ).toUTC().toISODate();
  }

  get age() {
    const duration = DateTime.fromSeconds( this.death ).diff(DateTime.fromSeconds( this.birth ), ['year', 'month', 'day']);
    return duration.years;
  }
}
</script>

