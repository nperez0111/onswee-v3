import m from './MiniMax.js'
const e = expect

it('alllows setting and getting state', () => {
    let s = new m({ initialState: 2 })
    e(s.getState()).toBe(2)
    s.setState(3)
    e(s.getState()).toBe(3)
})

it('allows generation of a level', () => {
    let s = new m({
        initialState: 2,
        genLevel: state => (new Array(state)).fill(false).map((c, i) => i),
        rankLevel: state => state + 1,
        player: 2
    })
    expect(s.makeFirstLevel().model).toEqual({ id: "2", rank: 3, board: 2, player: 2, level: 1, shouldGenNextLevel: true })
})
it('allows generation of two levels', () => {
    let s = new m({
        initialState: 2,
        genLevel: (player, state) => (new Array(state)).fill(false).map((c, i) => i),
        rankLevel: state => state + 1,
        player: 2
    })
    const node = s.makeLevel(2)
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
    let s = new m({
        initialState: 2,
        genLevel: (player, state) => (new Array(state)).fill(false).map((c, i) => i),
        rankLevel: state => state + 1,
        player: 2
    })
    const node = s.makeLevel(3)
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
