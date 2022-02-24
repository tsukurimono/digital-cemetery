<template>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';

declare global {
  interface ErrorObject {
    statusCode:number
  }
}

@Component({
  components: {}
})
export default class DefaultError extends Vue {
  @Prop({default: null})
  error!:ErrorObject

  mounted() {
    if(this.error.statusCode == 404 && this.$router.resolve(this.$route.fullPath).route.matched.length != 0) {
      this.$router.push(this.$route.fullPath);
    }
  }
}
</script>
