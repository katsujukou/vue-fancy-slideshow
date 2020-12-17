import Vue from "vue";

export default Vue.extend({
    name: "FancySlideshowChapter",
    props: {
        title: {
            type: String,
            default: ''
        },
        noTitleSlide: Boolean,
    },
})
