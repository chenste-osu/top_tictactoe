(function gameSession () {
    const gameBoard = () => {
        const createArray = () => {
            let newArray = []
            for (let row = 0; row < 3; row++) {
                let newRow = Array(3);
                for (let col = 0; col < 3; col++) {
                    newRow[col] = {mark: '-', occupied: false};
                }
                newArray.push(newRow);
            }
            return newArray;
        }

        let cellArray = createArray();
    
        const getArray = () => cellArray;
        const getCell = (row, col) => cellArray[row][col];
        const setCell = (newMark, row, col) => {
            cellArray[row][col].mark = newMark;
            cellArray[row][col].occupied = true;
        }
        let remainingMoves = 9;
        const decreaseMoves = () => {
            remainingMoves--;
        }
        const resetMoves = () => {
            remainingMoves = 9;
        }
    
        return {getArray, getCell, setCell, decreaseMoves, resetMoves};
    }
    
    const player = (name, mark) => {
        return {name, mark}
    }

    const board = gameBoard();
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');
    let currentTurn = player1;
    let gameOver = false;

    function markCell(event) {
        console.log("clicked cell row, col:", event.target.id[0], event.target.id[1]);
        const currentCell = document.getElementById(event.target.id);

        let markRow = event.target.id[0];
        let markCol = event.target.id[1];

        if (board.getCell(markRow, markCol).occupied ||
            gameOver) {
            return;
        }

        // update value in array
        board.setCell(currentTurn.mark, markRow, markCol);
        // update document
        updateDoc(currentCell);

        // check for victory condition
        let victoryStatus = checkVictory(currentTurn.mark, markRow, markCol)
        if (victoryStatus) {
            gameOver = true;
            console.log("victory achieved!");
            setTimeout(function() {
                alert(`${currentTurn.name} (${currentTurn.mark}) is the winner!`)
            }, 5);
            
            return;
        }
        swapPlayer();
    }

    function updateDoc(cell) {
        const cellMark = document.createElement('p');
        cellMark.innerText = currentTurn.mark;
        cell.appendChild(cellMark);
    }

    function swapPlayer() {
        if (currentTurn == player1) {
            currentTurn = player2;
        } else {
            currentTurn = player1;
        }
    }

    function checkVictory(mark, row, col) {
        let victory = false;
        let cellType = determineCell(row, col);
        if (cellType == 'diagleft' ||
            cellType == 'diagright') {
                victory = checkCorner(mark, cellType, row, col);
            }
        if (cellType == 'cardinal') {
            victory = checkCardinal(mark, row, col);
        } 
        if (cellType == 'mid') {
            victory = checkMid(mark);
        }
        return victory;
    }

    function determineCell(row, col) {
        if (row == 1 && col == 1) {
            return 'mid';
        }
        if ((row == 0 && col == 0) || 
            (row == 2 && col == 2)) {
            return 'diagleft';
        }
        if ((row == 0 && col == 2) || 
            (row == 2 && col == 0)) {
            return 'diagright';
        }
        if ((row == 0 && col == 1) || 
            (row == 1 && col == 0) ||
            (row == 1 && col == 2) ||
            (row == 2 && col == 1)) {
                    return 'cardinal';
                }
        return 'unknown';
    }

    function checkMid(mark) {
        if (checkCorner(mark, 'diagleft', 1, 1)) {
            return true;
        }
        if (checkCorner(mark, 'diagright', 1, 1)) {
            return true;
        }
        return false;
    }

    function checkCorner(mark, type, row, col) {
        if (type == 'diagleft') {
            if (board.getCell(0, 0).mark == mark &&
                board.getCell(1, 1).mark == mark &&
                board.getCell(2, 2).mark == mark) {
                    console.log('diagleft winner');
                    return true;
                }
            else if (checkRow(mark, row)) {
                return true;
            }
            else if (checkCol(mark, col)) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (type == 'diagright') {
            if (board.getCell(0, 2).mark == mark &&
                board.getCell(1, 1).mark == mark &&
                board.getCell(2, 0).mark == mark) {
                    console.log('diagright winner');
                    return true;
                }
            else if (checkRow(mark, row)) {
                return true;
            }
            else if (checkCol(mark, col)) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    function checkCardinal(mark, row, col) {
        console.log('checking cardinal victory');
        if (checkRow(mark, row) || checkCol(mark, col)) {
            return true;
        } 
        else {
            return false;
        }       
    }

    function checkRow(mark, row) {
        console.log('checking row', row);
        for (let i = 0; i < 3; i++) {
            if (board.getCell(row, i).mark != mark) {
                return false;
            }
        }
        console.log('row winner');
        return true;
    }

    function checkCol(mark, col) {
        console.log('checking col', col);
        for (let i = 0; i < 3; i++) {
            if (board.getCell(i, col).mark != mark) {
                return false;
            }
        }
        console.log("col winner");
        return true;
    }

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener("click", markCell);
    })
})();

