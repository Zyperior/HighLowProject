<template>
  <div id="app">
    <div id="nav">
        <p v-for="bot in bots" @click="bot.isPlaying = !bot.isPlaying">{{bot}}</p>

        <p @click="botGuesses">{{interval}}</p>
        <input v-model="guess" @keyup.enter="updateGuess(guess, {points: 0})">

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <router-view>
      
    </router-view>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
      data() {
          return {
              guess: 0,
          }
      },
      computed: {
          ...mapGetters([
              'interval',
              'bots',
              'playingBots'
          ])
      },
          methods: {
              botGuesses() {
                  this.playingBots.forEach(bot => {
                      let guess = bot.guess(this.interval);
                      this.$store.commit('updateGuess', guess);
                      console.log(bot.name + ' ' + guess)
                      if (guess > this.interval.highestGuess || guess < this.interval.lowestGuess) {
                          console.log('Outside interval ' + bot.name + ' ' + guess)
                      }
                  })
              },
              updateGuess(guess, player) {
                  console.log(guess);
                  this.$store.commit('updateGuess', Number.parseInt(guess), player)
              }
          }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>