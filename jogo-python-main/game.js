(() => {
  // Game em HTML/JS (mecânica igual ao Python: níveis 1 e 2, dano aleatório e troca de turno).
  // “Imagens”: aqui renderizo SVG embutido no log (sem ASCII pesado).

  const elLog = document.getElementById('log');
  const elActions = document.getElementById('actions');
  const elLevel = document.getElementById('level');
  const elHpPlayer = document.getElementById('hpPlayer');
  const elHpEnemy = document.getElementById('hpEnemy');
  const elStatus = document.getElementById('status');

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const randInt = (minInclusive, maxInclusive) => {
    const min = Math.ceil(minInclusive);
    const max = Math.floor(maxInclusive);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const setStatus = (txt) => {
    elStatus.textContent = txt;
  };

  const clearActions = () => {
    elActions.innerHTML = '';
  };

  const clearLog = () => {
    elLog.textContent = '';
  };

  // log com suporte a HTML (SVG “imagens”)
  const appendLog = (html = '') => {
    elLog.innerHTML += html + '<br>';
  };

  const updateHUD = () => {
    elLevel.textContent = String(game.level);
    elHpPlayer.textContent = String(Math.max(0, game.hpPlayer));
    elHpEnemy.textContent = String(Math.max(0, game.hpEnemy));
  };

  function cardButton(label, onClick, { className = '' } = {}) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.className = className;
    btn.addEventListener('click', onClick);
    return btn;
  }

  const game = {
    running: true,
    level: 1,
    hpPlayer: 100,
    hpEnemy: 100,
  };

  // SVGs “imagens”
  const imgFrame = (innerSvg, { stroke = 'rgba(214,178,94,0.35)', glow = 'rgba(214,178,94,0.15)' } = {}) => `
  <svg width="320" height="140" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="10" y="10" width="300" height="120" rx="20" fill="rgba(255,255,255,0.04)" stroke="${stroke}"/>
    <rect x="10" y="10" width="300" height="120" rx="20" fill="none" stroke="${glow}" filter="url(#glow)"/>
    ${innerSvg}
  </svg>`;

  const imgCapivara = imgFrame(`
    <defs>
      <linearGradient id="cap" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6d365" stop-opacity="0.95"/>
        <stop offset="1" stop-color="#fda085" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <circle cx="92" cy="78" r="28" fill="url(#cap)"/>
    <circle cx="82" cy="68" r="7" fill="#0b1020"/>
    <path d="M118 78c14 0 24 8 32 18" stroke="rgba(214,178,94,0.9)" stroke-width="6" stroke-linecap="round" fill="none"/>
    <rect x="150" y="52" width="140" height="24" rx="12" fill="rgba(139,0,0,0.22)" stroke="rgba(139,0,0,0.45)"/>
    <text x="220" y="68" text-anchor="middle" font-family="ui-monospace, monospace" font-size="14" font-weight="800" fill="rgba(231,236,255,0.95)">CAPIVARA</text>
  `, { stroke: 'rgba(214,178,94,0.35)', glow: 'rgba(214,178,94,0.15)' });

  const imgDerrota = imgFrame(`
    <text x="160" y="82" text-anchor="middle" font-family="ui-monospace, monospace" font-size="60" font-weight="900" fill="rgba(226,59,59,0.92)">X</text>
    <text x="160" y="112" text-anchor="middle" font-family="ui-monospace, monospace" font-size="14" font-weight="800" fill="rgba(231,236,255,0.92)">A CAPIVARA VENCEU</text>
  `, { stroke: 'rgba(226,59,59,0.35)', glow: 'rgba(226,59,59,0.15)' });

  const imgVitoria = imgFrame(`
    <path d="M80 80 L120 120 L240 45" stroke="url(#g2)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <defs>
      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2ecc71" stop-opacity="0.95"/>
        <stop offset="1" stop-color="#2a4cff" stop-opacity="0.65"/>
      </linearGradient>
    </defs>
    <text x="160" y="105" text-anchor="middle" font-family="ui-monospace, monospace" font-size="16" font-weight="900" fill="rgba(231,236,255,0.95)">VOCÊ VENCEU!</text>
  `, { stroke: 'rgba(46,204,113,0.35)', glow: 'rgba(46,204,113,0.15)' });

  function showMenu() {
    game.running = true;
    game.level = 1;
    game.hpPlayer = 100;
    game.hpEnemy = 100;

    clearActions();
    clearLog();

    setStatus('Aguardando');
    updateHUD();

    appendLog('-'.repeat(20));
    appendLog('');
    appendLog('<b>BEM VINDO AO JOGO HUMANO X CAPIVARA</b>');
    appendLog('');
    appendLog('<b>MENU INTERATIVO</b>');
    appendLog('');
    appendLog('[ 1 ] - Iniciar o Jogo');
    appendLog('[ 2 ] - Sair do jogo');
    appendLog('');
    appendLog('-'.repeat(20));

    clearActions();
    elActions.appendChild(cardButton('Iniciar (1)', () => startGame(), { className: 'primary' }));
    elActions.appendChild(cardButton('Sair (2)', () => exitGame(), {}));
  }

  function exitGame() {
    clearActions();
    setStatus('Encerrado');
    appendLog('');
    appendLog('QUE PENA QUE VOCÊ SAIU, ATÉ A PRÓXIMA');
    game.running = false;
  }

  async function startGame() {
    if (!game.running) return;

    clearActions();
    clearLog();
    setStatus('Preparando partida...');

    appendLog('Prepare-se, a partida irá começar!');
    for (let i = 1; i < 4; i++) {
      await sleep(750);
      clearLog();
      appendLog('Prepare-se, a partida irá começar!');
      appendLog('');
      appendLog(String(i));
      updateHUD();
    }

    clearLog();
    setStatus('Nível 1: escolha um ataque');
    await runLevel1();
  }

  function enableAttackMenu(level) {
    clearActions();
    if (level === 1) {
      elActions.appendChild(cardButton('SOCO PODEROSO (1)', () => playerAttackLevel1(1), { className: 'primary' }));
      elActions.appendChild(cardButton('CABEÇADA (2)', () => playerAttackLevel1(2), {}));
      elActions.appendChild(cardButton('JIU-JITSU (3)', () => playerAttackLevel1(3), {}));
    } else {
      elActions.appendChild(cardButton('SOCO PODEROSO ALADO (1)', () => playerAttackLevel2(1), { className: 'primary' }));
      elActions.appendChild(cardButton('CABEÇADA SANGRENTA (2)', () => playerAttackLevel2(2), {}));
      elActions.appendChild(cardButton('GOLPE BOXE DO POPÓ (3)', () => playerAttackLevel2(3), {}));
    }
  }

  let resolveTurn = null;

  function waitPlayerTurn() {
    setStatus('Escolha um ataque');
    return new Promise((resolve) => {
      resolveTurn = resolve;
    });
  }

  function playerAttackLevel1(choice) {
    clearActions();

    // cenário: hp_enemy -= dano
    let dano;
    if (choice === 1) {
      dano = randInt(10, 15);
      game.hpEnemy -= dano;
      appendLog(`Você atacou com <b>SOCO PODEROSO</b> e a capivara perdeu ${dano} de vida.`);
    } else if (choice === 2) {
      dano = randInt(5, 10);
      game.hpEnemy -= dano;
      appendLog(`Você atacou com <b>CABEÇADA</b> e a capivara perdeu ${dano} de vida.`);
    } else if (choice === 3) {
      dano = randInt(10, 20);
      game.hpEnemy -= dano;
      appendLog(`Você atacou com <b>JIU-JITSU</b> e a capivara perdeu ${dano} de vida.`);
    } else {
      appendLog('Opção inválida. Você será punido e perderá a vez.');
      // equivalente ao python: “punido e perdera vez” mas sem dano extra no seu código original.
    }

    resolveTurn?.();
    resolveTurn = null;
    updateHUD();
  }

  async function turnEnemyLevel1() {
    await sleep(350);
    appendLog('');
    appendLog('<b>A capivara irá contra-atacar</b>');

    const ataque = randInt(0, 1);
    let dano;
    if (ataque === 1) {
      appendLog('');
      appendLog('OOOOOOOOHHH NÃO');
      appendLog('A capivara lhe arranhou!');
      dano = randInt(10, 15);
    } else {
      appendLog('');
      appendLog('OOOOOOOOHHH NÃO');
      appendLog('A Capivara lhe mordeu');
      dano = randInt(8, 13);
    }

    game.hpPlayer -= dano;
    appendLog(`Sua vida agora é de <b>${game.hpPlayer}</b>.`);
    appendLog(imgCapivara);
    updateHUD();
  }

  async function runLevel1() {
    game.level = 1;
    game.hpPlayer = 100;
    game.hpEnemy = 100;
    updateHUD();

    while (game.hpPlayer > 0 && game.hpEnemy > 0 && game.running) {
      enableAttackMenu(1);
      await waitPlayerTurn();
      updateHUD();
      if (game.hpEnemy <= 0) break;

      await turnEnemyLevel1();
      updateHUD();
      if (game.hpPlayer <= 0) break;
    }

    if (!game.running) return;

    if (game.hpPlayer > 0 && game.hpEnemy <= 0) {
      clearActions();
      clearLog();
      appendLog(imgVitoria);
      appendLog('');
      appendLog('Parabéns, você venceu');
      appendLog('');
      appendLog('<b>BEM VINDO AO NÍVEL 2</b>');

      setStatus('Carregando nível 2...');
      for (let i = 1; i < 4; i++) {
        await sleep(650);
        clearLog();
        appendLog(imgVitoria);
        appendLog('');
        appendLog('BEM VINDO AO NÍVEL 2');
        appendLog('');
        appendLog(String(i));
      }

      clearLog();
      setStatus('Nível 2: novas habilidades desbloqueadas');
      appendLog('<b>NOVAS HABILIDADES DESBLOQUEADAS</b>');
      updateHUD();
      await runLevel2();
      return;
    }

    clearActions();
    clearLog();
    appendLog(imgDerrota);
    setStatus('Derrota');
    game.running = false;
  }

  function playerAttackLevel2(choice) {
    clearActions();

    let dano;
    if (choice === 1) {
      dano = randInt(15, 25);
      game.hpEnemy -= dano;
      appendLog(`Você acertou <b>SOCO ALADO</b> e causou ${dano} de dano.`);
    } else if (choice === 2) {
      dano = randInt(15, 20);
      game.hpEnemy -= dano;
      appendLog(`Você acertou <b>CABEÇADA SANGRENTA</b> e causou ${dano} de dano.`);
    } else if (choice === 3) {
      dano = randInt(25, 30);
      game.hpEnemy -= dano;
      appendLog(`Você aplicou <b>GOLPE BOXE DO POPÓ</b> e causou ${dano} de dano.`);
    } else {
      appendLog('Opção inválida.');
    }

    resolveTurn?.();
    resolveTurn = null;
    updateHUD();
  }

  async function turnEnemyLevel2() {
    await sleep(350);
    appendLog('');
    appendLog('<b>A capivara irá contra-atacar</b>');

    const ataque = randInt(0, 1);
    let dano;
    if (ataque === 1) {
      appendLog('');
      appendLog('OOOOOOOOHHH NÃO');
      appendLog('A capivara tentou lhe afogar!');
      dano = randInt(20, 30);
    } else {
      appendLog('');
      appendLog('OOOOOOOOHHH NÃO');
      appendLog('A Capivara deu uma super Cabeçada!');
      dano = randInt(22, 30);
    }

    game.hpPlayer -= dano;
    appendLog(`Sua vida agora é de <b>${game.hpPlayer}</b>.`);
    appendLog(imgCapivara);
    updateHUD();
  }

  async function runLevel2() {
    game.level = 2;
    game.hpPlayer = 200;
    game.hpEnemy = 200;
    updateHUD();

    while (game.hpPlayer > 0 && game.hpEnemy > 0 && game.running) {
      enableAttackMenu(2);
      await waitPlayerTurn();
      updateHUD();
      if (game.hpEnemy <= 0) break;

      await turnEnemyLevel2();
      updateHUD();
      if (game.hpPlayer <= 0) break;
    }

    if (!game.running) return;

    if (game.hpEnemy <= 0 && game.hpPlayer > 0) {
      clearActions();
      clearLog();
      appendLog(imgVitoria);
      appendLog('');
      appendLog('<b>PARABÉNS, VOCÊ VENCEU O JOGO!</b>');
      setStatus('Vitória');
      game.running = false;
      return;
    }

    clearActions();
    clearLog();
    appendLog(imgDerrota);
    appendLog('');
    appendLog('A capivara venceu.');
    setStatus('Derrota');
    game.running = false;
  }

  // Start
  showMenu();
})();

