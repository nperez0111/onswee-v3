import LocalStorage from './LocalStorage.js'

const key = "firstPageLoad"

export default class onFirstPageLoad {
    static run(fns = [], runAnyWay = false) {

        onFirstPageLoad.do(fns)

        if (LocalStorage.getItem(key) === null || runAnyWay) {

            onFirstPageLoad.toRun.forEach(a => a())
            LocalStorage.setItem(key, "true")

        }

    }
    static do(fns = []) {

        if (!Array.isArray(fns)) {

            onFirstPageLoad.toRun.push(fns)

        } else {

            onFirstPageLoad.toRun = onFirstPageLoad.toRun.concat(fns)

        }

    }
    static toRun = [() => { console.log("First time this page has been run") }]
}
