import LocalStorage from './LocalStorage.js'

export default function memoize(f) {
    const funcName = f.name
    f.memoize = {}
    if (LocalStorage.supportsLocalStorage()) {
        const obj = LocalStorage.getObj(funcName)
        if (obj) {
            Object.keys(obj).forEach(key => { f.memoize[key] = obj[key] })
        }
    }
    return function() {
        const args = Array.prototype.slice.call(arguments)
        var str = JSON.stringify(args)

        //this is the section we're interested in
        if (str in f.memoize) {
            return f.memoize[str]
        } else {
            f.memoize[str] = f.apply(this, args)
            LocalStorage.setObj(funcName, f.memoize[str])
            return f.memoize[str]
        }
    };
}
