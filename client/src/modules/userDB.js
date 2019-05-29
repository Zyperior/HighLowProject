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
            window.$cookies.set('userData', user, '1d');     //Sets a cookie with user-stats/username for 1 day
        },
        setIsLoggedIn(state, boolean){
            state.isLoggedIn = boolean;    //Is there a user logged in, true/false
        }
    },
    actions: {

        //Updates a users totalguesses, points, correctguesses
        //userDataArray: [username, totalguesses, points, correctguesses]

        updateUser({commit}, userDataArray){
            axios.put(
                'http://localhost:5000/users/' + userDataArray[0],
                {totalguesses: userDataArray[1], points: userDataArray[2], correctguesses: userDataArray[3]}
            ).then(res => {
                commit('setUserCookieData', res.data);
            }).catch(err => console.log("Failed to set user-cookie"));
        },

        //Fetches a user from the DB based on username
        //Returns the fetched user or error

        getUser: function({commit}, username){
            return axios.get(
                'http://localhost:5000/users/'+username
            ).then(res => res.data).catch(err => err);

        },

        //Gets the top users ranked by points in descending order
        //limit: Amount of players

        getTopUsers({commit}, limit){
            return axios.get(
                'http://localhost:5000/users/top/'+limit
            ).then(res => res.data).catch(err => err);
        },

        //Logs in a user, server checks if password and username are correct
        //userDataArray: [username, password]
        //Returns a response with fetched user, token and admin/user-rights attached

        login({commit}, userDataArray){
            return axios.post("http://localhost:5000/users/auth/login", {
                username: userDataArray[0],
                password: userDataArray[1]
            }).then(res => res.data)
                .catch(err => err)
        },

        //Adds a user to DB
        //userDayaArray: [username, password, email, role('USER'/'ADMIN')]

        register({commit}, userDataArray){
            return axios.post("http://localhost:5000/users/auth/register", {
                username: userDataArray[0],
                password: userDataArray[1],
                email: userDataArray[2],
                role: userDataArray[3],
            }).then(res => res).catch(err => 409);
        }
    }
}