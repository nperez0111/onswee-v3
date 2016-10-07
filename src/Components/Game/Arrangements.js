import Loggings from './Loggings.js';
import Constants from './Constants.js';

export default class Arrangements extends Loggings {
    static illegalMovements = [
        [2, 5, 6, 7, 8],
        [3, 5, 6, 7, 8],
        [0, 3, 6, 7, 8],
        [1, 2, 5, 7, 8],
        [],
        [0, 1, 3, 6, 7],
        [0, 1, 2, 5, 8],
        [0, 1, 2, 3, 5],
        [0, 1, 2, 3, 6]
    ];
    //All Impossible movements by index

    static winningArrangements = [
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [3, 4, 5]
    ];
    //All possible Winning arangements to check against

    static illegalArrangements = [
        [0, 3, 6],
        [2, 5, 8],
        [0, 1, 2],
        [6, 7, 8]
    ];
    //These arrangements including winningArrangements are illegal in rounds 6-12 if these are encountered the other player wins and a notification as to why is given

    static allPosMoveLocs = [
        [1, 3, 4],
        [0, 2, 4],
        [1, 4, 5],
        [0, 4, 6],
        [0, 1, 2, 3, 5, 6, 7, 8],
        [2, 4, 8],
        [3, 4, 7],
        [4, 6, 8],
        [4, 5, 7]
    ];
    //for the index inputted into this array all pssible locations for that position on the corresponding space on the board is given

    static corners = [0, 2, 6, 8];
    //Self explanatory

    static edges = [1, 3, 5, 7];
    //includes corners

    static center = 4;
    //center being the best position to have when playing

    static pairArrangements = [
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
    ];
    //no specific order, go through this and if any of these match try to check with next

    static pairCompleter = [
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
    ];
    //corresponding to previos pairArrangements var these are the positions to check to see if it can make a line through center

    static prefferedLocs = [0, 2, 6, 8, 3, 1, 7, 5];
    //preffered locations for placing into board 4 is checked seperately

    static trapArrangements = [
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
    ];
    static Constants = Constants;
    //rotates board clockwise
    static rotateBoardRight = [6, 2, -2, -4, 0, 4, 2, -2, -6];
    //rotates board counterClockwise
    static rotateBoardLeft = [2, 4, 6, -2, 0, 2, -6, -4, -2];
}
