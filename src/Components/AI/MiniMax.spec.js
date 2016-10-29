import m from './MiniMax.js'
const e = expect

it('allows generation of a level', () => {
    const expected = {
        id: "2",
        rank: 3,
        board: 2,
        player: 2,
        level: 1,
        shouldGenNextLevel: true
    }
    expect(m.makeFirstLevel({ player: 2, board: 2, levelRanker: state => state + 1 }).model).toEqual(expected)
})
it('allows generation of two levels', () => {
    const node = m.makeLevel({
        howManyDeep: 2,
        player: 2,
        board: 2,
        genLevel: (player, state) => (new Array(state)).fill(false).map((c, i) => i),
        levelRanker: a => a + 1
    })
    expect(node.model).toEqual({
        id: "2",
        rank: 3,
        board: 2,
        player: 2,
        level: 1,
        shouldGenNextLevel: true,
        children: [
            { id: "0", rank: 2, board: 0, player: 1, level: 2, shouldGenNextLevel: true },
            { "board": 1, "id": "1", "level": 2, "player": 1, "rank": 2, shouldGenNextLevel: true }
        ]
    })
})
it('allows generation of multiple level', () => {
    const node = m.makeLevel({
        howManyDeep: 3,
        player: 2,
        board: 2,
        genLevel: (player, state) => (new Array(state)).fill(false).map((c, i) => i),
        levelRanker: a => a + 1
    })
    expect(node.model).toEqual({
        id: "2",
        rank: 3,
        board: 2,
        player: 2,
        level: 1,
        shouldGenNextLevel: true,
        children: [
            { id: "0", rank: 2, board: 0, player: 1, level: 2, shouldGenNextLevel: true },
            { "board": 1, "id": "1", "level": 2, "player": 1, "rank": 2, shouldGenNextLevel: true, children: [{ id: "0", rank: 3, board: 0, player: 2, shouldGenNextLevel: true, level: 3 }] }
        ]
    })
})
