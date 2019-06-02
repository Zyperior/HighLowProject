import { mount } from '@vue/test-utils'
import Rules from '../../src/views/Rules.vue'

describe('Rules', () => {
  const wrapper = mount(Rules)
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders the correct html', () => {
    expect(wrapper.html()).toContain('<div class="title">Rules for High/Low</div>')
  })
  it('has not button', () => {
    expect(wrapper.contains('button')).toBe(false)
  })

})