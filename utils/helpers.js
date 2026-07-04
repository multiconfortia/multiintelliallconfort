function now(){

return new Date().toISOString();

}

function upper(text){

if(!text){

return "";

}

return text.trim().toUpperCase();

}

module.exports={

now,

upper

};