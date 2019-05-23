import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'
import VueRouter from 'vue-router'

describe('NavBar.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(NavBar, {
      stubs: ['router-link']
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
});
