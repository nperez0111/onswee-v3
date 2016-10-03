function logMe(toCall) {
    return function(a) {
        if (this.logAll) {
            Array.from(arguments).forEach(a => toCall(a))
        }
        return a;
    }
}
export default class Loggings {
    static trackcurrent(board) {
        var bro = "|",
            brt = "|",
            br = "|";
        board.forEach((cur, i) => {
            if (i / 3 < 1) {
                bro += board[i] === 1 ? ' X ' : board[i] === null ? ' ' + i + ' ' : ' O ';
            } else if (i / 3 < 2) {
                brt += board[i] === 1 ? ' X ' : board[i] === null ? ' ' + i + ' ' : ' O ';
            } else {
                br += board[i] === 1 ? ' X ' : board[i] === null ? ' ' + i + ' ' : ' O ';
            }
        });

        bro += "|";
        brt += "|";
        br += "|";
        //TODO getname
        const whosturn = "Now it's 's turn";

        this.logger(whosturn.split("").fill('_').join(""));
        this.logger(bro, brt, br, whosturn.split("").fill('‾').join(""));
    }
    static logAll = true;

    static log() {
        return this.logger.apply(this, arguments)
    }
    static logger() {
        return logMe(a => { console.log(a) }).apply(this, arguments)
    }
    static trace() {
        return logMe(a => { console.trace(a) }).apply(this, arguments)
    }
    static warn() {
        return logMe(a => { console.warn(a) }).apply(this, arguments)
    }
}
