// ======================================
// MULTICONFORT IA
// search.js V3
// HMI visual -> API -> Motor -> Resultados
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("searchForm");

    if (!form) return;

    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");


    // ======================================
    // BUSCADOR PRINCIPAL
    // ======================================

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const consulta = input.value.trim();

        if (!consulta) {
            input.focus();
            return;
        }


        results.innerHTML = `
            <div class="ai-search-status">
                <div class="ai-loading"></div>

                <strong>MULTICONFORT IA</strong>

                <span>
                    Analizando su consulta técnica...
                </span>
            </div>
        `;


        try {

            const response = await fetch("/api/consulta", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    consulta
                })

            });


            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }


            const data = await response.json();


            console.log("MULTICONFORT IA:", data);


            renderizarResultado(data, consulta);


        } catch (error) {

            console.error("MULTICONFORT IA:", error);

            results.innerHTML = `
                <div class="ai-search-error">

                    <div class="ai-result-brand">
                        🤖 MULTICONFORT IA
                    </div>

                    <h3>
                        No fue posible completar la consulta
                    </h3>

                    <p>
                        El servicio técnico no respondió correctamente.
                        Intente nuevamente.
                    </p>

                </div>
            `;

        }

    });


    // ======================================
    // RENDER PRINCIPAL
    // ======================================

    function renderizarResultado(data, consulta) {

        if (!data) {
            mostrarSinResultados(consulta);
            return;
        }


        const recomendacion = data.recomendacion;


        // ==================================
        // MOTOR CON RECOMENDACIÓN
        // ==================================

        if (
            recomendacion &&
            recomendacion.encontrado === true &&
            recomendacion.principal
        ) {

            renderizarRecomendacion(
                data,
                consulta
            );

            return;
        }


        // ==================================
        // RESPUESTAS TRADICIONALES
        // ==================================

        const contenido =
            extraerContenido(data);


        if (contenido) {

            results.innerHTML = `

                <div class="ai-result-card">

                    <div class="ai-result-brand">
                        🤖 MULTICONFORT IA
                    </div>

                    <div class="ai-result-query">
                        Consulta: ${escapeHTML(consulta)}
                    </div>

                    <div class="ai-result-content">
                        ${formatearContenido(contenido)}
                    </div>

                    <div class="ai-result-action">
                        <span>✓</span>
                        Información generada por el motor técnico
                    </div>

                </div>

            `;

            return;
        }


        mostrarSinResultados(consulta);

    }


    // ======================================
    // RECOMENDACIÓN DEL MOTOR
    // ======================================

    function renderizarRecomendacion(data, consulta) {

        const rec = data.recomendacion;

        const principal = rec.principal;

        const alternativas =
            Array.isArray(rec.alternativas)
                ? rec.alternativas
                : [];


        const total =
            Number(rec.total || 0);


        results.innerHTML = `

            <div class="ai-result-card ai-main-result">

                <div class="ai-result-brand">
                    🤖 MULTICONFORT IA
                </div>


                <div class="ai-result-query">
                    Consulta:
                    <strong>
                        ${escapeHTML(consulta)}
                    </strong>
                </div>


                <div class="ai-result-main-label">
                    SOLUCIÓN PRINCIPAL
                </div>


                <h3 class="ai-product-title">
                    ${escapeHTML(
                        obtenerTitulo(principal)
                    )}
                </h3>


                ${renderizarMarca(principal)}


                ${renderizarAtributos(
                    principal.atributos
                )}


                ${renderizarClasificacion(
                    principal
                )}


                <div class="ai-product-description">

                    ${formatearDescripcion(
                        principal.descripcion
                    )}

                </div>


                <div class="ai-confidence">

                    <span>
                        ✓ Coincidencia técnica
                    </span>

                    <strong>
                        ${escapeHTML(
                            String(
                                rec.confianza || 0
                            )
                        )}%
                    </strong>

                </div>


                <div class="ai-result-action">

                    <span>✓</span>

                    Solución identificada por
                    MULTICONFORT IA

                </div>

            </div>


            ${
                alternativas.length
                    ? renderizarAlternativas(
                        alternativas
                    )
                    : ""
            }


            <div class="ai-result-summary">

                <strong>
                    ${total}
                </strong>

                coincidencias relacionadas
                con su consulta.

            </div>

        `;

    }


    // ======================================
    // ALTERNATIVAS
    // ======================================

    function renderizarAlternativas(alternativas) {

        const visibles =
            alternativas
                .filter(item =>
                    item &&
                    (
                        item.descripcion ||
                        item.marca ||
                        item.atributos
                    )
                )
                .slice(0, 5);


        if (!visibles.length) {
            return "";
        }


        return `

            <div class="ai-alternatives">

                <div class="ai-alternatives-title">

                    OTRAS SOLUCIONES RELACIONADAS

                </div>


                <div class="ai-alternatives-grid">

                    ${visibles
                        .map(
                            item =>
                                renderizarAlternativa(item)
                        )
                        .join("")
                    }

                </div>

            </div>

        `;

    }


    function renderizarAlternativa(item) {

        const titulo =
            obtenerTitulo(item);


        const descripcion =
            limpiarDescripcion(
                item.descripcion || ""
            );


        return `

            <div class="ai-alternative-card">

                <div class="ai-alternative-brand">

                    ${escapeHTML(
                        item.marca || "MULTICONFORT"
                    )}

                </div>


                <h4>

                    ${escapeHTML(titulo)}

                </h4>


                ${renderizarAtributos(
                    item.atributos
                )}


                ${
                    descripcion
                        ? `
                            <p>
                                ${escapeHTML(
                                    recortar(
                                        descripcion,
                                        260
                                    )
                                )}
                            </p>
                          `
                        : ""
                }


                <button
                    type="button"
                    class="ai-solution-button"
                    data-producto="${escapeHTML(titulo)}"
                >
                    Ver solución técnica
                </button>

            </div>

        `;

    }


    // ======================================
    // ATRIBUTOS TÉCNICOS
    // ======================================

    function renderizarAtributos(atributos) {

        if (
            !atributos ||
            typeof atributos !== "object"
        ) {
            return "";
        }


        const campos = [];


        if (atributos.potencia_hp) {

            campos.push(
                "Potencia: " +
                formatearValor(
                    atributos.potencia_hp
                )
            );

        }


        if (atributos.refrigerante) {

            campos.push(
                "Refrigerante: " +
                formatearValor(
                    atributos.refrigerante
                )
            );

        }


        if (atributos.voltaje) {

            campos.push(
                "Voltaje: " +
                formatearValor(
                    atributos.voltaje
                )
            );

        }


        if (atributos.tipo_compresor) {

            campos.push(
                "Tipo: " +
                formatearValor(
                    atributos.tipo_compresor
                )
            );

        }


        if (!campos.length) {
            return "";
        }


        return `

            <div class="ai-result-specs">

                ${campos
                    .map(
                        campo =>
                            `<span>
                                ${escapeHTML(campo)}
                             </span>`
                    )
                    .join("")
                }

            </div>

        `;

    }


    // ======================================
    // MARCA
    // ======================================

    function renderizarMarca(producto) {

        if (!producto.marca) {
            return "";
        }


        return `

            <div class="ai-product-brand">

                Marca:
                <strong>
                    ${escapeHTML(
                        producto.marca
                    )}
                </strong>

            </div>

        `;

    }


    // ======================================
    // CLASIFICACIÓN
    // ======================================

    function renderizarClasificacion(producto) {

        if (
            !producto.familia &&
            !producto.subfamilia
        ) {
            return "";
        }


        return `

            <div class="ai-classification">

                ${
                    producto.familia
                        ? `
                            <span>
                                ${escapeHTML(
                                    producto.familia
                                )}
                            </span>
                          `
                        : ""
                }

                ${
                    producto.subfamilia
                        ? `
                            <span>
                                ${escapeHTML(
                                    producto.subfamilia
                                )}
                            </span>
                          `
                        : ""
                }

            </div>

        `;

    }


    // ======================================
    // TÍTULO
    // ======================================

    function obtenerTitulo(producto) {

        if (!producto) {
            return "Solución técnica";
        }


        const descripcion =
            limpiarDescripcion(
                producto.descripcion || ""
            );


        if (!descripcion) {

            if (producto.marca) {
                return producto.marca;
            }

            return "Solución técnica";

        }


        const clave =
            descripcion.match(
                /Clave:\s*([A-Z0-9._-]+)/i
            );


        if (clave) {

            return descripcion
                .split("Clave:")[0]
                .trim();

        }


        return recortar(
            descripcion,
            130
        );

    }


    // ======================================
    // DESCRIPCIÓN
    // ======================================

    function formatearDescripcion(texto) {

        const limpio =
            limpiarDescripcion(
                texto || ""
            );


        if (!limpio) {
            return "";
        }


        return `
            <p>
                ${escapeHTML(limpio)}
            </p>
        `;

    }


    function limpiarDescripcion(texto) {

        return String(texto)

            .replace(
                /<script[\s\S]*?<\/script>/gi,
                " "
            )

            .replace(
                /<style[\s\S]*?<\/style>/gi,
                " "
            )

            .replace(
                /<[^>]*>/g,
                " "
            )

            .replace(
                /window\.[a-zA-Z0-9_]+/g,
                " "
            )

            .replace(
                /\{[^{}]*\}/g,
                " "
            )

            .replace(
                /\s+/g,
                " "
            )

            .trim();

    }


    // ======================================
    // FORMATEAR TEXTO
    // ======================================

    function formatearContenido(texto) {

        if (typeof texto !== "string") {
            return "";
        }


        let html =
            escapeHTML(texto);


        html =
            html.replace(
                /\r?\n\r?\n/g,
                "</p><p>"
            );


        html =
            html.replace(
                /\r?\n/g,
                "<br>"
            );


        return `<p>${html}</p>`;

    }


    // ======================================
    // SIN RESULTADOS
    // ======================================

    function mostrarSinResultados(consulta) {

        results.innerHTML = `

            <div class="ai-result-card">

                <div class="ai-result-brand">
                    🤖 MULTICONFORT IA
                </div>


                <h3>
                    No encontramos una solución directa
                </h3>


                <p>

                    No encontramos información técnica
                    suficiente para

                    <strong>
                        ${escapeHTML(consulta)}
                    </strong>.

                </p>


                <div class="ai-result-action">

                    Pruebe con una marca,
                    modelo, capacidad,
                    refrigerante o aplicación.

                </div>

            </div>

        `;

    }


    // ======================================
    // UTILIDADES
    // ======================================

    function formatearValor(valor) {

        if (
            valor &&
            typeof valor === "object"
        ) {

            if (
                valor.valor !== undefined &&
                valor.unidad
            ) {

                return (
                    valor.valor +
                    " " +
                    valor.unidad
                );

            }


            if (
                valor.valor !== undefined
            ) {

                return String(
                    valor.valor
                );

            }

        }


        return String(valor);

    }


    function recortar(texto, maximo) {

        if (!texto) {
            return "";
        }


        if (texto.length <= maximo) {
            return texto;
        }


        return (
            texto.substring(
                0,
                maximo
            ).trim() +
            "..."
        );

    }


    function escapeHTML(texto) {

        return String(texto)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    // ======================================
    // BÚSQUEDAS POPULARES
    // ======================================

    document
        .querySelectorAll(
            ".popular-searches span"
        )
        .forEach((item) => {

            item.style.cursor =
                "pointer";


            item.addEventListener(
                "click",
                () => {

                    input.value =
                        item.textContent.trim();


                    form.dispatchEvent(
                        new Event(
                            "submit",
                            {
                                bubbles: true,
                                cancelable: true
                            }
                        )
                    );

                }
            );

        });

});
