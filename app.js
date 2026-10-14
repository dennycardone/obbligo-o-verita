const truths = {
  soft: [
    "Qual è la tua fantasia più ricorrente?",
    "Hai mai avuto un sogno erotico su qualcuno che conosci?",
    "Qual è la cosa più sexy che ti hanno detto?",
    "Preferisci dominare o essere dominato?",
    "Hai mai mandato nudes?",
    "Qual è il posto più strano in cui hai baciato qualcuno?",
    "Cosa ti eccita di più in una persona?",
    "Hai mai fatto qualcosa di piccante da ubriaco?",
    "Qual è la tua posizione preferita?",
    "Hai mai avuto una cotta per qualcuno in questa stanza?"
  ],
  medio: [
    "Qual è la cosa più sporca che hai fatto?",
    "Hai mai fatto sesso in un luogo pubblico?",
    "Hai mai tradito qualcuno? Racconta.",
    "Qual è il tuo kink più strano?",
    "Hai mai fatto un threesome o vorresti farlo?",
    "Qual è la bugia più grossa che hai detto per fare sesso?",
    "Hai mai spiato qualcuno mentre faceva sesso?",
    "Qual è la cosa più imbarazzante che ti è successa durante il sesso?",
    "Hai mai usato giocattoli sessuali?",
    "Preferisci un’avventura di una notte o sesso occasionale con qualcuno che conosci?"
  ],
  hard: [
    "Descrivi in dettaglio la tua ultima esperienza sessuale.",
    "Qual è la cosa più perversa che hai fatto?",
    "Hai mai fatto sesso con più persone contemporaneamente?",
    "Qual è la tua fantasia più estrema e sporca?",
    "Hai mai fatto qualcosa di illegale o rischioso per sesso?",
    "Qual è la cosa più sporca che vorresti fare adesso con qualcuno qui?",
    "Hai mai pagato o sei stato pagato per sesso?",
    "Qual è il tuo limite più basso che hai superato?",
    "Racconta la cosa più squallida che hai fatto da ubriaco.",
    "Hai mai registrato o fatto foto esplicite di te stesso/a?"
  ]
};

const dares = {
  soft: [
    "Sussurra qualcosa di sexy all’orecchio di qualcuno.",
    "Fai un massaggio sensuale alle spalle a qualcuno per 20 secondi.",
    "Balla in modo sensuale per 15 secondi.",
    "Togli un capo d’abbigliamento (scarpe o calzini contano).",
    "Di’ la cosa più sexy che ti viene in mente.",
    "Bacia qualcuno sulla guancia per 5 secondi.",
    "Mostra la chat più recente sul telefono.",
    "Descrivi come ti piace essere toccato/a.",
    "Fai 10 squat mentre dici qualcosa di piccante.",
    "Manda un messaggio ambiguo a qualcuno nella tua rubrica."
  ],
  medio: [
    "Togli un capo d’abbigliamento intimo.",
    "Fai una lap dance di 15 secondi a qualcuno.",
    "Descrivi in dettaglio il tuo ultimo orgasmo.",
    "Sussurra la cosa più sporca che ti viene in mente all’orecchio di qualcuno.",
    "Mostra il petto (o equivalente) per 5 secondi.",
    "Fai un massaggio sensuale a qualcuno per 30 secondi.",
    "Imita un gemito per 10 secondi.",
    "Di’ cosa vorresti fare adesso con qualcuno in questa stanza.",
    "Togli un altro capo se ne hai già tolto uno.",
    "Manda un messaggio esplicito a qualcuno."
  ],
  hard: [
    "Togli tutto tranne l’intimo e resta così per un turno.",
    "Fai una lap dance completa (almeno 30 secondi) a qualcuno.",
    "Descrivi in dettaglio cosa vorresti che qualcuno ti facesse adesso.",
    "Mostra qualcosa di molto esplicito (a tua scelta) per 5 secondi.",
    "Sussurra all’orecchio di qualcuno la cosa più perversa che hai fatto.",
    "Fai un massaggio intimo (sopra i vestiti) a qualcuno per 20 secondi.",
    "Imita l’orgasmo più realistico che riesci.",
    "Di’ esattamente cosa faresti a qualcuno qui se foste soli.",
    "Togli un capo intimo e rimani così fino al tuo prossimo turno.",
    "Manda una foto o un messaggio molto esplicito a qualcuno (puoi censurare)."
  ]
};

let players = [];
let currentIndex = 0;
let currentMode = 'soft';
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
  const modeLabels = { soft: 'Soft 🔥', medio: 'Medio', hard: 'Hard 😈' };
  document.getElementById('mode-badge').textContent = modeLabels[currentMode] || currentMode;
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
