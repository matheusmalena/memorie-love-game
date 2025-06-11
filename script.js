const loveMessagesByImage = [
  { image: "assets/peca1.jpeg", message: "Primeira viagem, primeiros momentos. Foi ali que percebi o quanto estar com você era especial." },
  { image: "assets/peca2.jpeg", message: "Realizar seus desejos é o que mais me deixa feliz princesa!" },
  { image: "assets/peca3.jpeg", message: "Nossa tatuagem na feirinha, em breve quero muito que seja real" },
  { image: "assets/peca4.jpeg", message: "Estar com você nos lugares que amo, me faz a pessoa mais feliz nesse mundo!" },
  { image: "assets/peca5.jpeg", message: "Você me faz a pessoa mais feliz do mundo!" },
  { image: "assets/peca6.jpeg", message: "Efésios 5:25: “Maridos, amem suas mulheres, assim como Cristo amou a igreja e entregou-se por ela.”" },
  { image: "assets/peca7.jpeg", message: "Nada melhor do que um dia de praia colado em você!" },
  { image: "assets/peca8.jpeg", message: "Amo seus presentes carinhosos e criativos, seu jeito delicado me fascina!" },
  { image: "assets/peca9.jpeg", message: "Uma data mais que especial, o dia que oficializamos nosso amor.  O dia que escolhi passar o resto da vida ao seu lado amor, agradeço a Deus por ter enviado uma mulher tão maravilhosa como você." },
  { image: "assets/peca10.jpeg", message: "O dia em que pintamos os quadrinhos na praia. Muito amor, criatividade e praia!" },
  { image: "assets/peca11.jpeg", message: "Você foi a unica mulher que entreguei meu coração em toda a minha vida!" },
  { image: "assets/peca12.jpeg", message: "Viajamos para Sao Paulo, passeamos e conhecemos novos lugares daoras." },
  { image: "assets/peca13.jpeg", message: "Você sempre está ao meu lado, obrigado por acreditar em mim!" },
  { image: "assets/peca14.jpeg", message: "🎵 Estar com você na virada do sol, é compreender que o que há de melhor. Tá na vidaaa!" },
  { image: "assets/peca15.jpeg", message: "Hopi hari que nos espere novamente, nos divertimos muito amor!" },
];


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
let finalPairCompleted = false;

function initializeGame() {
  criarEstrelas();
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  cards = [];
  matchedPairs = 0;

  const gameCards = [...loveMessagesByImage, ...loveMessagesByImage].sort(() => Math.random() - 0.5);
  gameCards.forEach((pieceObj) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.piece = pieceObj.image;

    card.innerHTML = `
    <div class="card-back">🤍</div>
    <div class="card-front" style="background-image: url('${pieceObj.image}')"></div>
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
    showLoveMessage();
    disableCards();
    matchedPairs++;

    if (matchedPairs === loveMessagesByImage.length) {
      // Não chame showFinalMessage ainda, apenas marque como finalizado
      finalPairCompleted = true;
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
  const matchedImage = firstCard.dataset.piece;
  console.log("Imagem encontrada no par:", matchedImage);

  const match = loveMessagesByImage.find(item => item.image === matchedImage);

  if (!match) {
    console.warn("Nenhuma mensagem encontrada para a imagem:", matchedImage);
  }

  const message = match ? match.message : "Você é meu mundo inteiro!";

  console.log("Mostrando mensagem:", message);
  document.getElementById('popupTitle').textContent = '❤️ Mensagem Especial ❤️';
  document.getElementById('popupMessage').textContent = message;
  const popup = document.getElementById('messagePopup');
  popup.style.display = 'flex';
  popup.style.flexDirection = 'column';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
}


function showFinalMessage() {
  document.getElementById('popupTitle').textContent = 'Parabéns, Amor!';
  document.getElementById('popupMessage').textContent = 'Você completou nosso quebra-cabeça do amor! Cada peça representa um momento especial nosso. Eu te amo mais que tudo!';
  const popup = document.getElementById('messagePopup');
  popup.style.display = 'flex';
  popup.style.flexDirection = 'column';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
document.getElementById('restartBtn').style.display = 'block';
document.getElementById('continueBtn').style.display = 'none';

for (let i = 0; i < 50; i++) {
  setTimeout(createHearts, i * 100);
}
launchConfetti();
}

function launchConfetti() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["#FFC0CB", "#FF69B4", "#FF1493", "#C71585"],
  };

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
  });
  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
  });
  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
  });
}

function closePopup() {
  document.getElementById('messagePopup').style.display = 'none';

  if (finalPairCompleted) {
    finalPairCompleted = false;
    showFinalMessage();
  }
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

document.getElementById('playMusicBtn').addEventListener('click', () => {
  const music = document.getElementById('bgMusic');
  music.play().then(() => {
  }).catch(e => {
    console.log('Falha ao tocar música:', e);
  });
});