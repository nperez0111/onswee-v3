export default class LocalStorage {
    static supportsLocalStorage() {
        return 'localStorage' in window;
    }
    static setItem(key, val) {
        if (this.supportsLocalStorage()) {
            localStorage.setItem(key, val);
            return true;
        }
        return false;
    }
    static getItem(key) {
        return localStorage.getItem(key) || null;
    }
    static setObj(key, val) {
        if (this.supportsLocalStorage()) {
            localStorage.setItem(key, JSON.stringify(val));
            return true;
        }
        return false;
    }
    static getObj(key) {
        if (this.supportsLocalStorage()) {
            return JSON.parse(localStorage.getItem(key));
        }
        return null;
    }
    static clear() {
        if (this.supportsLocalStorage()) {
            localStorage.clear();
        }
    }
};
