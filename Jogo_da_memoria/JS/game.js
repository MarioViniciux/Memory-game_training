const grid = document.querySelector('.grid');
const playerName = document.querySelector('.player');
const Timer = document.querySelector('.timer')

const characters = [ //lista com personagens
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'scroopy',
];

const createElement = (tag, className) => { //cria as divs da carta
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => { //vê se todas as cartas já foram acertadas e parar o timer
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20){
        clearInterval(this.loop);
        window.alert(`Congratulations ${localStorage.getItem('player')}, you won!!! your time has been ${Timer.innerHTML} seconds`);
    }
}

const checkCards = () => { //analisa se as cartas são iguais, e resetam o valor das variaveis firstCard e secondCard
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => { //da um timeout para melhor visualização
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({target}) => { //revela a carta, girando-a em 180° Y

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    
    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (character) => { //cria as cartas, utilizando da função createElement
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../Images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
} 

const loadGame = () => { //inicialização do jogo
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +Timer.innerHTML;
        Timer.innerHTML = currentTime + 1; 
    }, 1000);
}

window.onload = () => {
    const player = localStorage.getItem('player');
    playerName.innerHTML = player;
    startTimer();
    loadGame();
}

