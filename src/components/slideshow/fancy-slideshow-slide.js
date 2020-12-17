import Vue from 'vue'

export default Vue.extend({
    name: "FancySlideshowSlide",
    props: {
        title: String,
        noTitle: Boolean,
        backgroundImage: String,
    },
    methods: {
        /**
         *
         * @param {CreateElement} h
         * @returns {null|VNode}
         * @private
         */
        __renderHeader (h) {
            if (this.noTitle) {
                return null
            }

            return　h('div', {
                staticClass: 'fancy-slideshow__slide-header'
            }, [
                (this.$scopedSlots.header !== undefined)
                    ? this.$scopedSlots.header(this.title)
                    : this.title
            ])
        }
    },
    render (h) {
        return h('div', {
            staticClass: 'fancy-slideshow__slide'
        }, [
            this.__renderHeader(h),
            ...(this.$slots.default || [])
        ])
    }
})
