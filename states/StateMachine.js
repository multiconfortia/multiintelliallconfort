class StateMachine{

constructor(){

this.states=new Map();

}

set(id,state){

this.states.set(id,state);

}

get(id){

return this.states.get(id)||"START";

}

reset(id){

this.states.set(id,"START");

}

}

module.exports=new StateMachine();