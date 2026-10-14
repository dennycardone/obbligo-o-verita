const truths = {
  soft: [
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
  medio: [
    "Qual è il posto più strano in cui hai baciato qualcuno?",
    "Hai mai avuto una cotta per un amico del tuo partner?",
    "Qual è la cosa più stupida che hai fatto per impressionare qualcuno?",
    "Hai mai spiato il telefono di qualcuno?",
    "Qual è il tuo più grande segreto che nessuno in questa stanza conosce?",
    "Hai mai finto di piacerti qualcosa solo per stare con qualcuno?",
    "Qual è la bugia più grossa che hai detto ai tuoi genitori?",
    "Hai mai avuto un sogno erotico su qualcuno che conosci?",
    "Qual è la cosa più imbarazzante che ti hanno beccato a fare?",
    "Preferisci un’avventura di una notte o una relazione stabile?"
  ],
  hard: [
    "Qual è la fantasia più sporca che hai?",
    "Hai mai fatto sesso in un luogo pubblico?",
    "Qual è la posizione che ti fa impazzire di più?",
    "Hai mai mandato nudes a qualcuno che non avresti dovuto?",
    "Qual è la cosa più perversa che hai fatto da ubriaco?",
    "Preferisci dominare o essere dominato?",
    "Hai mai tradito qualcuno? Racconta.",
    "Qual è il tuo kink più estremo?",
    "Hai mai fatto un threesome o vorresti farlo?",
    "Qual è la cosa più sporca che ti hanno detto durante il sesso?"
  ]
};

const dares = {
  soft: [
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
  medio: [
    "Bacia qualcuno sulla guancia per 5 secondi.",
    "Togli un capo d’abbigliamento (scarpe contano).",
    "Manda un messaggio ambiguo a qualcuno nella tua rubrica.",
    "Fai un massaggio alle spalle a qualcuno per 20 secondi.",
    "Descrivi il tuo ultimo appuntamento in modo dettagliato.",
    "Mostra la chat più recente sul telefono.",
    "Fai 10 squat mentre dici qualcosa di piccante.",
    "Sussurra qualcosa di sexy all’orecchio di qualcuno.",
    "Balla in modo sensuale per 15 secondi.",
    "Di’ la cosa più imbarazzante che ti è successa in camera da letto."
  ],
  hard: [
    "Togli un capo d’abbigliamento intimo.",
    "Fai una lap dance di 20 secondi a qualcuno.",
    "Descrivi in dettaglio la tua ultima esperienza sessuale.",
    "Manda un messaggio molto esplicito a qualcuno.",
    "Mostra il petto (o equivalente) per 10 secondi.",
    "Sussurra la cosa più sporca che ti viene in mente all’orecchio di qualcuno.",
    "Fai un massaggio sensuale a qualcuno per 30 secondi.",
    "Togli un altro capo se ne hai già tolto uno.",
    "Imita un gemito per 10 secondi.",
    "Di’ cosa vorresti fare adesso con qualcuno in questa stanza."
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
  const modeLabels = { soft: 'Soft', medio: 'Medio', hard: 'Hard 🔥' };
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
