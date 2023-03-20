// Creo variabile per selezionare il div.grid
const grid = document.querySelector(".grid");
// Creo variabile del bottone PLAY
const createGridButton = document.getElementById('create-grid');
// Creo variabile per selezionare il menu a tendina della difficoltà
const difficultySelect = document.getElementById('difficulty-level');


// Assegno al bottone l'event listener con la funzione creata per creare la griglia
createGridButton.addEventListener('click', createGrid)

function createGrid() {
    grid.innerHTML = '';
    // Creo variabile per ottenere value selezionato dal menu a tendina
    const difficultyLevel = parseInt(difficultySelect.value);
    let numberOfCell = difficultyLevel;

    // Modifica il valore della variabile CSS :root in base alla selezione del menu per gestire il numero di colonne
    if (numberOfCell === 100) {
        document.documentElement.style.setProperty('--number-of-cell', '10');
    } else if (numberOfCell === 81) {
        document.documentElement.style.setProperty('--number-of-cell', '9');
    } else if (numberOfCell === 49) {
        document.documentElement.style.setProperty('--number-of-cell', '7');
    }
    
    // Creo ciclo for per creare dinamicamente le box in base al numberOfCells
    for (let i = 1; i <= numberOfCell; i++) {
        const currentNumber = i;
        // inserisco il numero all'interno dello span utilizzando la funzione creata in precedenza
        const newItem = generateGridItem(currentNumber);
        // Assegno event listener per colorare il background al click
        newItem.addEventListener("click", handleItemClick)
        grid.append(newItem);
    };       
};
  
// FUNCIONS

// DOM related functions

// Creazione funzione per inserire testo all'interno del grid-item
function generateGridItem(text) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("grid-item");
    newSquare.innerHTML = `<span>${text}</span>`;
    return newSquare;
};

// Funzione click su box
function handleItemClick() {
    this.classList.add("clicked");
};
