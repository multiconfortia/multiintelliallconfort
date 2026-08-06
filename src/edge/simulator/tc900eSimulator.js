const EventEmitter = require("events");


class TC900ESimulator extends EventEmitter {

    constructor(){

        super();

        this.device = {
            id: "TC900E-SIM-001",
            manufacturer: "Full Gauge",
            model: "TC900E"
        };


        this.values = {

            temperature_room: 5.0,

            setpoint: 4.0,

            compressor_status: "OFF"

        };

    }


    start(){

        console.log(
            "TC900E Simulator iniciado"
        );


        setInterval(()=>{

            // Simulación temperatura variable
            this.values.temperature_room =
                Number(
                    (
                    this.values.temperature_room +
                    (Math.random() - 0.5)
                    ).toFixed(2)
                );


            // Estado compresor

            this.values.compressor_status =
                this.values.temperature_room >
                this.values.setpoint
                ?
                "ON"
                :
                "OFF";


            this.emit(
                "data",
                {

                device:this.device,

                values:this.values,

                timestamp:
                new Date()

                }

            );


        },3000);


    }


}


module.exports = TC900ESimulator;