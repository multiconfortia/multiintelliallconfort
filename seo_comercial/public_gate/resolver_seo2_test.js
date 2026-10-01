const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', '..', 'catalog_engine', 'database', 'catalog_ia_v2.1_operator_v14.json');
const solutionsPath = path.join(__dirname, '..', 'docs', 'SOLUCIONES_MULTICONFORT_V1_GRANDE.json');

function cargarJson(archivo) {
  return JSON.parse(fs.readFileSync(archivo, 'utf8').replace(/^\uFEFF/, ''));
}

function normalizar(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(texto) {
  return normalizar(texto)
    .split(' ')
    .filter(t => t.length >= 2 && !['DE','DEL','LA','EL','PARA','CON','POR','Y','EN','UN','UNA'].includes(t));
}

function levenshtein(a, b) {
  a = String(a);
  b = String(b);
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array(b.length + 1).fill(0);
  let curr = Array(b.length + 1).fill(0);

  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + cost
      );
    }
    [prev, curr] = [curr, prev];
  }

  return prev[b.length];
}

function skeleton(texto) {
  return normalizar(texto).replace(/[AEIOU]/g, '');
}

function similitudToken(a, b) {
  a = normalizar(a);
  b = normalizar(b);

  if (!a || !b) return 0;
  if (a === b) return 1;

  const sa = skeleton(a);
  const sb = skeleton(b);

  if (sa && sb && sa === sb && sa.length >= 3) return 0.92;
  if (a.length >= 4 && b.length >= 4 && (a.includes(b) || b.includes(a))) return 0.92;
  if (a.length < 4 || b.length < 4) return 0;

  const d = levenshtein(a, b);
  return Math.max(0, 1 - d / Math.max(a.length, b.length));
}

function valor(producto, campos) {
  for (const campo of campos) {
    const v = campo.split('.').reduce((o, k) => o && o[k], producto);
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return String(v);
    }
  }
  return '';
}

function textoInternoProducto(p) {
  const campos = [
    ['marca', 4],
    ['modelo', 4],
    ['codigo_mc', 3.5],
    ['codigo_proveedor', 3.5],
    ['nombre', 3],
    ['descripcion', 2],
    ['familia', 2.5],
    ['subfamilia', 2.5],
    ['categoria', 2],
    ['identidad_mapa', 2]
  ];

  return campos.map(([c]) => valor(p, [c]))
    .filter(Boolean)
    .join(' ') + ' ' + JSON.stringify(p.atributos || {});
}

function puntuarProducto(consulta, p) {
  const qNorm = normalizar(consulta);
  const qTokens = tokens(consulta);

  if (!qNorm || !qTokens.length) return 0;

  const partes = [
    ['marca', 4],
    ['modelo', 4],
    ['codigo_mc', 3.5],
    ['codigo_proveedor', 3.5],
    ['nombre', 3],
    ['descripcion', 2],
    ['familia', 2.5],
    ['subfamilia', 2.5],
    ['categoria', 2],
    ['identidad_mapa', 2]
  ];

  let score = 0;

  for (const [campo, peso] of partes) {
    const v = normalizar(valor(p, [campo]));
    if (!v) continue;

    const vTokens = v.split(' ').filter(Boolean);

    if (v.includes(qNorm)) score += 1.35 * peso;

    let fieldBest = 0;

    for (const qt of qTokens) {
      let tokenBest = 0;

      for (const ct of vTokens) {
        tokenBest = Math.max(tokenBest, similitudToken(qt, ct));
      }

      fieldBest += tokenBest;
    }

    score += (fieldBest / qTokens.length) * peso;
  }

  return score;
}

function esMismaFamilia(a, b) {
  const x = normalizar(a).replace(/S$/, '');
  const y = normalizar(b).replace(/S$/, '');

  return x && y && (x === y || x.includes(y) || y.includes(x));
}

function construirResultado(solucion, metodo, diagnostico) {
  return {
    permitido: true,
    motivo: 'SOLUCION_AUTORIZADA_SEO2',
    vocablo_solucion: normalizar(solucion.vocablo),
    solucion: {
      id: solucion.id,
      titulo: solucion.titulo,
      descripcion: solucion.descripcion,
      codigo_solucion_multiconfort_base20:
        solucion.codigo_solucion_multiconfort_base20
    },
    ...(diagnostico
      ? {
          diagnostico: {
            metodo,
            evidencia: diagnostico
          }
        }
      : {})
  };
}

function resolverSEO2(consulta, opciones = {}) {
  const texto = String(consulta || '').trim();
  const q = normalizar(texto);

  const solucionesData = cargarJson(solutionsPath);

  const soluciones = Array.isArray(solucionesData.soluciones)
    ? solucionesData.soluciones.filter(x => x.publicable === true)
    : [];

  const catalogoData = cargarJson(catalogPath);

  const catalogo = Array.isArray(catalogoData)
    ? catalogoData
    : (catalogoData.productos || catalogoData.products || []);

  if (!q) {
    return {
      permitido: false,
      motivo: 'CONSULTA_VACIA',
      solucion: null
    };
  }

  // 1) Entrada ya conocida como vocablo de soluciÃƒÂ³n.
  const exacta = soluciones.find(
    x => normalizar(x.vocablo) === q
  );

  if (exacta) {
    return construirResultado(
      exacta,
      'VOCABLO_EXACTO',
      { vocablo: exacta.vocablo }
    );
  }

  // 2) La entrada puede venir como slug.
  const slug = q.toLowerCase().replace(/\s+/g, '-');

  const porSlug = soluciones.find(
    x =>
      normalizar(x.vocablo)
        .toLowerCase()
        .replace(/\s+/g, '-') === slug
  );

  if (porSlug) {
    return construirResultado(
      porSlug,
      'SLUG_EXACTO',
      { vocablo: porSlug.vocablo }
    );
  }

  // 3) Descubrimiento amplio usando evidencia INTERNA del catÃƒÂ¡logo.
  const ranking = catalogo
    .map(p => ({
      producto: p,
      score: puntuarProducto(texto, p)
    }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  const mejor = ranking[0];

  if (!mejor || mejor.score < 5.0) {
    return {
      permitido: false,
      motivo: 'SIN_EVIDENCIA_SUFICIENTE',
      solucion: null
    };
  }

  const p = mejor.producto;

  const familia = valor(p, ['familia']);
  const subfamilia = valor(p, ['subfamilia']);
  const categoria = valor(p, ['categoria']);
  const identidad = valor(p, ['identidad_mapa', 'atributos.familia']);
  // Prioridad de interpretacion:
  // 1) identidad MULTICONFORT interna
  // 2) subfamilia
  // 3) familia
  // 4) categoria
  //
  // Una categoria general como REFRIGERACION no debe
  // ganar cuando existe una identidad mas especifica
  // como COMPRESORES.

  const pistasPriorizadas = [
    ['IDENTIDAD_MAPA', identidad],
    ['SUBFAMILIA', subfamilia],
    ['FAMILIA', familia],
    ['CATEGORIA', categoria]
  ].filter(([,v]) => v);

  // 4) Gate de salida: unicamente soluciones ya autorizadas.
  let candidata = null;
  let metodo = '';

  for (const [tipoPista, pista] of pistasPriorizadas) {
    candidata = soluciones.find(
      x => esMismaFamilia(x.vocablo, pista)
    );

    if (candidata) {
      metodo = 'EVIDENCIA_CATALOGO_A_SOLUCION_' + tipoPista;
      break;
    }
  }

  if (!candidata) {
    const textos = soluciones.map(x => ({
      x,
      t: normalizar(
        [x.vocablo, x.titulo, x.descripcion].join(' ')
      )
    }));

    let best = {
      x: null,
      score: 0
    };

    for (const item of textos) {
      let s = 0;

      for (const pista of pistas) {
        const pt = tokens(pista);
        const ct = tokens(item.t);

        if (!pt.length || !ct.length) continue;

        let local = 0;

        for (const a of pt) {
          for (const b of ct) {
            local = Math.max(
              local,
              similitudToken(a, b)
            );
          }
        }

        s += local / pt.length;
      }

      if (s > best.score) {
        best = {
          x: item.x,
          score: s
        };
      }
    }

    if (best.x && best.score >= 0.9) {
      candidata = best.x;
      metodo = 'EVIDENCIA_CATALOGO_A_SOLUCION_SEMANTICA';
    }
  }

  if (!candidata) {
    return {
      permitido: false,
      motivo: 'SIN_SOLUCION_AUTORIZADA',
      solucion: null
    };
  }

  return construirResultado(
    candidata,
    metodo,
    opciones.diagnostico
      ? {
          score_catalogo: Number(mejor.score.toFixed(3)),
          familia,
          subfamilia,
          categoria,
          identidad_mapa: identidad,
          evidencia_interna: textoInternoProducto(p).slice(0, 500)
        }
      : undefined
  );
}

module.exports = { resolverSEO2 };
