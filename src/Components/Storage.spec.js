import Storage from './Storage.js';

const e = expect;
const s = Storage;
const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return { counter: state.counter + 1 }
        case 'sub':
            return { counter: state.counter - 1 }
        default:
            return state
    }
}

it('only calls reducer when dispatched', () => {
    const func = jest.fn()
    const t = s.newStorage(func, { counter: 1 })
    e(func).not.toBeCalled()
    t.dispatch({})
    e(func).toBeCalled()
})
it('calls the reducer with proper arguments', () => {
    const func = jest.fn()
    const data = { a: 1 }
    const t = s.newStorage(func, data)

    e(func).not.toBeCalled()

    const action = { b: 2 }
    t.dispatch(action)

    e(func).toBeCalledWith(data, action)
})
it('gets proper state', () => {
    e(s.newStorage(reducer, { a: 2 }).getState().a).toBe(2)
    e(s.newStorage(reducer).getState()).toEqual({})
})

it('stores state and manipulates state', () => {
    const t = new s(reducer, { counter: 1 })
    e(t.getState().counter).toBe(1)
    t.dispatch({ type: 'add' })
    e(t.getState().counter).toBe(2)
    t.dispatch({ type: 'sub' })
    e(t.getState().counter).toBe(1)
})
it('notifies subscribers', () => {
    const data = { counter: 1 }
    const t = s.newStorage(reducer, data)
    const func = jest.fn()
    t.on('willChange', func)
    t.dispatch({})
    e(func).toBeCalled()
    e(func).toBeCalledWith(data)
})
