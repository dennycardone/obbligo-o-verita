const truths = {
  classica: [
    "Qual è il tuo sogno più grande?",
    "Qual è la cosa più imbarazzante che ti è successa a scuola?",
    "Chi è la persona che ammiri di più e perché?",
    "Qual è il tuo più grande rimpianto?",
    "Hai mai mentito a un amico? Su cosa?",
    "Qual è la cosa più strana che hai mangiato?",
    "Qual è il tuo talento nascosto?",
    "Se potessi cambiare una cosa del tuo passato, quale sarebbe?",
    "Qual è il tuo film preferito e perché?",
    "Hai mai avuto una cotta per qualcuno in questa stanza?"
  ],
  piccante: [
    "Qual è la fantasia più hot che hai?",
    "Hai mai fatto qualcosa di molto sporco in pubblico?",
    "Qual è la posizione che preferisci a letto?",
    "Hai mai mandato nudes a qualcuno?",
    "Qual è la cosa più spinta che hai fatto da ubriaco?",
    "Preferisci dominare o essere dominato?",
    "Hai mai fatto sesso in un luogo pubblico?",
    "Qual è il tuo kink più strano?",
    "Hai mai tradito qualcuno?",
    "Qual è la cosa più eccitante che ti hanno detto durante il sesso?"
  ]
};

const dares = {
  classica: [
    "Canta una canzone a voce alta per 30 secondi.",
    "Fai 10 flessioni.",
    "Imita un animale per 20 secondi.",
    "Racconta una barzelletta.",
    "Balla come se nessuno ti guardasse per 15 secondi.",
    "Fai una faccia buffa e tienila per 10 secondi.",
    "Di' un complimento a ogni giocatore.",
    "Mostra l'ultima foto nel tuo telefono.",
    "Parla con un accento straniero per il prossimo turno.",
    "Fai una chiamata a qualcuno e canta Happy Birthday."
  ],
  piccante: [
    "Togli un capo d'abbigliamento.",
    "Dai un bacio sulla guancia a qualcuno a tua scelta.",
    "Descrivi in dettaglio la tua ultima esperienza sessuale.",
    "Manda un messaggio piccante a qualcuno nella tua rubrica.",
    "Fai un massaggio sensuale a qualcuno per 30 secondi.",
    "Mostra il tuo petto (o equivalente) per 5 secondi.",
    "Sussurra qualcosa di molto sporco all'orecchio di qualcuno.",
    "Fai una lap dance di 15 secondi a qualcuno.",
    "Di' la cosa più sporca che ti viene in mente.",
    "Togli un altro capo d'abbigliamento se hai già fatto un obbligo."
  ]
};

let players = [];
let currentIndex = 0;
let currentMode = 'classica';
let currentPrompt = null;

document.getElementById('add-player').addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = 'player-input';
  div.innerHTML = `<input type="text" placeholder="Nome giocatore ${document.querySelectorAll('.player-name').length + 1}" class="player-name">`;
  document.getElementById('players-list').appendChild(div);
});

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('truth-btn').addEventListener('click', () => showPrompt('Verità'));
document.getElementById('dare-btn').addEventListener('click', () => showPrompt('Obbligo'));
document.getElementById('done-btn').addEventListener('click', nextTurn);
document.getElementById('skip-btn').addEventListener('click', nextTurn);
document.getElementById('new-prompt-btn').addEventListener('click', () => {
  if (currentPrompt) showPrompt(currentPrompt.type);
});
document.getElementById('next-player').addEventListener('click', nextTurn);
document.getElementById('reset-game').addEventListener('click', resetGame);

function startGame() {
  const inputs = document.querySelectorAll('.player-name');
  players = Array.from(inputs).map(i => i.value.trim()).filter(n => n);
  if (players.length < 2) {
    alert('Inserisci almeno 2 giocatori!');
    return;
  }
  currentMode = document.querySelector('input[name="mode"]:checked').value;
  currentIndex = 0;
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('reset-game').classList.remove('hidden');
  document.getElementById('mode-badge').textContent = currentMode === 'piccante' ? 'Piccante 🌶️' : 'Classica';
  updatePlayer();
}

function updatePlayer() {
  document.getElementById('current-player').textContent = players[currentIndex];
  document.getElementById('prompt-box').classList.add('hidden');
  document.getElementById('next-player').classList.add('hidden');
  document.querySelector('.choice-buttons').classList.remove('hidden');
}

function showPrompt(type) {
  currentPrompt = { type };
  const list = type === 'Verità' ? truths[currentMode] : dares[currentMode];
  const text = list[Math.floor(Math.random() * list.length)];
  document.getElementById('prompt-type').textContent = type;
  document.getElementById('prompt-text').textContent = text;
  document.getElementById('prompt-box').classList.remove('hidden');
  document.querySelector('.choice-buttons').classList.add('hidden');
  document.getElementById('next-player').classList.remove('hidden');
}

function nextTurn() {
  currentIndex = (currentIndex + 1) % players.length;
  updatePlayer();
}

function resetGame() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
  document.getElementById('reset-game').classList.add('hidden');
  players = [];
  currentIndex = 0;
}
