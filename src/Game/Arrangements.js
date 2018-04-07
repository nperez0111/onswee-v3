import Logger from './Logger.js';
import Constants from './Constants.js';
const flips = {
        rotateBoardRight: [6, 2, -2, 4, 0, -4, 2, -2, -6],
        rotateBoardLeft: [2, 4, 6, -2, 0, 2, -6, -4, -2],
        flipHorizontal: [2, 0, -2, 2, 0, -2, 2, 0, -2],
        flipVertical: [6, 6, 6, 0, 0, 0, -6, -6, -6],
        flipTopRight: [8, 4, 0, 4, 0, -4, 0, -4, -8],
        flipTopLeft: [0, 2, 4, -2, 0, 2, -4, -2, 0],
        rotateBoardRightTwice: [8, 6, 4, 2, 0, -2, -4, -6, -8]
    },
    arrangements = {
        illegalMovements: [
            [2, 5, 6, 7, 8],
            [3, 5, 6, 7, 8],
            [0, 3, 6, 7, 8],
            [1, 2, 5, 7, 8],
            [],
            [0, 1, 3, 6, 7],
            [0, 1, 2, 5, 8],
            [0, 1, 2, 3, 5],
            [0, 1, 2, 3, 6]
        ],
        //All Impossible movements by index

        winningArrangements: [
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [3, 4, 5]
        ],
        //All possible Winning arangements to check against

        illegalArrangements: [
            [0, 3, 6],
            [2, 5, 8],
            [0, 1, 2],
            [6, 7, 8]
        ],
        //These arrangements including winningArrangements are illegal in rounds 6-12 if these are encountered the other player wins and a notification as to why is given

        allPosMoveLocs: [
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
        //for the index inputted into this array all pssible locations for that position on the corresponding space on the board is given

        corners: [0, 2, 6, 8],
        //Self explanatory

        edges: [1, 3, 5, 7],
        //includes corners

        center: 4,
        //center being the best position to have when playing
        pairCompleting: [
            4, 4, 4, 4, 8, 0, 7, 1, 6, 2, 3, 5
        ],
        //corresponds to pairarrangements to show what is being completed
        pairArrangements: [
            [0, 8],
            [1, 7],
            [2, 6],
            [3, 5],
            [0, 4],
            [4, 8],
            [1, 4],
            [4, 7],
            [2, 4],
            [4, 6],
            [3, 4],
            [4, 5]
        ],
        //no specific order, go through this and if any of these match try to check with next

        pairCompleter: [
            [1, 2, 3, 5, 6, 7],
            [0, 2, 3, 5, 6, 8],
            [0, 1, 3, 5, 7, 8],
            [0, 1, 2, 6, 7, 8],
            [5, 7],
            [1, 3],
            [6, 8],
            [0, 2],
            [3, 7],
            [1, 5],
            [2, 8],
            [0, 6]
        ],
        //corresponding to previos pairArrangements var these are the positions to check to see if it can make a line through center

        prefferedLocs: [0, 2, 6, 8, 3, 1, 7, 5],
        //preffered locations for placing into board 4 is checked seperately

        trapArrangements: [
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
        Constants: Constants,
        //rotates board clockwise
        rotateBoardRight: flips.rotateBoardRight,
        //rotates board counterClockwise
        rotateBoardLeft: flips.rotateBoardLeft,
        flipHorizontal: flips.flipHorizontal,
        flipVertical: flips.flipVertical,
        flipTopRight: flips.flipTopRight,
        flipTopLeft: flips.flipTopLeft,
        boardOrientations: Object.keys(flips).map(c => flips[c])
    }
Object.keys(arrangements).map(key => [key, ({ value: arrangements[key] })]).forEach(([key, value]) => {
    Object.defineProperty(Logger, key, value)
})
export default class Arrangements extends Logger {}