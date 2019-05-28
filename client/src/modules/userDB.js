const axios = require('axios');

module.exports = {
    namespaced: true,
    state: {
        isLoggedIn: false
    },
    getters: {
        getIsLoggedIn(state){
            return state.isLoggedIn;
        }
    },
    mutations: {
        setUserCookieData(state, user){
            window.$cookies.set('userData', user, '1d');
        },
        setIsLoggedIn(state, boolean){
            state.isLoggedIn = boolean;
        }
    },
    actions: {
        updateUser({commit}, userDataArray){
            axios.put(
                'http://localhost:5000/users/' + userDataArray[0],
                {totalguesses: userDataArray[1], points: userDataArray[2], correctguesses: userDataArray[3]}
            ).then(res => {
                commit('setUserCookieData', res.data);
            }).catch(err => console.log("Failed to set user-cookie"));
        },
        getUser: function({commit}, username){
            return axios.get(
                'http://localhost:5000/users/'+username
            ).then(res => res.data).catch(err => err);

        },
        getTopUsers({commit}, limit){
            return axios.get(
                'http://localhost:5000/users/top/'+limit
            ).then(res => res.data).catch(err => err);
        },
        login({commit}, userDataArray){
            return axios.post("http://localhost:5000/users/auth/login", {
                username: userDataArray[0],
                password: userDataArray[1]
            }).then(res => res.data)
                .catch(err => err)
        },
        register({commit}, userDataArray){
            return axios.post("http://localhost:5000/users/auth/register", {
                username: userDataArray[0],
                password: userDataArray[1],
                email: userDataArray[2],
                role: userDataArray[4],
            }).then(res => res).catch(err => err);
        }
    }
}