const eventBus =
require("./eventBus");



eventBus.subscribe(

"DEVICE_VALUE_CHANGED",

(event)=>{


console.log(
"EVENTO RECIBIDO POR MC BUS"
);


console.log(
JSON.stringify(
event,
null,
2
)
);


}

);



const data = {


device:
"FC102-SIM-001",


variable:
"frequency_output",


value:
42.5,


unit:
"Hz"


};



eventBus.publish(

"DEVICE_VALUE_CHANGED",

data

);