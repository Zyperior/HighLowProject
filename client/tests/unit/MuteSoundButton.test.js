import { createLocalVue, shallowMount } from '@vue/test-utils'
import MuteSoundButton from '../../src/components/MuteSoundButton.vue'

describe('MuteSoundButton.vue', () => {

    // When testing components who are dependent on external functionality, i.e. store
    // you can use the second param in the mounting function "options" to mock what ever
    // functionality you need. See example below.

    // Sources:
    // https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components-mutations-and-actions.html#testing-using-a-mock-store
    // https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301

    // Set the store as you need it on top-level to be used in various tests.
    const  mockStore = {

        // To check that component have called mutations the correct way, simply add a mocked
        // mutation with jest.fn() to the commit-method on the store.
        commit: jest.fn(),

        // This component also relies on a computed prop that calls the store getters, and must be
        // mocked the same way.
        getters: jest.fn()
    };

    it('commits mutation when clicked', () => {

        const wrapper = shallowMount(MuteSoundButton, // options-params
            {
            mocks:{
                // Add the mocked store
                $store: mockStore
            }
        });

        // Trigger the event
        console.log(wrapper);
        wrapper.find('button').trigger('click');
        // Check that the mutation have been called with the correct signature
        expect(mockStore.commit).toHaveBeenCalledWith('muteSound');
    });

});

