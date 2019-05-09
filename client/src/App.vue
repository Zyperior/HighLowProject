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
  </div>
</template>

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