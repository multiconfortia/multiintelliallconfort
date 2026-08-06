const {
    createDevice,
    updateDeviceValues
} = require("./deviceManager");


const device = createDevice({

    id:"TC900E-SIM-001",

    model:"TC900E",

    driver:"fullgauge"

});


updateDeviceValues(

    "TC900E-SIM-001",

    {

        temperature_room:5.32,

        setpoint:4,

        compressor_status:"ON"

    }

);



console.log(
"MULTICONFORT IA DIGITAL DEVICE"
);



console.log(
JSON.stringify(
device,
null,
2
)
);