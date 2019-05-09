<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <IdaTestComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import IdaTestComponent from "@/components/IdaTestComponent.vue"

export default {
  name: 'home',
  components: {
    HelloWorld,
    IdaTestComponent
  }
}
</script>
