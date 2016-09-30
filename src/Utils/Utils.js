export function makeObj(keys, values) {
    var ret = {};
    if (Array.isArray(keys) && Array.isArray(values)) {
        keys.forEach((cur, i) => {
            ret[cur] = values[i];
        });

    } else {
        ret[keys] = values;
    }
    return ret;
}
export function arrayEquals(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((x, i) => {
        if (Array.isArray(x)) {
            return this.arraysEqual(x, arr2[i]);
        }
        return x === arr2[i];
    });
}
