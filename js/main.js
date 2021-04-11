


function init() {
    if (gExecut) {
        changeBoard()
        gBoard = buildBoard()
        gameExecute();
    }
    if (gGame.gameSituation) {
        changeBoard()
        gBoard = buildBoard()
        renderBoard()

    }
    gBoard = buildBoard()

    renderBoard()
}


function renderBoard() {
    let board = gBoard;
    let strHTML = "";
    let = cellContent = "";
    for (let i = 0; i < gGame.numSquares; i++) {

        strHTML += "<tr>\n";

        for (let j = 0; j < gGame.numSquares; j++) {
            let cell = board[i][j];
            if (cell.isMarked) {
                if (cell.isX) {
                    cellContent = `<i class="fas fa-times fa-5x"></i>`
                } else {
                    cellContent = `<i class="far fa-circle fa-5x"></i>`
                }
            }
            strHTML += `\t<td class="cell" data-i=${i}  data-j=${j}
            oncontextmenu="cellClicked(this, ${i}, ${j},event)"
            onclick="cellClicked(this, ${i}, ${j},event)"><div class="iconXOcontainer">${cellContent}</div></td>\n`;
            cellContent = ""

        }
    }
    let elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML;


}

function cellClicked(el, i, j, event) {
    let board = gBoard;
    if (board[i][j].isMarked) {
        modal('the cell is marked')
        return

    } else {
        if (1 === event.which) {
            buildBoardAfterClick(i, j, "X")
            checkResult(addResult(i, j, "X"))


        } else if (3 === event.which) {
            buildBoardAfterClick(i, j, "O")
            addResult(i, j)
            checkResult(addResult(i, j, "X"))


        }

    }
    renderBoard()
}

function checkResult(trackersXO) {
    if (trackersXO.trackerXRow.includes(gDefult)
        || trackersXO.trackerXCol.includes(gDefult)) {
        gameEnded()
        modal('X won!!!!!!')
    } else if (trackersXO.trackerORow.includes(gDefult)
        || trackersXO.trackerOCol.includes(gDefult)) {
        gameEnded()
        modal('O won!!!!!!')
    } else if (trackersXO.xMainDiagonal === gDefult
        || trackersXO.xSecondaryDiagonal === gDefult) {
        gameEnded()
        modal('X won!!!!!!')

    } else if (trackersXO.oMainDiagonal === gDefult
        || trackersXO.oSecondaryDiagonal === gDefult) {
        gameEnded()
        modal('O won!!!!!!')


    }


}
function onLevel() {
    let input = document.querySelector('.enter-level').value;
    document.querySelector('.enter-level').value = ""

    if (input > 6 || input < 3) {
        gameEnded()
        modal('please enter number between 3-6...')
    } else {
        gameStart()
        onclickLevelButten(input);
        init();
    }
}

function closeModel() {
    let modal = document.querySelector('.modal');
    modal.style.display = "none"
    init()
}

function modal(text) {
    let modal = document.querySelector('.modal');
    let childrenNode = document.querySelector('.modal-content').childNodes;
    childrenNode[3].textContent = text;
    modal.style.display = "block"
}
