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
