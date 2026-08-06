class FC102Simulator {


    constructor(id){

        this.device = {

            id:id,

            manufacturer:"Danfoss",

            model:"VLT FC102",

            type:"variable_frequency_drive"

        };


        this.values = {

            run_status:"STOP",

            frequency_output:0,

            motor_current:0,

            motor_power:0,

            motor_speed:0,

            speed_reference:0

        };

    }



    start(){

        this.values.run_status="RUN";

    }



    stop(){

        this.values.run_status="STOP";

        this.values.frequency_output=0;

        this.values.motor_current=0;

        this.values.motor_power=0;

        this.values.motor_speed=0;

    }



    setFrequency(hz){

        this.values.frequency_output=hz;

        this.values.speed_reference=hz;


        if(hz>0){

            this.values.run_status="RUN";

        }


        this.values.motor_speed =
            Math.round(hz * 30);


        this.values.motor_current =
            Number((hz * 0.42).toFixed(2));


        this.values.motor_power =
            Number((hz * 0.18).toFixed(2));

    }



    getData(){

        return {

            device:this.device,

            values:this.values,

            timestamp:new Date()

        };

    }


}



module.exports = FC102Simulator;