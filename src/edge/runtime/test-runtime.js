const DeviceRuntime =
require("./deviceRuntime");


const runtime =
new DeviceRuntime();



runtime.on(
"deviceChange",
(event)=>{

console.log(
"MULTICONFORT IA EVENT"
);


console.log(
JSON.stringify(
event,
null,
2
)
);

});



const device = {

id:"FC102-SIM-001",

values:{}

};



runtime.register(device);



runtime.update(

"FC102-SIM-001",

{

run_status:"RUN",

frequency_output:42.5,

motor_current:17.85,

motor_power:7.65,

motor_speed:1275

}

);