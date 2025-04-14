let wallet = 0;
let codeUsed = false;
const walletDisplay = document.getElementById('wallet');
const inventoryList = document.getElementById('inventory-list');

const skinPool = {
  normal: [
    { name: 'MP9 | Bioleak', img: 'img/skins/mp9_bioleak.png' },
    { name: 'P250 | Valence', img: 'img/skins/p250_valence.png' },
    { name: 'Galil AR | Rocket Pop', img: 'img/skins/galil_rocketpop.png' },
    { name: 'MAC-10 | Oceanic', img: 'img/skins/mac10_oceanic.png' },
    { name: 'FAMAS | Mecha Industries', img: 'img/skins/famas_mecha.png' }
  ],
  rare: [
    { name: 'AK-47 | Redline', img: 'img/skins/ak_redline.png' },
    { name: 'M4A1-S | Leaded Glass', img: 'img/skins/m4a1s_leadedglass.png' },
    { name: 'USP-S | Guardian', img: 'img/skins/usps_guardian.png' },
    { name: 'Desert Eagle | Conspiracy', img: 'img/skins/deagle_conspiracy.png' }
  ],
  epic: [
    { name: 'AWP | Hyper Beast', img: 'img/skins/awp_hyperbeast.png' },
    { name: 'M4A4 | Howl', img: 'img/skins/m4a4_howl.png' },
    { name: 'Glock-18 | Fade', img: 'img/skins/glock_fade.png' }
  ]
};

const caseChances = {
  2: { normal: 85, rare: 13, epic: 2 },
  10: { normal: 75, rare: 20, epic: 5 },
  20: { normal: 65, rare: 25, epic: 10 }
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
    return Object.assign({}, randomItem(skinPool.normal), { value: getValue(price, 0.5, 1.1) });
  } else if (chance < chances.normal + chances.rare) {
    return Object.assign({}, randomItem(skinPool.rare), { value: getValue(price, 1.0, 1.6) });
  } else {
    return Object.assign({}, randomItem(skinPool.epic), { value: getValue(price, 1.5, 2.5) });
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
      span.textContent = randomItem([...skinPool.normal, ...skinPool.rare, ...skinPool.epic]).name;
      spin.appendChild(span);
    }

    spinContainer.appendChild(spin);

    setTimeout(() => {
      const won = getRandomSkin(casePrice);
      let li = document.createElement('li');
      li.innerHTML = `
        <img src=\"${won.img}\" alt=\"${won.name}\">
        <div style=\"flex: 1\">
          <div>${won.name}</div>
          <small><strong>${won.value} zł</strong></small>
        </div>
        <button onclick=\"sellItem(${won.value}, this.parentElement)\">Sprzedaj</button>
      `;
      inventoryList.appendChild(li);
    }, 2000);
  });
});

function toggleInventory() {
  document.querySelector('.inventory').classList.toggle('open');
}

// Animacja
const style = document.createElement('style');
style.textContent = `@keyframes spin {
  0% { transform: translateX(0); }
  100% { transform: translateX(-80%); }
}`;
document.head.appendChild(style);
