<template>
    <v-layout wrap>
        <Full-Height class="grey darken-4 layout flex xs12 lg4 column" :full="false" :divisor="$vuetify.breakpoint.lgAndUp?1:(3/1)">
            <h1 class="display-2 text-xs-center fullwidth mt-3">Welcome to Onswee</h1>
            <v-layout column>
                <v-flex md12>
                    <h2 class="text-xs-center">Turn: {{turn}}</h2>
                </v-flex>
                <v-layout class="mt-3">
                    <v-flex md6 :class="{'blue--text':isFirstPlayersTurn}">
                        <h2 v-text="firstPlayer.name" class="text-xs-center"></h2>
                        <h3 class="text-xs-center display-2">X</h3>
                        <h4 class="text-xs-center title">Wins: {{firstPlayer.wins}}</h4>
                    </v-flex>
                    <v-flex md6 :class="{'blue--text':!isFirstPlayersTurn}">
                        <h2 v-text="secondPlayer.name" class="text-xs-center"></h2>
                        <h3 class="text-xs-center display-2">O</h3>
                        <h4 class="text-xs-center title">Wins: {{secondPlayer.wins}}</h4>
                    </v-flex>
                </v-layout>
            </v-layout>
        </Full-Height>
        <Full-Height class="blue layout flex xs12 lg8" :full="false" :divisor="$vuetify.breakpoint.lgAndUp?1:(3/2)">
            <Board></Board>
        </Full-Height>
    </v-layout>
</template>
<script>
import FullHeight from '../components/Full-Height';
import Board from '../components/Board';
import Logic from '../src/Game/Logic';
import AI from '../src/ML/AI';
export default {
    mounted() {
            const ai = new AI({})
            window.ai = ai
        },
        data() {
            return {}
        },
        computed: {
            firstPlayer() {
                return this.$store.state.firstPlayer
            },
            secondPlayer() {
                return this.$store.state.secondPlayer
            },
            game() {
                return this.$store.state.game
            },
            turn() {
                return this.game.turn
            },
            isFirstPlayersTurn() {
                return Logic.isPlayersTurn(1, this.turn)
            }
        },
        components: {
            'Full-Height': FullHeight,
            Board
        }
}
</script>
<style lang="scss">
.fullwidth {
    width: 100%;
}
</style>
