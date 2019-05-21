<template>
    <div id="card-div">

        <div :class="{upperCard: flipCards && cardsInfo.length > 3, upperCardThreePlayers: flipCards && cardsInfo.length === 3}">
            <p v-if="cardsInfo.length > 3">{{ cardsInfo[cardsInfo.length - 1] }}</p>
            <p v-else>{{ cardsInfo[2] }}</p>
        </div>

        <div :class="{centerCard: flipCards}">
            <p>{{ cardsInfo[0] }}</p>
        </div>

        <div :class="{lowerCard: flipCards}">
            <p>{{ cardsInfo[1] }}</p>
        </div>

        <div :class="{hiddenCard: flipCards}" v-if="cardsInfo.length > 3">
            <p>{{ cardsInfo[2] }}</p>
        </div>


        <br>
        <br>
        <button @click="startFlipCards">Flip</button>

    </div>
</template>




<script>
export default {
    
    methods: {
        
    },

    computed: {
        
    }
    
}
</script>







<style scoped>

</style>