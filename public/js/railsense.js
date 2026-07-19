// =======================
// MAPA GIS
// =======================

let map = L.map('map')
.setView(
[19.4326,-99.1332],
13
);


L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}
).addTo(map);


// =======================
// RUTA EXPERIMENTAL
// =======================

let route = [

[19.4326,-99.1332],

[19.4350,-99.1400],

[19.4300,-99.1500],

[19.4200,-99.1450],

[19.4150,-99.1300]

];


let line = L.polyline(
route,
{
color:'blue'
}
).addTo(map);


map.fitBounds(line.getBounds());



// =======================
// TREN
// =======================

let train = L.marker(
route[0]
).addTo(map);



let point = 0;

let speed = 0;


// =======================
// SIMULACIÓN
// =======================

setInterval(()=>{


    if(point < route.length - 1){


        point++;


        train.setLatLng(
            route[point]
        );


        if(speed < 80){

            speed += 10;

        }


        document.getElementById("speed")
        .innerHTML = speed;



        document.getElementById("status")
        .innerHTML =
        "En movimiento";


    }

    else{


        document.getElementById("status")
        .innerHTML =
        "Llegada";


    }


},3000);