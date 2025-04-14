const openBtn = document.getElementById('open-case');
const result = document.getElementById('result');
const dropInfo = document.getElementById('drop-info');

const skins = [
  { name: "AK-47 | Redline", rarity: "rare", emoji: "🔴" },
  { name: "AWP | Asiimov", rarity: "legendary", emoji: "🟡" },
  { name: "Glock-18 | Fade", rarity: "epic", emoji: "🟣" },
  { name: "P250 | Sand Dune", rarity: "common", emoji: "⚪" },
  { name: "Knife | Karambit", rarity: "ultra", emoji: "💎" }
];

function getRandomSkin() {
  const randomIndex = Math.floor(Math.random() * skins.length);
  return skins[randomIndex];
}

openBtn.addEventListener('click', () => {
  result.textContent = "🎰";
  dropInfo.textContent = "";

  result.classList.remove("item");
  void result.offsetWidth; // restart animation trick
  result.classList.add("item");

  setTimeout(() => {
    const drop = getRandomSkin();
    result.textContent = drop.emoji;
    dropInfo.innerHTML = `🎉 Trafiłeś: <strong>${drop.name}</strong> (${drop.rarity})`;
  }, 2000);
});
