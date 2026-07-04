class Engine{

    static async start(){

        console.log("Motor iniciado");

    }

    static async execute(request){

        return{

            success:true,
            message:"OK"

        };

    }

}

module.exports=Engine;