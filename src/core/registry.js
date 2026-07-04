class Registry{

    static modules=[];

    static async load(){

        console.log("Cargando módulos...");

        this.modules=[];

    }

    static register(module){

        this.modules.push(module);

    }

}

module.exports=Registry;