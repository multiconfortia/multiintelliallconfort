class Response{

    static ok(data){

        return{

            success:true,

            data:data

        };

    }

    static error(msg){

        return{

            success:false,

            message:msg

        };

    }

}

module.exports=Response;