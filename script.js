// == GLOBAL SETTINGS ==
const PASSWORD = "4953";

// Игроки по фильтрам
let playersData = {
  all: [{name:"PlayerOverall", avatar:"", region:"na"}],
  tgk: [{name:"PlayerTGK", avatar:"", region:"eu"}],
  nft: [{name:"PlayerNFT", avatar:"", region:"na"}],
  rich: [{name:"PlayerRich", avatar:"", region:"eu"}]
};

// Текущий фильтр
let filter = "all";

// ======================
// РЕНДЕР СПИСКА
// ======================
function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const current = playersData[filter] || [];

  if(current.length === 0){
    list.innerHTML = `<div style="padding:20px;">Раздел "${filter.toUpperCase()}" пуст</div>`;
    return;
  }

  current.forEach((p, i)=>{
    const avatar = p.avatar || `https://mc-heads.net/avatar/${p.name}`;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="rank">${i+1}</div>
      <img class="avatar" src="${avatar}">
      <div>${p.name}</div>
      <div class="region ${p.region}">${p.region?.toUpperCase() || ''}</div>
    `;
    list.appendChild(card);
  });
}

// ======================
// ФИЛЬТРЫ
// ======================
function setFilter(f, el) {
  filter = f;
  document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
  el.classList.add("active");
  render();
}

// ======================
// МЕНЮ
// ======================
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// ======================
// ADMIN
// ======================
function openAdmin() {
  document.getElementById("admin").style.display = "flex";
}
function closeAdmin() {
  document.getElementById("admin").style.display = "none";
}
function login() {
  if(document.getElementById("pass").value === PASSWORD){
    document.getElementById("adminContent").style.display = "block";
  } else alert("wrong password");
}

// ======================
// КОПИРОВАНИЕ TG
// ======================
function copyTG() {
  const text = "https://t.me/exetiqueik";
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=> alert("Скопировано!"));
  } else {
    // fallback для старых браузеров
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Скопировано!");
  }
}

// ======================
// ИНИЦИАЛИЗАЦИЯ
// ======================
window.addEventListener("DOMContentLoaded", ()=>{
  render();
});

// ======================
// СДЕЛАТЬ ДОСТУПНЫМИ В ГЛОБАЛЬНОМ КОНТЕКСТЕ (HTML onclick)
// ======================
window.setFilter = setFilter;
window.toggleMenu = toggleMenu;
window.openAdmin = openAdmin;
window.closeAdmin = closeAdmin;
window.login = login;
window.copyTG = copyTG;
