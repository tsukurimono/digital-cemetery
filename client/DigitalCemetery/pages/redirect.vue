<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

@Component({
  components: {
  } 
})
export default class Redirect extends Vue {
    mounted() {
      console.log(this.$route.params.p);
        const query:string = typeof(this.$route.query.p) == 'string' ? this.$route.query.p : '';
      console.log(query);
        if(this.$route.query.p == '') {
            this.$router.push('/');
        }
        const uri:string = query.replace(this.$router.options.base ?? '', '/');
      console.log(uri);
      console.log(this.$router.resolve(uri));
        if(this.$router.resolve(uri).resolved.matched.length > 0) {
          console.log("before push");
            this.$router.push(uri);
          console.log("after push");
        }
        console.log("end of mounted");
    }
}
</script>