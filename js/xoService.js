'use strict'

let gGame;
let gBoard;
let gDefult = 3;
let gExecut = true;



function changeBoard() {
    gGame = {
        numSquares: gDefult,
        gameSituation: true

    }
}
function gameExecute() {
    gExecut = false;
}

function gameStart() {
    let game = gGame;
    game.gameSituation = true;
    gGame = game;
}
function gameEnded() {
    let game = gGame;
    game.gameSituation = false;
    gGame = game;
}



function createMatrix() {
    let matrix = [];
    for (let i = 0; i < gDefult; i++) {
        matrix[i] = [];
        for (let j = 0; j < gDefult; j++) {
            matrix[i][j] = "0";
        }
    }
    return matrix
}
function gameStart() {

    let game = gGame;
    game.gameStart = true;
    gGame = game;

}

function buildBoard() {
    let board = [];

    for (let i = 0; i < gGame.numSquares; i++) {
        board[i] = []
        for (let j = 0; j < gGame.numSquares; j++) {
            let cell = {
                isX: false,
                isO: false,
                isMarked: false
            }
            board[i][j] = cell;

        }
    }
    return board
}




function buildBoardAfterClick(iCell, jCell, choice) {
    let board = gBoard;

    for (let i = 0; i < gGame.numSquares; i++) {
        for (let j = 0; j < gGame.numSquares; j++) {

            if (!board[i][j].isMarked) {

                let cell = {

                    ... (iCell === i && jCell === j && "X" === choice)
                    && { isX: true } || { isX: false },

                    ... ((iCell === i && jCell === j) && "O" === choice)
                    && { isO: true } || { isO: false },

                    ... (iCell === i && jCell === j) && { isMarked: true },

                    ... (iCell !== i || jCell !== j && !board[i][j].isMarked) && { isMarked: false } || { isMarked: true }

                }
                board[i][j] = cell;
            }

        }
    }
    return board
}



function addResult(iCell, jCell) {
    let board = gBoard;
    let trackersXO = {
        trackerXRow: new Array(board.length).fill(0),
        trackerORow: new Array(board.length).fill(0),
        trackerXCol: new Array(board.length).fill(0),
        trackerOCol: new Array(board.length).fill(0),
        xMainDiagonal: 0,
        oMainDiagonal: 0,
        xSecondaryDiagonal: 0,
        oSecondaryDiagonal: 0

    }

    for (let i = 0; i < board.length; i++) {

        for (let j = 0; j < board.length; j++) {

            if (board[i][j].isX) {
                trackersXO.trackerXRow[i]++
            } else if (board[i][j].isO) {
                trackersXO.trackerORow[i]++
            }

            if (board[i][j].isX && i === j) {
                trackersXO.xMainDiagonal++
            } else if (board[i][j].isO && i === j) {
                trackersXO.oMainDiagonal++
            }

            if (board[i][j].isX && i + j === board.length - 1) {
                trackersXO.xSecondaryDiagonal++
            } else if (board[i][j].isO && i + j === board.length - 1) {
                trackersXO.oSecondaryDiagonal++

            }
            if (board[j][i].isX) {
                trackersXO.trackerXCol[i]++
            } else if (board[j][i].isO) {
                trackersXO.trackerOCol[i]++
            }

        }

    }
    return trackersXO;
}

function onclickLevelButten(numOfLevel) {
    gDefult = parseInt(numOfLevel);
    changeBoard()

}
