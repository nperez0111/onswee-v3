import Index from './'
const g = Index
const e = expect
const b = [1, null, 2, 1, 2, null, 2, 1, null]
const w = [1, 2, null, 2, 1, null, null, 2, 1]

it('knows all the possible boards that can be generated for a player', () => {
    e(g.generateMoves(1, b, 14)).toEqual([
        [null, 1, 2, 1, 2, null, 2, 1, null],
        [1, null, 2, 1, 2, null, 2, null, 1]
    ])
})
