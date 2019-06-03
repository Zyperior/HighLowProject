import { createLocalVue, shallowMount } from '@vue/test-utils'
import MuteSoundButton from '../../src/components/MuteSoundButton.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)


describe('MuteSoundButton.vue', () => {

    let mutations
    let store
  
    beforeEach(() => {
      mutations = {
        muteSound: jest.fn()
      }
      store = new Vuex.Store({
        mutations
      })
    })


    it('commits mutation when clicked', () => {

        const wrapper = shallowMount(MuteSoundButton, { store, localVue })

        // Trigger the event
        wrapper.find('img').trigger('click');
        // Check that the mutation have been called with the correct signature
        expect(mutations.muteSound).toHaveBeenCalled();
    })

})
