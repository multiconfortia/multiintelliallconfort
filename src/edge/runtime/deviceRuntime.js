const EventEmitter = require("events");


class DeviceRuntime extends EventEmitter {


    constructor(){

        super();

        this.devices = {};

    }



    register(device){

        this.devices[device.id] = device;


        console.log(
            "Runtime conectado:",
            device.id
        );

    }



    update(
        deviceId,
        values
    ){


        const device =
        this.devices[deviceId];


        if(!device){

            throw new Error(
                "Dispositivo no registrado"
            );

        }



        const oldValues =
        {...device.values};



        device.values =
        values;



        const event = {

            event:
            "DEVICE_VALUE_CHANGED",

            device:
            deviceId,

            previous:
            oldValues,

            current:
            values,

            timestamp:
            new Date()

        };



        this.emit(
            "deviceChange",
            event
        );


        return event;

    }


}



module.exports = DeviceRuntime;