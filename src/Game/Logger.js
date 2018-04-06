function logMe(toCall) {
    return function (a) {
        if (this.logAll) {
            Array.from(arguments).forEach(a => toCall(a))
        }
        return a;
    }
}
class Loggings {

    static trackcurrent(board) {
        var firstLine = "|",
            secondLine = "|",
            thirdLine = "|";
        board.forEach((cur, i) => {
            if (i / 3 < 1) {
                firstLine += board[i] === 1 ? ' X ' : board[i] === null ? ' ' + i + ' ' : ' O ';
            } else if (i / 3 < 2) {
                secondLine += board[i] === 1 ? ' X ' : board[i] === null ? ' ' + i + ' ' : ' O ';
            } else {
                thirdLine += board[i] === 1 ? ' X ' : board[i] === null ? ' ' + i + ' ' : ' O ';
            }
        });

        firstLine += "|";
        secondLine += "|";
        thirdLine += "|";
        //TODO getname
        const whosturn = "Now it's 's turn",
            line = whosturn.split("").fill('_').join("")

        this.logger(line, firstLine, secondLine, thirdLine, line);
        return board
    }

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

Object.defineProperties(Loggings, {
    logAll: {
        value: true
    }
})

export default Loggings