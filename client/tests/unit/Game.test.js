import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Game from '../../src/modules/Game.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
    state: {
        playerTurn: 0
    }
})

describe("Game"), () => {
    it('returns correct value', () => {
        const wrapper = shallowMount(Game, {
            store,
            localVue
        })

        expect(wrapper.is(0)).toBe(true)
    })  
}