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
            <v-toolbar>
                <v-btn icon @click.stop="rightDrawer=false">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title> Settings</v-toolbar-title>
            </v-toolbar>
            <div class="px-2">
                <v-text-field v-model="firstPlayerName" label="Player 1 Name" class="mt-3"></v-text-field>
                <v-text-field v-model="secondPlayerName" label="Player 2 Name"></v-text-field>
                <v-checkbox v-model="ai" label="Enable AI"></v-checkbox>
            </div>
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
                firstPlayerName: this.$store.state.firstPlayer.name,
                secondPlayerName: this.$store.state.secondPlayer.name,
                ai: this.$store.state.ai,
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
        },
        watch: {
            firstPlayerName(newVal, oldVal) {
                this.updatePlayerName(1, newVal)
            },
            secondPlayerName(newVal, oldVal) {
                this.updatePlayerName(2, newVal)
            },
            ai(newVal, oldVal) {
                this.$store.commit('setAI', newVal)
            }
        },
        methods: {
            updatePlayerName(whichPlayer, newName) {
                this.$store.dispatch('updateName', {
                    which: whichPlayer,
                    name: newName
                })
            }
        }
}
</script>
