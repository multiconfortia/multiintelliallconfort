// ======================================
// MULTICONFORT IA
// MOTOR DE DUPLICADOS HVACR
// Version 1.0
// ======================================


function normalizarTexto(texto){

    return (texto || "")
        .toUpperCase()
        .replace(/[^A-Z0-9]/g,"")
        .trim();

}



// ======================================
// COMPARACION DE TEXTO
// ======================================


function similitudTexto(a,b){

    a = normalizarTexto(a);
    b = normalizarTexto(b);


    if(!a || !b)
        return 0;


    let coincidencias = 0;


    const longitud =
        Math.min(
            a.length,
            b.length
        );


    for(
        let i = 0;
        i < longitud;
        i++
    ){

        if(a[i] === b[i]){

            coincidencias++;

        }

    }


    return Math.round(
        (coincidencias /
        Math.max(a.length,b.length))
        *100
    );


}




// ======================================
// COMPARAR ATRIBUTOS
// ======================================


function compararAtributos(
    a,
    b
){

    let puntos = 0;
    let total = 0;


    const atributos = [

        "potencia_hp",
        "voltaje",
        "frecuencia",
        "refrigerante",
        "capacidad_btu",
        "rpm"

    ];



    for(
        const campo of atributos
    ){

        total++;


        if(

            a?.atributos_tecnicos
            ?.atributos
            ?. [campo]

            &&

            b?.atributos_tecnicos
            ?.atributos
            ?. [campo]

        ){


            if(

                a.atributos_tecnicos.atributos[campo]
                ===
                b.atributos_tecnicos.atributos[campo]

            ){

                puntos++;

            }


        }


    }


    if(total===0)
        return 0;


    return Math.round(
        (puntos/total)*100
    );


}





// ======================================
// CALCULO DE SIMILITUD PRODUCTO
// ======================================


function calcularSimilitud(
    productoA,
    productoB
){


    let resultado = {

        porcentaje:0,

        razones:[]

    };



    let puntos = 0;



    // -------------------------------
    // DESCRIPCION
    // -------------------------------


    const desc =
    similitudTexto(
        productoA.descripcion,
        productoB.descripcion
    );


    if(desc > 60){

        puntos += 40;

        resultado.razones.push(
            "Descripción similar"
        );

    }



    // -------------------------------
    // MARCA
    // -------------------------------


    if(

        productoA.marca &&
        productoB.marca &&

        productoA.marca.toUpperCase()
        ===
        productoB.marca.toUpperCase()

    ){

        puntos += 20;


        resultado.razones.push(
            "Misma marca"
        );

    }



    // -------------------------------
    // MODELO
    // -------------------------------


    if(

        productoA.modelo &&
        productoB.modelo &&

        normalizarTexto(
            productoA.modelo
        )
        ===
        normalizarTexto(
            productoB.modelo
        )

    ){

        puntos += 30;


        resultado.razones.push(
            "Mismo modelo"
        );

    }



    // -------------------------------
    // ATRIBUTOS
    // -------------------------------


    const atr =
    compararAtributos(
        productoA,
        productoB
    );


    if(atr >= 50){

        puntos +=10;


        resultado.razones.push(
            "Atributos técnicos compatibles"
        );

    }



    resultado.porcentaje =
        Math.min(
            puntos,
            100
        );


    return resultado;


}




// ======================================
// BUSCAR DUPLICADOS
// ======================================


function detectarDuplicados(
    productos
){


    let duplicados=[];



    for(
        let i=0;
        i<productos.length;
        i++
    ){


        for(
            let j=i+1;
            j<productos.length;
            j++
        ){


            const resultado =
            calcularSimilitud(
                productos[i],
                productos[j]
            );



            if(
                resultado.porcentaje >= 70
            ){


                duplicados.push({

                    producto_1:
                        productos[i].codigo_mc
                        ||
                        productos[i].descripcion,


                    producto_2:
                        productos[j].codigo_mc
                        ||
                        productos[j].descripcion,


                    similitud:
                        resultado.porcentaje,


                    razones:
                        resultado.razones


                });


            }


        }


    }



    return duplicados;


}





module.exports = {


    detectarDuplicados,

    calcularSimilitud


};