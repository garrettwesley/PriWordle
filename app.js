const tileDisplay = document.querySelector('.tile-container');
const keyBoard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
const wordle = "GRASS"
let currentRow = 0
let currentTile = 0
let isGameOver = false

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<<'
]


const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElem = document.createElement('div')
    rowElem.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const titleElem = document.createElement('div')
        titleElem.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        titleElem.classList.add('tile')
        rowElem.append(titleElem)
    })
    tileDisplay.append(rowElem)
})


keys.forEach(key => {
    const buttonElem = document.createElement('button')
    buttonElem.textContent = key
    buttonElem.setAttribute('id', key)
    buttonElem.addEventListener('click', () => handleClick(key))
    keyBoard.append(buttonElem)
})


const handleClick = (key) => {
    if (!isGameOver) {

        console.log('clicked', key)
        if (key === '<<') {
            console.log('delete letter')
            deleteLetter()
            console.log(guessRows)
            return
        }
        if (key === 'ENTER') {
            console.log('check row')
            checkRow()
            console.log(guessRows)
            return
        }
        addLetter(key)
        console.log(guessRows)
    }
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    console.log('guess ', guess)
    if (currentTile > 4) {
        // showMessage(`Loading...`)
                if (guess == wordle) {
                    flipTile()
                    showMessage('Come meet Finn and I at the Presidio grass!')
                    isGameOver = true
                    return

                }
                else {
                    flipTile()
                    if (wordle == guess) {
                        showMessage('Come meet Finn and I at the Presidio grass!')
                        isGameOver = true
                        return
                    } else {
                        if (currentRow >= 5) {
                            isGameOver = true
                            showMessage(`Game Over! The word is ${wordle}`)
                            return
                        }

                        if (currentRow < 5) {
                            currentRow++
                            currentTile = 0
                        }
                    }

                }

    }
}

const showMessage = (message) => {
    const messageElem = document.createElement('p')
    messageElem.textContent = message
    messageDisplay.append(messageElem)
    setTimeout(() => messageDisplay.removeChild(messageElem), 2000)
}

const addcolorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addcolorToKey(guess[index].letter, guess[index].color)
            // if(dataLetter == wordle[index]){
            //     tile.classList.add('green')
            //     addcolorToKey(dataLetter,'green')
            // }
            // else if(wordle.includes(dataLetter)){
            //     tile.classList.add('yellow')
            //     addcolorToKey(dataLetter,'yellow')
            // }

            // else{
            //     tile.classList.add('grey')
            //     addcolorToKey(dataLetter,'grey')
            // }
        }, 500 * index)

    })
}
