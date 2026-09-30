const fs = require('fs');
const path = require('path');

const VOCABULARIO_PATH = path.join(
    __dirname,
    '..',
    'docs',
    'VOCABULARIO_PUBLICO_MULTICONFORT_V1.json'
);

function normalizar(texto) {
    return String(texto || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .trim()
        .replace(/\s+/g, ' ');
}

function cargarVocabulario() {
    return JSON.parse(fs.readFileSync(VOCABULARIO_PATH, 'utf8'));
}

function construirListaPermitida(vocabulario) {
    const permitido = vocabulario.permitido || {};
    const lista = [];

    for (const grupo of Object.values(permitido)) {
        if (Array.isArray(grupo)) {
            lista.push(...grupo);
        } else if (grupo && typeof grupo === 'object') {
            for (const valores of Object.values(grupo)) {
                if (Array.isArray(valores)) {
                    lista.push(...valores);
                }
            }
        }
    }

    return [...new Set(lista.map(normalizar).filter(Boolean))];
}

function construirListaBloqueada(vocabulario) {
    const bloqueado = vocabulario.bloqueado || {};
    const lista = [];

    for (const grupo of Object.values(bloqueado)) {
        if (Array.isArray(grupo)) {
            lista.push(...grupo);
        }
    }

    return [...new Set(lista.map(normalizar).filter(Boolean))];
}

function validarConsulta(consulta) {
    const texto = normalizar(consulta);
    const vocabulario = cargarVocabulario();

    const permitidos = construirListaPermitida(vocabulario);
    const bloqueados = construirListaBloqueada(vocabulario);

    const bloqueado = bloqueados.find(term => texto.includes(term));

    if (bloqueado) {
        return {
            permitido: false,
            motivo: 'VOCABLO_BLOQUEADO',
            vocablo: bloqueado
        };
    }

    const coincidencias = permitidos
        .filter(term => texto.includes(term))
        .sort((a, b) => b.length - a.length);

    if (!coincidencias.length) {
        return {
            permitido: false,
            motivo: 'VOCABLO_NO_AUTORIZADO',
            vocablo: null
        };
    }

    return {
        permitido: true,
        motivo: 'VOCABLO_AUTORIZADO',
        vocablo: coincidencias[0]
    };
}

module.exports = {
    normalizar,
    validarConsulta
};
