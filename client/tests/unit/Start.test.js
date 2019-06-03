import { createLocalVue, shallowMount } from '@vue/test-utils'
import Start from '../../src/components/Start.vue'
import Vuex from 'vuex'


const localVue = createLocalVue()

localVue.use(Vuex)

describe('Start.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      loadGame: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('calls store action "loadGame" when button is clicked', () => {
    const wrapper = shallowMount(Start, { store, localVue, stubs: ['router-link'] })
    wrapper.find('button').trigger('click')
    expect(actions.loadGame).toHaveBeenCalled()
  })
  it('renders the correct html', () => {
    const wrapper = shallowMount(Start, { stubs: ['router-link'] })
    expect(wrapper.html()).toContain('<img id="logo" src="../assets/IpfadodLogo.svg">')
  })
})

