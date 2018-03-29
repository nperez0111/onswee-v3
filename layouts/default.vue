<template>
    <v-app dark>
        <v-navigation-drawer v-model="drawer" fixed app>
            <v-list>
                <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app v-if="toolbar" color="primary">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title" @click="$router.push('/')"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="rightDrawer=!rightDrawer">
                <v-icon>settings</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <nuxt />
        </v-content>
        <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
            anything can be in here
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon light>compare_arrows</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>
<script>
export default {
    data() {
        this.$toolbar.onchange(cur => {
            this.toolbar = cur
        })
        return {
            drawer: false,
            rightDrawer: false,
            toolbar: this.$toolbar.active,
            items: [{
                icon: 'apps',
                title: 'Game',
                to: '/'
            }, {
                icon: 'toc',
                title: 'Rules',
                to: '/rules'
            }],
            title: 'Onswee'
        }
    }
}
</script>
