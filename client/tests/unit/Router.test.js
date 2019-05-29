import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import App from '../../src/App.vue'
import Router from 'vue-router'
import Rules from '../../src/views/Rules.vue'
import routes from '../../src/router.js'

const localVue = createLocalVue()
localVue.use(Router) 
const router = new Router({ routes })

describe('App', () => {
    it('routes to child component', () => {
        
        const wrapper = mount(App, {localVue, router})

        router.push('/rules')

        expect(wrapper.find(Rules).exists()).toBe(true)
    })
})