// ======================================
// MULTICONFORT IA
// search.js
// Puente interfaz -> API -> Asistente IA
// ======================================


document.addEventListener("DOMContentLoaded",()=>{


    const form =
        document.getElementById("searchForm");


    if(!form) return;


    form.addEventListener("submit", async(e)=>{


        e.preventDefault();


        const input =
            document.getElementById("searchInput");


        const consulta =
            input.value.trim();


        if(!consulta){
            return;
        }


        const results =
            document.getElementById("searchResults");


        results.innerHTML =
        `
        <div class="alert alert-info">
            Consultando MULTICONFORT IA...
        </div>
        `;


        try{


            const response =
                await fetch(
                    "/api/consulta",
                    {

                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:
                        JSON.stringify({
                            consulta
                        })

                    }
                );


            const data =
                await response.json();



            let mensaje =
                "";



            if(data.datos &&
               data.datos.respuesta){


                mensaje =
                    data.datos.respuesta;


            }
            else if(data.respuesta){


                mensaje =
                    data.respuesta;


            }
            else{


                mensaje =
                    JSON.stringify(data);


            }



            results.innerHTML =

            `
            <div class="alert alert-success">

                <h4>
                🤖 MULTICONFORT IA
                </h4>

                <p>
                ${mensaje}
                </p>

            </div>
            `;



        }
        catch(error){


            results.innerHTML =

            `
            <div class="alert alert-danger">

            Error comunicando con MULTICONFORT IA

            </div>
            `;


            console.error(error);

        }


    });


});