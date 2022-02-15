<template>
    <v-card>
        <v-img
          :src="defaultThumbnail"
          contain
          height="200px"
        ></v-img>

        <v-card-title>
          {{ name }}
        </v-card-title>

        <v-card-text> Birth: {{ birth }} </v-card-text>
        <v-card-text> Dead: {{ death }} </v-card-text>
        <v-card-text> URL: {{ portraitURL }} </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

@Component
export default class GraveListElement extends Vue {
  private defaultThumbnail = require('@/assets/default-portrait.png')

  @Prop({default: "No Name"})
  name!:string

  @Prop({default: 0})
  birth!:number

  @Prop({default: 0})
  death!:number

  @Prop({default: "https://<portrait-url>"})
  portraitURL!:string

  async mounted() {
  }
}
</script>

