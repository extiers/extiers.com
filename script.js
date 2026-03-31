document.addEventListener("DOMContentLoaded", () => {

const PASSWORD = "4953";

/* Игроки — по 1 на фильтр */
let playersData = {
  all: [{name:"PlayerOverall", avatar:"", region:"na"}],
  tgk: [{name:"PlayerTGK", avatar:"", region:"eu"}],
  nft: [{name:"PlayerNFT", avatar:"", region:"na"}],
  rich: [{name:"PlayerRich", avatar:"", region:"eu"}]
};

let filter = "all";

/* Рендер раздела */
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

/* Фильтры */
window.setFilter = function(f, el) {
  filter = f;
  document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
  el.classList.add("active");
  render();
}

/* MENU */
window.toggleMenu = function() {
  const menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

/* ADMIN */
window.openAdmin = function() {
  document.getElementById("admin").style.display = "flex";
}
window.closeAdmin = function() {
  document.getElementById("admin").style.display = "none";
}
window.login = function() {
  if(document.getElementById("pass").value === PASSWORD){
    document.getElementById("adminContent").style.display = "block";
  } else alert("wrong password");
}

/* TG COPY */
window.copyTG = function() {
  const text = "https://t.me/exetiqueik";
  navigator.clipboard?.writeText(text)
    .then(()=> alert("Скопировано!"))
    .catch(()=>{
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Скопировано!");
    });
}

/* INIT */
render();

});
