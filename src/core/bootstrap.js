const Registry=require("./registry");
const Router=require("./router");
const Engine=require("./engine");

class Bootstrap{

    static async start(){

        console.log("");
        console.log("=================================");
        console.log("MULTICONFORT IA");
        console.log("Inicializando...");
        console.log("=================================");

        await Registry.load();

        await Router.load();

        await Engine.start();

    }

}

module.exports=Bootstrap;