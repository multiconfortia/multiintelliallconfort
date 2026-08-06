const registry =
require("./deviceRegistry");


registry.registerDevice({

    id:"TC900E-SIM-001",

    manufacturer:"Full Gauge",

    model:"TC900E",

    type:"refrigeration_controller",

    driver:
    "fullgauge/tc900e",

    status:"online"

});


console.log(
"MULTICONFORT IA DEVICE REGISTRY"
);


console.log(
registry.getDevices()
);


console.log(
"Buscar dispositivo:"
);


console.log(
registry.getDeviceById(
"TC900E-SIM-001"
)
);