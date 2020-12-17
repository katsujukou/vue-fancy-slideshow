import Vue from 'vue'

import * as FS from './components/slideshow'
import TextHeadline from "@/components/TextHeadline"
import TextSubHeadline from "@/components/TextSubHeadline"
import TextSubSubHeadline from "@/components/TextSubSubHeadline"
import TextNormal from "@/components/TextNormal"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/styles/index.sass'

Vue.use(BootstrapVue)

library.add(fas, far, fab)
Vue.component('vue-font-awesome', FontAwesomeIcon)

Vue.component('fancy-slideshow', FS.FancySlideshow)
Vue.component('fancy-slideshow-chapter', FS.FancySlideshowChapter)
Vue.component('fancy-slideshow-slide', FS.FancySlideshowSlide)
Vue.component('fancy-slideshow-part', FS.FancySlideshowPart)
Vue.component('text-headline', TextHeadline)
Vue.component('text-sub-headline', TextSubHeadline)
Vue.component('text-sub-sub-headline', TextSubSubHeadline)
Vue.component('text-normal', TextNormal)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
