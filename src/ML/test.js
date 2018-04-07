const brain = require('brain.js')

var net = new brain.NeuralNetwork();
const winningArrangements = [
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [3, 4, 5]
    ],
    allPosMoveLocs = [
        [1, 3, 4],
        [0, 2, 4],
        [1, 4, 5],
        [0, 4, 6],
        [0, 1, 2, 3, 5, 6, 7, 8],
        [2, 4, 8],
        [3, 4, 7],
        [4, 6, 8],
        [4, 5, 7]
    ],
    trapArrangements = [
        [
            [0, 2, 4],
            [1, 3, 5]
        ],
        [
            [0, 4, 6],
            [1, 3, 7]
        ],
        [
            [2, 4, 8],
            [1, 5, 7]
        ],
        [
            [4, 6, 8],
            [3, 5, 7]
        ], //end of edge traps
        [

            [1, 4, 5],
            [0, 2, 8]

        ],
        [

            [3, 4, 7],
            [0, 6, 8]
        ],
        [

            [0, 2, 6],
            [1, 3, 4]
        ],
        [

            [4, 5, 7],
            [2, 6, 8]
        ], //end of corner traps
        [
            [1, 2, 3],
            [0, 4, 5]
        ],
        [
            [0, 4, 5],
            [1, 2, 3]
        ],
        [
            [0, 1, 5],
            [2, 3, 4]
        ],
        [
            [2, 3, 4],
            [0, 1, 5]
        ],
        [
            [1, 5, 8],
            [2, 4, 7]
        ],
        [
            [2, 4, 7],
            [1, 5, 8]
        ],
        [
            [2, 5, 7],
            [1, 4, 8]
        ],
        [
            [1, 4, 8],
            [2, 5, 7]
        ],
        [
            [3, 4, 8],
            [5, 6, 7]
        ],
        [
            [5, 6, 7],
            [3, 4, 8]
        ],
        [
            [4, 5, 6],
            [3, 7, 8]
        ],
        [
            [3, 7, 8],
            [4, 5, 6]
        ],
        [
            [0, 4, 7],
            [2, 3, 6]
        ],
        [
            [2, 3, 6],
            [0, 4, 7]
        ],
        [
            [1, 4, 6],
            [0, 3, 7]
        ],
        [
            [0, 3, 7],
            [1, 4, 6]
        ] //end of side traps
    ],
    mapPlayerPositionsToObj = (positions, player) => new Array(9).fill(false).map((c, i) => positions.includes(i) ? 1 : 0).reduce((prev, cur, i) => {
        prev[player + i] = cur
        return prev
    }, {}),
    getAllOtherPossibilities = positions => subset(new Array(9).fill(false).filter((c, index) => !positions.includes(index)), 3),
    toTrainWith = (winning, losing) => [{ input: Object.assign({}, winning('firstPlayer'), losing('secondPlayer')), output: { firstPlayerWin: 1 } }, { input: Object.assign({}, winning('secondPlayer'), losing('firstPlayer')), output: { firstPlayerLose: 1 } }]

function subset(arra, arra_size) {
    var result_set = [],
        result;


    for (var x = 0; x < Math.pow(2, arra.length); x++) {
        result = [];
        i = arra.length - 1;
        do {
            if ((x & (1 << i)) !== 0) {
                result.push(arra[i]);
            }
        } while (i--);

        if (result.length === arra_size) {
            result_set.push(result);
        }
    }

    return result_set;
}

const data = winningArrangements.map(winningArrangement => {
    const winning = mapPlayerPositionsToObj.bind(this, winningArrangement)

    return getAllOtherPossibilities(winningArrangement).map(otherArrangement => {
        const losing = mapPlayerPositionsToObj.bind(this, otherArrangement.sort((a, b) => a - b))
        return toTrainWith(winning, losing)
    })
}).reduce((prev, cur) => prev.concat(cur)).reduce((prev, cur) => prev.concat(cur))
const traps = trapArrangements.map(([losingArrangement, winningArrangement]) => {
    const losing = mapPlayerPositionsToObj.bind(this, losingArrangement),
        winning = mapPlayerPositionsToObj.bind(this, winningArrangement)

    return toTrainWith(winning, losing)
}).reduce((prev, cur) => prev.concat(cur))

net.train(data.concat(traps))

var output = net.run(Object.assign({}, mapPlayerPositionsToObj([0, 2, 4], 'secondPlayer'), mapPlayerPositionsToObj([1, 3, 5], 'firstPlayer')));
console.log(JSON.stringify(net.toJSON()))