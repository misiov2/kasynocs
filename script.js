let wallet = 0;
let codeUsed = false;
const walletDisplay = document.getElementById('wallet');
const inventoryList = document.getElementById('inventory-list');

const skinPool = {
  normal: ['MP9 | Bioleak', 'P250 | Valence', 'Galil AR | Rocket Pop'],
  rare: ['AK-47 | Redline', 'M4A1-S | Leaded Glass'],
  epic: ['AWP | Hyper Beast', 'M4A4 | Howl', 'Glock-18 | Fade']
};

const caseChances = {
  2: { normal: 60, rare: 30, epic: 10 },
  10: { normal: 50, rare: 35, epic: 15 },
  20: { normal: 40, rare: 40, epic: 20 }
};

document.getElementById('redeem-code').addEventListener('click', () => {
  const code = document.getElementById('code-input').value.trim().toUpperCase();
  if (code === 'FREE' && !codeUsed) {
    wallet += 20;
    updateWallet();
    alert("Kod FREE aktywowany! +20 zł");
    codeUsed = true;
  } else {
    alert("Nieprawidłowy kod lub już użyty!");
  }
});

function updateWallet() {
  walletDisplay.textContent = wallet.toFixed(2);
}

function sellItem(value, li) {
  wallet += value;
  updateWallet();
  li.remove();
}

function getRandomSkin(price) {
  const chance = Math.random() * 100;
  const chances = caseChances[price];
  if (chance < chances.normal) {
    return { name: randomItem(skinPool.normal), value: getValue(price, 0.5, 1.1) };
  } else if (chance < chances.normal + chances.rare) {
    return { name: randomItem(skinPool.rare), value: getValue(price, 1.0, 1.6) };
  } else {
    return { name: randomItem(skinPool.epic), value: getValue(price, 1.5, 2.2) };
  }
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getValue(base, min, max) {
  return +(base * (min + Math.random() * (max - min))).toFixed(2);
}

document.querySelectorAll('.open-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const casePrice = parseInt(btn.parentElement.dataset.price);
    if (wallet < casePrice) {
      alert("Nie masz wystarczających środków!");
      return;
    }

    wallet -= casePrice;
    updateWallet();

    const spinContainer = btn.nextElementSibling;
    spinContainer.innerHTML = "";

    let spin = document.createElement('div');
    spin.style.display = 'inline-block';
    spin.style.animation = 'spin 2s linear forwards';

    for (let i = 0; i < 20; i++) {
      let span = document.createElement('span');
      span.style.margin = '0 10px';
      span.textContent = randomItem([...skinPool.normal, ...skinPool.rare, ...skinPool.epic]);
      spin.appendChild(span);
    }

    spinContainer.appendChild(spin);

    setTimeout(() => {
      const won = getRandomSkin(casePrice);
      let li = document.createElement('
