let wallet = 0;
let codeUsed = false;
const walletDisplay = document.getElementById('wallet');
const inventoryList = document.getElementById('inventory-list');

const skins = {
  2: ['MP9 | Bioleak', 'P250 | Valence', 'Galil AR | Rocket Pop', 'FAMAS | Mecha Industries'],
  10: ['AK-47 | Redline', 'M4A1-S | Leaded Glass', 'AWP | Atheris', 'USP-S | Cyrex'],
  20: ['AK-47 | Neon Rider', 'M4A4 | Desolate Space', 'AWP | Hyper Beast', 'Glock-18 | Fade']
};

document.getElementById('redeem-code').addEventListener('click', () => {
  if (!codeUsed) {
    wallet += 20;
    updateWallet();
    alert("Kod FREE aktywowany! +20 zł");
    codeUsed = true;
  } else {
    alert("Kod już użyty!");
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

document.querySelectorAll('.open-btn').forEach((btn, index) => {
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

    let caseSkins = skins[casePrice];
    let spin = document.createElement('div');
    spin.style.display = 'inline-block';
    spin.style.animation = 'spin 2s linear forwards';

    for (let i = 0; i < 20; i++) {
      let item = document.createElement('span');
      item.style.margin = '0 10px';
      item.textContent = caseSkins[Math.floor(Math.random() * caseSkins.length)];
      spin.appendChild(item);
    }

    spinContainer.appendChild(spin);

    setTimeout(() => {
      const won = caseSkins[Math.floor(Math.random() * caseSkins.length)];
      let li = document.createElement('li');
      let value = (casePrice * (0.6 + Math.random() * 1.5)).toFixed(2);
      li.innerHTML = `${won} – <strong>${value} zł</strong> <button onclick="sellItem(${value}, this.parentElement)">Sprzedaj</button>`;
      inventoryList.appendChild(li);
    }, 2000);
  });
});

// Animacja
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  0% { transform: translateX(0); }
  100% { transform: translateX(-80%); }
}`;
document.head.appendChild(style);
