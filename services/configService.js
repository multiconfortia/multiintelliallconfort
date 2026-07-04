const config=require("../config/config");

module.exports={

get(){

return config;

},

app(){

return config.app;

},

database(){

return config.database;

},

ollama(){

return config.ollama;

}

};