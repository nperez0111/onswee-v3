<template>
    <v-layout wrap>
        <Full-Height class="grey darken-4 layout flex xs12 lg4" :full="false" :divisor="$vuetify.breakpoint.lgAndUp?1:(3/1)">
            <h1 class="display-2 text-xs-center fullwidth mt-3">Welcome to Onswee</h1>
        </Full-Height>
        <Full-Height class="blue layout flex xs12 lg8" :full="false" :divisor="$vuetify.breakpoint.lgAndUp?1:(3/2)">
            Board
        </Full-Height>
    </v-layout>
</template>
<script>
import FullHeight from '../components/Full-Height';

export default {
    mounted() {},
        data() {
            return {}
        },
        beforeDestroy() {},
        components: {
            'Full-Height': FullHeight
        }
}
</script>
<style lang="scss">
.fullwidth {
    width: 100%;
}
</style>
