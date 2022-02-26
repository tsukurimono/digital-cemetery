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
        const query:string = typeof(this.$route.query.p) == 'string' ? this.$route.query.p : '';
        if(this.$route.query.p == '') {
            this.$router.push('/');
        }
        const uri:string = query.replace(this.$router.options.base ?? '', '/');
        if(this.$router.resolve(uri).resolved.matched.length > 0) {
            this.$router.push(uri);
        }
    }
}
</script>