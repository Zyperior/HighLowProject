<template>
<div>
    <Profile :user="user"></Profile>
</div>
</template>
<script>
import Profile from '../components/login/Profile.vue'
export default{
    name: 'user-profile',
    components: {
        Profile
    },
    props: { default: true, sidebar: false},
    computed: {
        user(){
            return this.$cookies.get('userData') //ändra om man vill söka efter användare
        }
    }
}
</script>
<style scoped>

</style>