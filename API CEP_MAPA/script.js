jQuery(function($){
    $('#CEP').focusout(function(){
       fetchCEP($('#CEP').val());
       $('#result').show();
       $('#map').show();
    });
});

const fetchCEP = async(CEP) => {
    const CEPResponse = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
    const data = await CEPResponse.json();
    fillCEP(data);
}

const fillCEP = async(data) => {

    let end = data.logradouro

    $('#endereco').val(end);
    $('#bairro').val(data.bairro);
    $('#cidade').val(data.localidade);
    $('#uf').val(data.uf);

    fetchMAP(end);
}

const fetchMAP = async(end) => {
    const MAPResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${end}&key=AIzaSyCmIHMH3F2414v9gYuF2xxC3a2e0VP3bHw`);
    const data = await MAPResponse.json();
    const data1 = data.results[0].geometry.location
    const lat = data1.lat
    const lng = data1.lng

    initMap(lat, lng)
}

function initMap(lat, lng) {
    const location = { lat, lng };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: location,
    });
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }
  