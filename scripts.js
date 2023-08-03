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
            console.log("row, col is being changed", row, col);

            cellArray[row][col].mark = newMark;
            cellArray[row][col].occupied = true;
        }
    
        return {getArray, getCell, setCell};
    }
    
    const player = (name, mark) => {
        return {name, mark}
    }

    const board = gameBoard();
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');

    let currentTurn = player1;

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener("click", markCell);
    })
    
    function markCell(event) {
        console.log("clicked cell row, col:", event.target.id[0], event.target.id[1]);
        const currentCell = document.getElementById(event.target.id);

        let row = event.target.id[0];
        let col = event.target.id[1];

        if (board.getCell(row, col).occupied) {
            return;
        }

        // update value in array
        board.setCell(currentTurn.mark, row, col);

        // update document
        const cellMark = document.createElement('p');
        cellMark.innerText = currentTurn.mark;
        currentCell.appendChild(cellMark);

        swapPlayer();
    }

    function swapPlayer() {
        if (currentTurn == player1) {
            currentTurn = player2;
        } else {
            currentTurn = player1;
        }
    }
})();

