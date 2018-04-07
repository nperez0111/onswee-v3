<template>
    <v-layout class="fullwidth" wrap>
        <v-layout v-for="(val,i) in board" :key="i" :class="{flex:true, xs4:true, 'elevation-2':true,'possible-selection':selected!==null&&canBeSelected(i)}" justify-center align-center @click="performAction(i)">
            <drop @drop="handleDrop(arguments[0],i,...arguments)" class="fullwidth fullheight layout justify-center align-center">
                <drag class="fullwidth purple pa-3 text-xs-center dragger" v-if="!isEmpty(i)" :transfer-data="i" @drag="onDrag(i, ...arguments)" :draggable="!isPlacingRound&&(isFirstPlayer(i)&&player===1||isSecondPlayer(i)&&player===2)">
                    <h1 :class="{selected:isSelected(i)}">{{isEmpty(i)?'':isFirstPlayer(i)?'X':'O'}}</h1>
                </drag>
            </drop>
        </v-layout>
    </v-layout>
</template>
<script>
import Logic from '../src/Game/Logic'

export default {
    mounted() {
            window.Logic = Logic
        },
        data() {

            return {
                selected: null
            }
        },
        computed: {
            game() {
                return this.$store.state.game
            },
            board() {
                return this.game.board
            },
            turn() {
                return this.game.turn
            },
            isPlacingRound() {
                return Logic.isPlacingRound(this.turn)
            },
            isExtraRulesRound() {
                return Logic.isExtraRulesRound(this.turn)
            },
            player() {
                return Logic.getPlayer(this.turn)
            },
            canMove() {
                return this.isExtraRulesRound ? Logic.canMoveFromToWithRules : Logic.canMoveFromTo
            }
        },
        methods: {
            onDrag(index) {
                this.selected = index
            },
            handleDrop(from, to) {
                if (this.canMove(this.player, this.board, from, to)) {
                    this.$store.dispatch(this.isExtraRulesRound ? 'moveFromToWithRules' : 'moveFromTo', {
                        from,
                        to
                    })
                    this.selected = null
                }
            },
            isEmpty(i) {
                return this.board[i] === null
            },
            isFirstPlayer(i) {
                return this.board[i] === Logic.Constants.player1
            },
            isSecondPlayer(i) {
                return this.board[i] === Logic.Constants.player2
            },
            isSelected(i) {
                return (i) === this.selected
            },
            canBeSelected(index) {
                if (this.selected === null) {
                    return false
                }
                return this.canMove(this.player, this.board, this.selected, index)
            },
            performAction(index) {
                if (this.isPlacingRound && Logic.canPlaceInto(this.player, index, this.board)) {
                    this.$store.dispatch('add', {index})
                } else {
                    if (Logic.getPlayersPositions(this.player, this.board).some(pos => pos === index)) {
                        this.selected = index
                    } else if (this.selected === index) {
                        this.selected = null
                    } else if (this.canMove(this.player, this.board, this.selected, index)) {
                        this.$store.dispatch(this.isExtraRulesRound ? 'moveFromToWithRules' : 'moveFromTo', {
                            from: this.selected,
                            to: index
                        })
                        this.selected = null
                    }
                }
            }
        }
}
</script>
<style>
.selected {
    color: black !important;
}

.possible-selection {
    background-color: grey;
}

.dragger {
    border-radius: 50%;
}
</style>
