// ======================================
// MULTICONFORT IA
// INDEX BUILDER
// ======================================

function construirIndice(producto) {

    const partes = [];


    // ==========================
    // CAMPOS PRINCIPALES
    // ==========================

    partes.push(producto.descripcion || "");
    partes.push(producto.marca || "");
    partes.push(producto.familia || "");
    partes.push(producto.subfamilia || "");



    // ==========================
    // SINÓNIMOS COMERCIALES
    // ==========================

    // ==========================
// ATRIBUTOS
// ==========================

if (producto.atributos) {

    partes.push(
        JSON.stringify(producto.atributos)
    );

}


// ==========================
// SINÓNIMOS IA
// ==========================

if (producto.sinonimos) {

    partes.push(
        JSON.stringify(producto.sinonimos)
    );

}


// ==========================
// ENTIDADES IA
// ==========================

if (producto.entidades_ia) {

    partes.push(
        JSON.stringify(producto.entidades_ia)
    );

}


    

    



    // ==========================
    // CONOCIMIENTO IA
    // ==========================

    if (producto.conocimiento_ia) {

        partes.push(
            JSON.stringify(producto.conocimiento_ia)
        );

    }



    // ==========================
    // TEXTO INDEXADO
    // ==========================

    return partes
    .join(" ")
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[-_]/g,"");

}



module.exports = {

    construirIndice

};