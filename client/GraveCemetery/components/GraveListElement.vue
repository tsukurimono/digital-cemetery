<template>
    <v-card>
        <v-img
          :src="defaultThumbnail"
          contain
          height="200px"
        ></v-img>

        <v-card-title>
          Top western road trips
        </v-card-title>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

@Component
export default class GraveListElement extends Vue {
  private defaultThumbnail = require('@/assets/default-portrait.png')

  async mounted() {
  }
}
</script>

