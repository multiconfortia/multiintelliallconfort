// =======================
// MULTICONFORT RailSense EDGE™
// Simulación ferroviaria v1.2
// =======================


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
// RUTA EXPERIMENTAL MX-01
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
        color:'blue',
        weight:5
    }
).addTo(map);



map.fitBounds(
    line.getBounds()
);




// =======================
// ESTACIONES
// =======================

let stations = [

"Horizonte",

"Central",

"Norte",

"Industrial",

"Terminal"

];




// =======================
// TREN
// =======================

let train = L.marker(
    route[0]
).addTo(map);



let segment = 0;

let progress = 0;



// velocidad real
let currentSpeed = 0;


// velocidad solicitada
let targetSpeed = 60;


// aceleración
let acceleration = 2;



let running = false;

let paused = false;


let timer = null;



// actualización
let interval = 100;




// =======================
// INICIAR
// =======================

function startTrain(){


if(running)
return;



running=true;

paused=false;



if(targetSpeed<=0){

targetSpeed=60;

document.getElementById("speedControl").value=60;

}



document.getElementById("status")
.innerHTML="Acelerando";



timer=setInterval(
moveTrain,
interval
);



}




// =======================
// PAUSA
// =======================

function pauseTrain(){


if(!running)
return;



clearInterval(timer);


running=false;

paused=true;



document.getElementById("status")
.innerHTML="Pausa";



}




// =======================
// PARO OPERATIVO
// =======================

function stopTrain(){



targetSpeed=0;



document.getElementById("status")
.innerHTML="Frenando";



if(!running){


timer=setInterval(
moveTrain,
interval
);


running=true;


}



}




// =======================
// RESET
// =======================

function resetTrain(){


clearInterval(timer);



running=false;


segment=0;

progress=0;


currentSpeed=0;

targetSpeed=60;



train.setLatLng(
route[0]
);



document.getElementById("speed")
.innerHTML=0;


document.getElementById("speedControl")
.value=60;



document.getElementById("station")
.innerHTML=
stations[0];



document.getElementById("curve")
.innerHTML=
"---";



document.getElementById("status")
.innerHTML=
"Preparado";



}




// =======================
// CONTROL VELOCIDAD
// =======================

function changeSpeed(value){


targetSpeed=parseInt(value);



document.getElementById("status")
.innerHTML=
"Ajustando velocidad";



}





// =======================
// MOVIMIENTO
// =======================

function moveTrain(){



// -----------------------
// Aceleración / frenado
// -----------------------

if(currentSpeed < targetSpeed){

currentSpeed += acceleration;


if(currentSpeed > targetSpeed){

currentSpeed = targetSpeed;

}

}



if(currentSpeed > targetSpeed){

currentSpeed -= acceleration;


if(currentSpeed < targetSpeed){

currentSpeed = targetSpeed;

}

}




document.getElementById("speed")
.innerHTML =
Math.round(currentSpeed);




// -----------------------
// Si está detenido
// -----------------------

if(currentSpeed<=0){

document.getElementById("status")
.innerHTML="Detenido";

return;

}




// -----------------------
// Movimiento continuo
// -----------------------

if(segment >= route.length-1){


clearInterval(timer);


running=false;


document.getElementById("status")
.innerHTML="Llegada";


return;

}




let start = route[segment];

let end = route[segment+1];




// avance proporcional

progress += currentSpeed / 15000;



if(progress>=1){


progress=0;


segment++;


document.getElementById("station")
.innerHTML=
stations[segment];


return;

}




let lat = 
start[0] +
(end[0]-start[0])
*
progress;



let lng =
start[1] +
(end[1]-start[1])
*
progress;



train.setLatLng(
[
lat,
lng
]
);



document.getElementById("curve")
.innerHTML=
"Normal";



document.getElementById("status")
.innerHTML=
"En marcha";



}




// =======================
// EXPONER FUNCIONES
// PARA BOTONES HTML
// =======================

window.startTrain=startTrain;

window.pauseTrain=pauseTrain;

window.stopTrain=stopTrain;

window.resetTrain=resetTrain;

window.changeSpeed=changeSpeed;



console.log(
"🚆 MULTICONFORT RailSense EDGE™ activo"
);