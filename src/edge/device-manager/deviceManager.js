const path = require("path");

const {
    registerDevice,
    getDeviceById
} = require("./deviceRegistry");

const {
    loadMCDDL
} = require("./mcddlLoader");


function createDevice(config){

    const mcddlPath = path.resolve(
        __dirname,
        "..",
        "drivers",
        config.driver,
        config.model.toLowerCase(),
        `${config.model.toLowerCase()}.mcddl.json`
    );


    const definition = loadMCDDL(mcddlPath);


    const device = {

        id: config.id,

        manufacturer:
        definition.device.manufacturer,

        model:
        definition.device.model,

        type:
        definition.device.type,

        driver:
        config.driver,

        status:"online",

        definition,

        values:{}

    };


    registerDevice(device);


    return device;

}



function updateDeviceValues(id, values){

    const device = getDeviceById(id);


    if(!device){

        throw new Error(
            "Dispositivo no encontrado"
        );

    }


    device.values = values;

    device.lastUpdate = new Date();


    return device;

}



module.exports = {

    createDevice,

    updateDeviceValues

};