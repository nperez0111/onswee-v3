import Vue from 'vue'
import {
    Vuetify,
    VApp,
    VCard,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VParallax,
    VForm,
    VTextField,
    VCheckBox
} from 'vuetify'
import VueDragDrop from 'vue-drag-drop';
Vue.use(Vuetify, {
    components: {
        VApp,
        VCard,
        VNavigationDrawer,
        VFooter,
        VList,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        VParallax,
        VForm,
        VTextField,
        VCheckBox
    }
})
Vue.use(VueDragDrop)