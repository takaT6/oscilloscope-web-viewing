<template>
  <div class="home">
    <HelloWorld/>
  </div>
</template>


<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
 </script>





<!-- <script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script> -->
