import Vue from "vue";
import {capitalize} from "@/utils/string";
import {sleep} from "@/utils/async";

const transition = {
    up: 'fs-transition--slide-up',
    down: 'fs-transition--slide-down',
    left: 'fs-transition--slide-left',
    right: 'fs-transition--slide-right',
}

export default Vue.extend({
    name: "FancySlideshow",
    props: {
        slideshowTitle: String,
        showSlideshowTitle: Boolean,
        showControlPanel: {
            type: Boolean,
            default: true
        },
        controlPanelPosition: {
            type: String,
        },
        slideshowTitlePosition: {
            type: String,
        },
        backgroundImage: String,
    },
    data () {
        return {
            page: 0,
            section: [],

            controlBtnStatus: {
                up: { highlight: false, active: false, disabled: true },
                down: { highlight: false, active: false, disabled: true },
                left: { highlight: false, active: false, disabled: false },
                right: { highlight: false, active: false, disabled: false },
            },

            transitionName: undefined,
        }
    },
    computed: {
        classes () {
            return 'fancy-slideshow '
        },
        acceptedTagNames () {
            return ['fancy-slideshow-chapter', 'fancy-slideshow-slide']
        },
        /**
         *
         * @returns {VNode[]}
         */
        validSlideNodes () {
            return this.$slots.default.filter(vnode => {
                const tag = vnode.componentOptions.tag
                return this.acceptedTagNames.includes(tag)
            })
        },
        currentChapterLength () {
            const currentNode = this.validSlideNodes[this.page]
            if (currentNode.componentOptions.tag === 'fancy-slideshow-slide') {
                return 1
            }
            else if (currentNode.componentOptions.tag === 'fancy-slideshow-chapter') {
                return currentNode.componentOptions.children
                    ?.filter(childNode => childNode.componentOptions.tag === 'fancy-slideshow-slide')
                    ?.length + (currentNode.componentOptions.propsData.noTitleSlide ? 0 : 1)
            }
        },
        nextPageTransition () {
            return 'fs-transition--slide-right'
        },
        prevPageTransition () {
            return 'fs-transition--slide-left'
        }
    },
    watch: {
        page (v) {
            this.__updateControlBtnStatus(v)
        }
    },
    methods: {
        __setContext () {
            this.__unsetContext()

            const ctx = {
                /**
                 *
                 * @param {KeyboardEvent} evt
                 */
                onKeydown: (evt) => {
                    const key2Dir = {
                        'ArrowUp': 'up',
                        'ArrowDown': 'down',
                        'ArrowLeft': 'left',
                        'ArrowRight': 'right',
                    }

                    if (key2Dir[evt.key] === undefined) return

                    this.keydownHandler(key2Dir[evt.key], evt)
                }
            }

            this.__fancySlideshowCtx = ctx
            document.addEventListener('keydown', ctx.onKeydown)
        },
        __unsetContext () {
            if (this.__fancySlideshowCtx !== undefined) {
                document.removeEventListener('keydown', this.__fancySlideshowCtx.onKeydown)
                this.__fancySlideshowCtx = undefined
            }
        },

        __setSections () {
            this.$set(
                this.$data,
                'section',
                [...new Array(this.validSlideNodes.length)].map(_ => 0)
            )
        },
        __updateTransitionName (dir) {
            this.transitionName = transition[dir]
        },
        /**
         *
         * @param {'up'|'right'|'down'|'left'} dir
         * @param {KeyboardEvent} evt
         */
        keydownHandler (dir, evt) {
            if (this.controlBtnStatus[dir].disabled) return

            this.$refs[`controlBtn${capitalize(dir)}`].click()
        },

        /**
         *
         * @param {'up'|'right'|'down'|'left'} dir
         * @param {MouseEvent} evt
         */
        controlBtnClickHandler (dir, evt) {
            this.__updateTransitionName(dir)

            switch (dir) {
                case "up":
                    return this.prevSection()

                case "down":
                    return this.nextSection()

                case "left":
                    return this.prevPage()

                case "right":
                    return this.nextPage()
            }
        },
        prevPage () {
            this.__movePage(-1)
        },
        nextPage () {
            this.__movePage(+1)
        },
        prevSection () {
            this.__moveSection(-1)
        },
        nextSection () {
            this.__moveSection(+1)
        },

        __movePage (count) {
            const newPage = this.page + count
            this.page = Math.min(Math.max(newPage, 0), this.validSlideNodes.length - 1)
        },
        __moveSection(count) {
            const newSection = this.section[this.page] + count
            this.section[this.page] = Math.min(Math.max(newSection, 0), this.currentChapterLength - 1)
            this.__updateControlBtnStatus(this.page, newSection)
        },

        __resetControlBtnStatus () {
            this.$set(this.$data, 'controlBtnStatus', {
                up: { highlight: false, active: false, disabled: true },
                down: { highlight: false, active: false, disabled: true },
                left: { highlight: false, active: false, disabled: false },
                right: { highlight: false, active: false, disabled: false },
            })
        },

        __calcChapterLength (p) {
            const currentNode = this.validSlideNodes[p]
            if (currentNode.componentOptions.tag === 'fancy-slideshow-slide') {
                return 1
            }
            else if (currentNode.componentOptions.tag === 'fancy-slideshow-chapter') {
                return currentNode.componentOptions.children
                    ?.filter(childNode => childNode.componentOptions.tag === 'fancy-slideshow-slide')
                    ?.length + (currentNode.componentOptions.propsData.noTitleSlide ? 0 : 1)
            }
        },

        /**
         *
         * @param {?number} pg
         * @param {?number} sec
         * @private
         */
        __updateControlBtnStatus (pg=undefined, sec=undefined) {
            const page = pg || this.page
            const section = sec || this.section[page]
            this.__resetControlBtnStatus()

            if (page === 0) {
                this.controlBtnStatus.left.disabled = true
            }
            else if (page >= this.validSlideNodes.length - 1) {
                this.controlBtnStatus.right.disabled = true
            }

            if (section > 0) {
                this.controlBtnStatus.up.disabled = false
            }

            if (section < this.__calcChapterLength(page) - 1) {
                this.controlBtnStatus.down.disabled = false
            }
        },

        /**
         *
         * @param {CreateElement} h
         * @param {VNode} vnode
         * @return {VNode}
         * @private
         */
        __renderChapter (h, vnode) {
            const section = this.section[this.page]
            const titleSlide = vnode.componentOptions.propsData.noTitleSlide === true
                ? []
                : [
                    h('fancy-slideshow-slide', {
                        props: {
                            noTitle: true
                        }
                    }, [
                        vnode.componentOptions.propsData.title
                    ])
                ]

            const chapterSlides = [
                ...titleSlide,
                ...vnode.componentOptions.children
            ]

            return ('div', {
                staticClass: 'fancy-slideshow__chapter',
            }, [
                chapterSlides[section]
            ])
        },

        /**
         *
         * @param {CreateElement} h
         * @private
         */
        __renderCurrentPage(h) {
            const currentPage = this.validSlideNodes[this.page]

            currentPage.key = `fancy-slideshow--${this.page}`

            return h('div', {
                staticClass: 'fancy-slideshow__page-container'
            }, [
                currentPage.componentOptions.tag === 'fancy-slideshow-slide'
                    ? currentPage
                    : this.__renderChapter(h, currentPage)
            ])
        },
        /**
         * 
         * @param {CreateElement} h
         * @return {VNode} 
         */
        __renderControl (h) {
            const controlPanel = {
                up: { icon: 'angle-up', style: { transform: 'translate(72px, 0)' } },
                right: { icon: 'angle-right', style: { transform: 'translate(144px, 72px)' } },
                down: { icon: 'angle-down', style: { transform: 'translate(72px, 144px)' } },
                left: { icon: 'angle-left', style: { transform: 'translate(0, 72px)' } },
            }

            const renderBtn = (dir) => {
                return h('div', {
                    staticClass: 'fancy-slideshow__control-panel-btn',
                    class: {
                        'is-highlighted': this.controlBtnStatus[dir].highlight,
                        'is-active': this.controlBtnStatus[dir].active,
                        'is-disabled': this.controlBtnStatus[dir].disabled,
                    },
                    style: controlPanel[dir].style,
                    on: {
                        click: async (evt) => {
                            this.controlBtnStatus[dir].highlight = true
                            await sleep(80)
                            this.controlBtnStatus[dir].active = true

                            setTimeout(async () => {
                                this.controlBtnStatus[dir].active = false
                                await sleep(80)
                                this.controlBtnStatus[dir].highlight = false
                            }, 80)

                            await sleep(320)

                            this.controlBtnClickHandler(dir, evt)
                        }
                    },
                    ref: `controlBtn${capitalize(dir)}`
                }, [
                    h('vue-font-awesome', {
                        props: {
                            icon: controlPanel[dir].icon
                        }
                    })
                ])
            }

            return h('div', {
                staticClass: 'fancy-slideshow__control-panel'
            }, [
                'up',
                'down',
                'right',
                'left'
                ].map(renderBtn)
            )
        },
    },
    mounted () {
        this.__setContext()
        this.__setSections()
        this.__updateControlBtnStatus(0, 0)
    },
    beforeDestroy() {
        this.__unsetContext()
    },
    render (h) {
        return h('div', {
            staticClass: this.classes,
        }, [
            h('transition', {
                props: {
                    name: this.transitionName,
                }
            }, [
                this.__renderCurrentPage(h),
            ]),
            this.__renderControl(h)
        ])
    }
})
