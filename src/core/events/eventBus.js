const EventEmitter = require("events");


class MCEventBus extends EventEmitter {


    constructor(){

        super();

        this.setMaxListeners(50);

    }



    publish(
        eventName,
        payload
    ){

        this.emit(
            eventName,
            payload
        );

    }



    subscribe(
        eventName,
        callback
    ){

        this.on(
            eventName,
            callback
        );

    }


}


module.exports =
new MCEventBus();