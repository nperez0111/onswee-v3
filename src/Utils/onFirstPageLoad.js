import LocalStorage from './LocalStorage.js'

const key = "firstPageLoad"

export default class onFirstPageLoad {
    static run(fns = [], runAnyWay = false) {
        if (!Array.isArray(fns)) {
            fns = [fns]
        }
        if (LocalStorage.getItem(key) === null || runAnyWay) {
            fns.forEach(a => a())
            LocalStorage.setItem(key, "true")
        }
    }
}
