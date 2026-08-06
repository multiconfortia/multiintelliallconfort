const devices = [];


/**
 * Registrar dispositivo
 */
function registerDevice(device){

    devices.push(device);

    return device;

}


/**
 * Obtener todos los dispositivos
 */
function getDevices(){

    return devices;

}


/**
 * Buscar dispositivo por ID
 */
function getDeviceById(id){

    return devices.find(
        device => device.id === id
    );

}


module.exports = {

    registerDevice,
    getDevices,
    getDeviceById

};