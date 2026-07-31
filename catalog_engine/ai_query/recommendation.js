// ======================================
// MULTICONFORT IA
// recommendation.js
// Motor de recomendaciones HVACR
// ======================================

function recomendar(resultados) {

    if (!Array.isArray(resultados) ||
        resultados.length === 0) {

        return {

            encontrado: false,

            mensaje:
                "No se encontraron productos."

        };

    }

    resultados.sort(
        (a, b) => b.puntaje - a.puntaje
    );

    const principal =
        resultados[0];

    const alternativas =
        resultados.slice(1, 6);

    let nivel = "bajo";

    if (principal.puntaje >= 90)
        nivel = "alto";

    else if (principal.puntaje >= 70)
        nivel = "medio";

    return {

        encontrado: true,

        confianza:
            principal.puntaje,

        nivel_confianza:
            nivel,

        principal,

        alternativas,

        total:
            resultados.length

    };

}

module.exports = {
    recomendar
};