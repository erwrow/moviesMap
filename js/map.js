/*
initMap -> 	Inicializa el mapa y genera los elementos dentro del mismo
			para poder buscar las películas.
clear 	->	Limpia los marcadores del mapa (esta función no es tan eficiente
			como reiniciar el mapa).
geocode ->	Convierte de ubicaciones (intersecciones entre calles o puntos 
			de interés) a coordenadas y genera los marcadores.
*/

let map;
let marker;
let geocoder;
let responseDiv;
let response;
let ubicacion;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {lat: 37.7749295, lng: -122.4194155},
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();
  
  const elBusqueda = document.createElement("div");
  
  if(regular)
  {
	elBusqueda.innerHTML = `<div>
		<input id="inputLista" list="lista" autocomplete="off" onchange="selectedMovie(this.value)" placeholder="Search for your favorite movies!" class="espaciador">
		<datalist id="lista" class="espaciador desplegable"></datalist>
	</div>`;
  }
  else
  {
	elBusqueda.innerHTML = `<div>
		<input id="inputLista" autocomplete="off" onkeyup="(event.keyCode === 13)?selectedMovie(this.value):null" oninput="searchMovies()" placeholder="Search for your favorite movies!" class="espaciador" onclick="document.getElementById('lista').style.display = 'block'; event.stopPropagation(); searchMovies();">
		<div id="lista" class="espaciador desplegable" style="display: none;" onwheel="searchMovies(event.deltaY)" onclick="document.getElementById('lista').style.display = 'block'; event.stopPropagation();"></div>
	</div>`;
  }
  
	
  const elMostrarTodo = document.createElement("div");
elMostrarTodo.innerHTML = `<button class="espaciadorTotal" onclick="showAll()">Show all</button>`;
	
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(elBusqueda);
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(elMostrarTodo);
  
  marker = new google.maps.Marker({
    map,
  });
  
  clear();
}

function clear() {
  marker.setMap(null);
}

function geocode(request, contentString) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
	  
	  let position = results[0].geometry.location;
	  
	  const infowindow = new google.maps.InfoWindow({
		content: contentString,
	  });
	  
	  const marker1 = new google.maps.Marker({
		position,
		map,
		optimized: false
	  });
	  
	  marker1.addListener("click", () => {
		event.stopPropagation();
		infowindow.open({
		  anchor: marker1,
		  map,
		  shouldFocus: false,
		});
	  });
	  
	  response.innerText = JSON.stringify(ubicacion);
      return results;
    })
    .catch((e) => {
      console.log("Geocode was not successful for the following reason: " + e);
    });
}

