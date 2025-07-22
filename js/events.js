//chave das api
const ipGeoKey = "45a5fe6795a244c89c4ddf7d2ff437f2";
const apodKey = "Q7vAnoGct5NWdj2F7Yl0JMKw9ogZCrt3Wlvf7Y40";

// const urlGeo = 'https://api.ipgeolocation.io/v2/astronomy?apiKey='+ipGeoKey; 

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
  }catch(err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregaIpGeolocation(); // por IP
  // carregaAPOD();       // foto do dia
});
