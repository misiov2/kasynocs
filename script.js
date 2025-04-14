let wallet = 0;
let codeUsed = false;
let currentCasePrice = 0;

const walletDisplay = document.getElementById('wallet');
const inventoryList = document.getElementById('inventory-list');

// Skiny – damy więcej później
const skinPool = {
  normal: [
    { name: 'P250 | Valence', img: 'img/skins/p250_valence.png', value: 1.1 },
    { name: 'MP9 | Bioleak', img: 'img/skins/mp9_bioleak.png', value: 1.4 },
    { name: 'Galil AR | Rocket Pop', img: 'img/skins/galil_rocketpop.png', value: 1.6 }
  ],
  rare: [
    { name: 'AK-47 | Redline', img: 'img/skins/ak_redline.png', value: 8.5 },
    { name: 'M4A1-S | Leaded Glass', img: 'img/skins/m4a1s_leadedglass.png', value: 11.2 }
  ],
  epic: [
    { name: 'AWP | Hyper Beast', img: 'img/skins/awp_hyperbeast.png', value: 20.0 },
    { name: 'M4A4 | Howl', img: 'img/skins/m4a4_howl.png', value: 35.0 }
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

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(`${id}-section`).style.display = 'block';
}

function openCaseModal(price) {
  currentCasePrice = price;
  document.getElementById('modal-title').textContent = `Skrzynka za ${price} zł`;
  document.getElementById('spinner').innerHTML = '';
  document.getElementById('case-modal').style.display = 'flex';
}

function closeCaseModal() {
  document.getElementById('case-modal').style.display = 'none';
}

document.getElementById('open-case-btn').addEventListener('click', () => {
  if (wallet < currentCasePrice) {
    alert("Nie masz wystarczających środków!");
    return;
  }

  wallet -= currentCasePrice;
  updateWallet();

  const spin = document.getElementById('spinner');
  spin.innerHTML = '';

  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.style.margin = '0 10px';
    span.textContent = randomItem([...skinPool.normal, ...skinPool.rare, ...skinPool.epic]).name;
    spin.appendChild(span);
  }

  setTimeout(() => {
    const won = getRandomSkin(currentCasePrice);
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${won.img}" alt="${won.name}" style="width:50px;">
      <div style="flex:1;">
        <div>${won.name}</div>
        <small><strong>${won.value} zł</strong></small>
      </div>
      <button onclick="sellItem(${won.value}, this.parentElement)">Sprzedaj</button>
    `;
    inventoryList.appendChild(li);
  }, 2000);
});

function getRandomSkin(price) {
  const chance = Math.random() * 100;
  const chances = caseChances[price];
  if (chance < chances.normal) return randomItem(skinPool.normal);
  else if (chance < chances.normal + chances.rare) return randomItem(skinPool.rare);
  else return randomItem(skinPool.epic);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sellItem(value, li) {
  wallet += value;
  updateWallet();
  li.remove();
}
