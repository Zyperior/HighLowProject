import { mount } from '@vue/test-utils'
import Rules from '../../src/views/Rules.vue'

describe('Rules', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Rules)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})