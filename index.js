const animeCon = document.getElementById("container");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
const animeDetail = document.getElementById("detail");
const card = document.createElement("div");
card.className = "divCard"

/* RENDER */
function renderAnime(data) {
  animeCon.innerHTML = "";

  if (!data || data.length === 0) {
    animeCon.innerHTML = "<p>Anime tidak ditemukan</p>";
    return;
  }

  data.forEach((anime) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img class="img" src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
    `;

    animeCon.appendChild(card);
  });
}

/* LOAD DEFAULT */
async function loadTopAnime() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=12");
  const json = await res.json();
  renderAnime(json.data);
}

/* SEARCH API */
async function searchAnime(keyword) {
  if (keyword.length < 3) return;

  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(keyword)}`
    );

    const json = await res.json();
    renderAnime(json.data);
  } catch (err) {
    console.error(err);
  }
}

/* BUTTON CLICK */
btnSearch.addEventListener("click", () => {
  const keyword = searchInput.value.trim();

  if (keyword === "") {
    loadTopAnime();
  } else {
    searchAnime(keyword);
  }
});

async function detail(animeId) {
  const respost = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
  const APIres = await respost.json();
  const animeRes = APIres.data;

  animeDetail.innerHTML = `<img src="${animeRes.images.jpg.image_url}"/>
  <h3>${animeRes.title}</h3>
  <p>${animeRes.synopsis}</p>`;
}

card.addEventListener("clik", () => {
  detail(animeRes.mal_id);
  console.log("diklik")
});
/* LOAD AWAL */
loadTopAnime();
