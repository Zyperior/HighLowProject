const state = {
    displayExclusivePages: {
        loggedInUser: false,
        admin: false
    }
}

const getters = {
    displayExclusivePages: state => {
        return state.displayExclusivePages
    }
}

const mutations = {
    updateWhichPagesThatShouldBeVisibleToTheUser: (state, updatedLoginState) => {
        state.displayExclusivePages.loggedInUser = updatedLoginState.loggedInUser;
        state.displayExclusivePages.admin = updatedLoginState.admin;
    }
}

export default {
    state,
    getters,
    mutations
}