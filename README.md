# Obbligo o Verità

Web app di **Obbligo o Verità** con 3 livelli. Le sfide non arrivano da un database fisso: ognuna viene generata al momento da un modello IA tramite **OpenRouter** (con la ricerca web di OpenRouter).

Giocala qui: https://dennycardone.github.io/obbligo-o-verita/

## Come si usa

1. Tocca l'ingranaggio, incolla la tua API Key di OpenRouter e scegli il modello (es. `nousresearch/hermes-4-70b`).
2. Aggiungi i giocatori (minimo 2) e scegli il livello 1, 2 o 3.
3. A turno: **Obbligo** o **Verità** → l'IA genera la sfida.

L'app ricorda le ultime 15 sfide della serata e le passa al modello per evitare ripetizioni.

## Personalizzare il tono dei livelli

In `index.html`, in cima allo script, modifica l'oggetto `PROMPTS_LIVELLI` (un System Prompt per ogni livello). Sotto trovi anche `CONFIG` (modello predefinito, numero di sfide da ricordare, temperatura) e `REGOLE_OUTPUT` (formato della risposta).

## File

- `index.html` — tutta l'app (HTML, CSS, JavaScript)
- `manifest.json`, `sw.js`, icone — per installarla come app
