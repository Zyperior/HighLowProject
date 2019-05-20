<template>
    <div id="card-div">

        <div id="hidden" :class="{hiddenCard: flipCards}" v-if="cardsInfo.length > 3">
            <p>{{ cardsInfo[2] }}</p>
        </div>

        <div id="upper" :class="{upperCard: flipCards}">
            <p>{{ cardsInfo[1] }}</p>
        </div>

        <div id="center" :class="{centerCard: flipCards && cardsInfo.length > 2, centerCardTwoPlayers: flipCards && cardsInfo.length === 2}">
            <p>{{ cardsInfo[0] }}</p>
        </div>

        <div id="lower" :class="{lowerCard: flipCards && cardsInfo.length > 3, lowerCardThreePlayers: flipCards && cardsInfo.length === 3}"  v-if="cardsInfo.length > 2">
            <p v-if="cardsInfo.length > 3">{{ cardsInfo[cardsInfo.length - 1] }}</p>
            <p v-else>{{ cardsInfo[2] }}</p>
        </div>


        <br>
        <br>
        <button @click="startFlipCards">Flip</button>

    </div>
</template>




<script>
export default {

    props: {

    },
    
    methods: {
        
    },

    computed: {
        
    }
    
}
</script>







<style scoped>

</style>