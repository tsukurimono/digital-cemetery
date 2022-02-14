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
        <v-card-text> Dead: {{ dead }} </v-card-text>
        <v-card-text> URL: {{ portraitURL }} </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class GraveListElement extends Vue {
  private defaultThumbnail = require('@/assets/default-portrait.png')

  @Prop()
  name:string = "No Name"

  @Prop()
  birth:number = 0

  @Prop()
  dead:number = 0

  @Prop()
  portraitURL:string = "https://<portrait-url>"

  async mounted() {
  }
}
</script>

