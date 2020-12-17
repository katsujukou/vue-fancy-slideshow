import Vue from 'vue'

export default Vue.extend({
    name: 'FancySlideshowPart',
    render (h) {
        return h('div', {}, this.$slots.default || [])
    }
})