class SessionService{

constructor(){

this.sessions=new Map();

}

get(id){

return this.sessions.get(id);

}

set(id,data){

this.sessions.set(id,data);

}

exists(id){

return this.sessions.has(id);

}

remove(id){

this.sessions.delete(id);

}

clear(){

this.sessions.clear();

}

}

module.exports=new SessionService();