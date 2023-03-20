// Creo variabile per selezionare il div.grid
const grid = document.querySelector(".grid");
// Creo variabile del bottone PLAY
const createGridButton = document.getElementById('create-grid');
// Creo variabile per selezionare il menu a tendina della difficoltà
const difficultySelect = document.getElementById('difficulty-level');
// Creo variabile per selezionare il div del punteggio
const scoreDisplay = document.getElementById('score');

// Assegno al bottone l'event listener con la funzione creata per creare la griglia
createGridButton.addEventListener('click', createGrid);

let bombs = [];
let score = 0;
let maxScore = 0;
function createGrid() {
    // Resetto il punteggio e la lista delle bombe
    score = 0;
    bombs = [];
    scoreDisplay.innerText = `Score: ${score}`;

    grid.innerHTML = '';
    // Creo variabile per ottenere value selezionato dal menu a tendina
    let nmbrOfCell = parseInt(difficultySelect.value);

    // Modifica il valore della variabile CSS :root in base alla selezione del menu per gestire il numero di colonne
    if (nmbrOfCell === 100) {
        document.documentElement.style.setProperty('--number-of-cell', '10');
    } else if (nmbrOfCell === 81) {
        document.documentElement.style.setProperty('--number-of-cell', '9');
    } else if (nmbrOfCell === 49) {
        document.documentElement.style.setProperty('--number-of-cell', '7');
    }

    // Creo ciclo for per creare dinamicamente le box in base al nmbrOfCells
    for (let i = 1; i <= nmbrOfCell; i++) {
        const currentNumber = i;
        // inserisco il numero all'interno dello span utilizzando la funzione creata in precedenza
        const newItem = generateGridItem(currentNumber);
        // Assegno event listener per colorare il background al click
        newItem.addEventListener("click", handleItemClick)
        grid.append(newItem);
    };
    // Genero la lista delle bombe
    bombs = generateBombs(16, nmbrOfCell);
    maxScore = nmbrOfCell - bombs.length;
    console.log(bombs);
};

// Creazione funzione per inserire testo all'interno del grid-item
function generateGridItem(text) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("grid-item");
    newSquare.innerHTML = `<span>${text}</span>`;
    return newSquare;
};

// Funzione che genera array di numbersQuantity numeri random nel range di 1 a numberOfCells
function generateBombs(numbersQuantity, maxNumber) {
    const numbers = [];
    while (numbers.length < numbersQuantity) {
        const rndNumber = getRndInteger(1, maxNumber);
        if (!numbers.includes(rndNumber)) {
            numbers.push(rndNumber)
        };
    };
    return numbers;
};

// Generatore di numeri random 
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Funzione per gestire il click su una casella della griglia
function handleItemClick(event) {
    const clickedItem = event.currentTarget;
    const clickedItemNumber = parseInt(clickedItem.innerText);
  
    // Controllo se la casella cliccata è una bomba
    if (bombs.includes(clickedItemNumber)) {
        clickedItem.classList.add("bomb");
        // Mostra tutte le bombe presenti nella griglia
        grid.querySelectorAll(".grid-item").forEach(item => {
            if (bombs.includes(parseInt(item.innerText))) {
                item.classList.add("bomb");
            };
        });
        // Mostra un alert che avvisa della sconfitta e chiede se si vuole rigiocare
        if (confirm("Hai perso! Vuoi rigiocare?")) {
            createGrid();
        };
    } else {
        if (!clickedItem.classList.contains("clicked")) {
            // Se la casella cliccata non è una bomba, la colora di verde e aumenta il punteggio
            clickedItem.classList.add("clicked");
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
        };
        // Controlla se il gioco è stato vinto
        if (score === maxScore) {
            // Mostra un alert che avvisa della vittoria e chiede se si vuole rigiocare
            if (confirm("Hai vinto! Vuoi rigiocare?")) {
                createGrid();
            };
        };
    };
};