const banner=require("./banner");

const server=require("./server");

const databaseService=require("../services/databaseService");

module.exports=function(){

banner();

databaseService();

server();

};