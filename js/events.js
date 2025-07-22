//chave das api
const ipGeoKey = "45a5fe6795a244c89c4ddf7d2ff437f2";
const apodKey = "Q7vAnoGct5NWdj2F7Yl0JMKw9ogZCrt3Wlvf7Y40";


//geolocationAPI
async function carregaIpGeolocation(cidade = "") {
  //depois vejo a possibilidade de colocar a busca por cidade

  // const url = cidade ? 'https://api.ipgeolocation.io/v2/astronomy?apiKey='+ipGeoKey+'&location=${encodeURIComponent(cidade)}'
  // : 'https://api.ipgeolocation.io/v2/astronomy?apiKey='+ipGeoKey;

  try {
    const data = await fetch("https://api.ipgeolocation.io/v2/astronomy?apiKey=45a5fe6795a244c89c4ddf7d2ff437f2")
    .then(res => res.json());

    console.log(data);
    document.getElementById("sol-info").innerHTML =
    `<div>
      <strong>Nascer do Sol em ${data.location.city}:</strong> <span class="text-gray-400">Esteja acordado(a) às <strong>${data.astronomy.sunrise}</strong> para ver o Sol nascer em ${data.location.city}<span>
    </div>
    <div>
      <strong>Pôr do Sol em ${data.location.city}:</strong> <span class="text-gray-400">Fique de olho no céu às <strong>${data.astronomy.sunset}</strong> para ver o Sol se pôr em ${data.location.city}<span>
    </div>`;

    document.getElementById("lua-info").innerHTML =
    `<div>
      <strong>Nascer da Lua em ${data.location.city}:</strong> <span class="text-gray-400">Olhe para o céu de ${data.location.city} às <strong>${data.astronomy.moonrise}</strong> para ver a Lua desaparecer<span>
    </div>
    <div>
      <strong>Pôr da Lua em ${data.location.city}:</strong> <span class="text-gray-400">Olhe para o céu de ${data.location.city} às <strong>${data.astronomy.moonset}</strong> para ver a Lua aparecer<span>
    </div>
    <div>
      <strong>Fase da Lua: </strong><span class="text-gray-400">A fase da Lua é <strong>${faseDaLuaEmPt(data.astronomy.moon_phase)}</strong></span>
    </div>
    `
  }catch(err) {
    console.log(err);
  }
}

function faseDaLuaEmPt(fase) {
  switch(fase) {
    case "NEW_MOON": return "Lua Nova";
    case "WAXING_CRESCENT": return "Lua Crescente";
    case "FIRST_QUARTER": return "Quarto Crescente";
    case "WAXING_GIBBOUS": return "Gibosa Crescente";
    case "FULL_MOON": return "Lua Cheia";
    case "WANING_GIBBOUS": return "Gibosa Minguante";
    case "LAST_QUARTER": return "Quarto Minguante";
    case "WANING_CRESCENT": return "Lua Minguante";
    default: return "Fase desconhecida";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregaIpGeolocation(); // por IP
  // carregaAPOD();       // foto do dia
});
