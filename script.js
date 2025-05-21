const loveMessages = [
  "Cada dia ao seu lado é um presente!",
  "Seu sorriso ilumina meus dias!",
  "Você é a pessoa que eu sempre sonhei!",
  "Meu coração bate mais forte por você!",
  "Nossa história é meu conto favorito!",
  "Você me faz a pessoa mais feliz do mundo!"
];

const imagePieces = [
  "assets/peca1.jpeg",
  "assets/peca2.jpeg",
  "assets/peca3.jpeg",
  "assets/peca4.jpeg",
  "assets/peca5.jpeg",
  "assets/peca6.jpeg",
  "assets/peca7.jpeg",
  "assets/peca8.jpeg",
  "assets/peca9.jpeg",
  "assets/peca10.jpeg",
];

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function initializeGame() {
  criarEstrelas();
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  cards = [];
  matchedPairs = 0;

  const gameCards = [...imagePieces, ...imagePieces];
  gameCards.sort(() => Math.random() - 0.5);

  gameCards.forEach((piece, index) => {
  const card = document.createElement('div');
  card.classList.add('memory-card');
  card.dataset.piece = piece;

  card.innerHTML = `
    <div class="card-back">❤️</div>
    <div class="card-front" style="background-image: url('${piece}')"></div>
  `;

  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
  cards.push(card);
});
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.piece === secondCard.dataset.piece;

  if (isMatch) {
    disableCards();
    showLoveMessage();
    matchedPairs++;

    if (matchedPairs === imagePieces.length) {
      setTimeout(showFinalMessage, 1000);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  createHearts();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showLoveMessage() {
  const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  console.log("Mostrando mensagem:", randomMessage); 
  document.getElementById('popupTitle').textContent = '❤️ Mensagem Especial ❤️';
  document.getElementById('popupMessage').textContent = randomMessage;
  document.getElementById('messagePopup').style.display = 'block';
}

function showFinalMessage() {
  document.getElementById('popupTitle').textContent = 'Parabéns, Amor!';
  document.getElementById('popupMessage').textContent = 'Você completou nosso quebra-cabeça do amor! Cada peça representa um momento especial nosso. Eu te amo mais que tudo!';
  document.getElementById('messagePopup').style.display = 'block';

  for (let i = 0; i < 50; i++) {
    setTimeout(createHearts, i * 100);
  }
}

function closePopup() {
  document.getElementById('messagePopup').style.display = 'none';
}

function createHearts() {
  const heart = document.createElement('div');
  heart.classList.add('hearts');
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = Math.random() * 100 + 'vh';
  heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's';

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

window.onload = initializeGame;


function criarEstrelas() {
  const fundoEstrelado = document.getElementById('fundo-estrelado');
  const quantidadeEstrelas = 100;
  
  // Limpa estrelas existentes
  fundoEstrelado.innerHTML = '';
  
  for (let i = 0; i < quantidadeEstrelas; i++) {
    const estrela = document.createElement('div');
    estrela.classList.add('estrela');
    
    // Tamanho aleatório entre 1px e 4px
    const tamanho = Math.random() * 3 + 1;
    estrela.style.width = `${tamanho}px`;
    estrela.style.height = `${tamanho}px`;
    
    // Posição aleatória na tela
    estrela.style.left = `${Math.random() * 100}vw`;
    estrela.style.top = `${Math.random() * 100}vh`;
    
    // Animação com duração e delay aleatórios
    estrela.style.animationDuration = `${Math.random() * 3 + 2}s`;
    estrela.style.animationDelay = `${Math.random() * 5}s`;
    
    // Opacidade inicial aleatória
    estrela.style.opacity = Math.random() * 0.8 + 0.2;
    
    fundoEstrelado.appendChild(estrela);
  }
}

// Atualizar estrelas quando a janela for redimensionada
window.addEventListener('resize', criarEstrelas);
