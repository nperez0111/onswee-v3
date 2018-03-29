import memoize from './memoizer.js'
const e = expect
const store = {}
const localStorageMock = {
    getItem: a => a == 'b' ? JSON.stringify({ '["a"]': 2 }) : store[a] || null,
    setItem: (name, obj) => { store[name] = obj },
    clear: jest.fn()
}
global.localStorage = localStorageMock
global.window.localStorage = localStorageMock

it('calls all the right functions', () => {
    var i = 0
    const a = function () {
        return i
    }
    const mem = memoize(a)
    expect(mem(0)).toBe(0)
    i++
    expect(mem(0)).toBe(0)
    expect(mem(1)).toBe(1)
})

it('loads from localStorage', () => {
    var i = 0
    const b = function () {
        return i
    }
    const mem = memoize(b)
    expect(mem('a')).toBe(2)
})