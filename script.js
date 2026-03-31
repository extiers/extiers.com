document.addEventListener("DOMContentLoaded", () => {

  const PASSWORD = "4953";

  /* Игроки — по категориям */
  let playersData = {
    all: [
      {name: "PlayerOverall", avatar: "", region: "na"},
      {name: "TestPlayer1", avatar: "", region: "eu"}
    ],
    tgk: [
      {name: "PlayerTGK", avatar: "", region: "eu"},
      {name: "KillerTGK", avatar: "https://i.imgur.com/example.jpg", region: "na"}
    ],
    nft: [
      {name: "PlayerNFT", avatar: "", region: "na"}
    ],
    rich: [
      {name: "PlayerRich", avatar: "", region: "eu"},
      {name: "RichLord", avatar: "", region: "na"}
    ]
  };

  let filter = "all";

  /* Рендер списка */
  function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const current = playersData[filter] || [];

    if (current.length === 0) {
      list.innerHTML = `<div style="padding:20px; color:#888;">Раздел "${filter.toUpperCase()}" пока пуст</div>`;
      return;
    }

    current.forEach((p, i) => {
      const avatar = p.avatar || `https://mc-heads.net/avatar/${p.name}`;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="rank">${i+1}</div>
        <img class="avatar" src="\( {avatar}" alt=" \){p.name}">
        <div>${p.name}</div>
        <div class="region \( {p.region}"> \){p.region?.toUpperCase() || ''}</div>
      `;
      list.appendChild(card);
    });
  }

  /* === Обработчики фильтров === */
  document.querySelectorAll('.filter').forEventListener('click', function() {
    const newFilter = this.getAttribute('data-filter');
    
    document.querySelectorAll('.filter').forEach(el => el.classList.remove('active'));
    this.classList.add('active');

    filter = newFilter;
    render();
  });

  /* MENU */
  window.toggleMenu = function() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
  };

  /* ADMIN */
  window.openAdmin = function() {
    document.getElementById("admin").style.display = "flex";
  };

  window.closeAdmin = function() {
    document.getElementById("admin").style.display = "none";
  };

  window.login = function() {
    if (document.getElementById("pass").value === PASSWORD) {
      document.getElementById("adminContent").style.display = "block";
    } else {
      alert("Неверный пароль");
    }
  };

  /* TG COPY */
  window.copyTG = function() {
    const text = "https://t.me/exetiqueik";
    navigator.clipboard?.writeText(text)
      .then(() => alert("Скопировано!"))
      .catch(() => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Скопировано!");
      });
  };

  /* INIT */
  render();
});
