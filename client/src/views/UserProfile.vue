<template>
    <div>
    <div v-if="!loading">
        <h1 v-if="userNotFound && !loading">{{errormsg}}</h1>
        <h1 v-else-if="loading">Loading profile</h1>
        <div  v-else-if="!loading && !userNotFound">
            <Profile :user="user"></Profile>
        </div>

    </div>
    </div>
</template>
<script>
    import Profile from '../components/login/Profile.vue'
    export default {
        name: 'user-profile',
        components: {
            Profile
        },
        data(){
            return {
                user: {},
                userNotFound: true,
                loading: true
            }
        },
        props: {
            username: {
                required: true,
                type: String
            }
        },
        computed: {
            isUser() {
                return this.$cookies.get('userData').username === this.username;
            },
            errormsg() {
                return "User with username " + this.username + " not found";
            }
        },
            methods: {
                getUser() {
                    if (!this.isUser) {
                        this.$store.dispatch('userStats/getUser', this.username)
                            .then(res => {
                                if(res.username) {
                                    this.user = res;
                                    this.userNotFound = false;
                                    this.loading = false;
                                }else{
                                    this.userNotFound = true;
                                    this.loading = false;
                                    this.$router.push('/error');
                                }
                            })
                            .catch(err => {
                                this.userNotFound = true;
                                this.loading = false;
                                this.$router.push('/error');

                            })
                    } else {
                        this.user = this.$cookies.get('userData');
                        this.loading = false;
                        this.userNotFound = false;
                    }
                },
            },
        watch:{
            $route(to, from){
                this.getUser();
            }
        },
        created(){
            this.getUser();
        }
    }
</script>
<style>

</style>