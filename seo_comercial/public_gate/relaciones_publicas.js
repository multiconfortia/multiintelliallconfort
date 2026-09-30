const fs = require('fs');
const path = require('path');

const solucionesPath = path.join(
  __dirname,
  '..',
  'docs',
  'SOLUCIONES_MULTICONFORT_V1_GRANDE.json'
);

function normalizar(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim()
    .replace(/\s+/g, ' ');
}

function slugificar(texto) {
  return normalizar(texto)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function obtenerSoluciones() {
  const data = JSON.parse(fs.readFileSync(solucionesPath, 'utf8'));
  return Array.isArray(data.soluciones)
    ? data.soluciones.filter(x => x.publicable === true)
    : [];
}

function palabrasUtiles(texto) {
  const excluidas = new Set([
    'DE','DEL','LA','LAS','EL','LOS','Y','EN','PARA','POR','CON','SIN','A'
  ]);

  return normalizar(texto)
    .split(/\s+/)
    .filter(x => x.length >= 3 && !excluidas.has(x));
}

function obtenerRelaciones(solucionActual, limite = 8) {
  if (!solucionActual || !solucionActual.vocablo) return [];

  const soluciones = obtenerSoluciones();
  const actual = normalizar(solucionActual.vocablo);
  const palabras = palabrasUtiles(actual);

  const candidatos = soluciones
    .filter(x => normalizar(x.vocablo) !== actual)
    .map(x => {
      const vocab = normalizar(x.vocablo);
      const palabrasCandidato = palabrasUtiles(vocab);

      let coincidencias = 0;
      for (const palabra of palabras) {
        if (palabrasCandidato.includes(palabra)) coincidencias++;
      }

      if (coincidencias === 0) return null;

      const tipo = String(x.tipo || '');
      let prioridad = 0;

      if (coincidencias >= palabras.length && palabras.length > 1) prioridad += 100;
      if (coincidencias >= 2) prioridad += 30;
      if (coincidencias === 1) prioridad += 10;
      if (tipo === 'BASE') prioridad += 2;
      if (tipo === 'FAMILIA_APLICACION') prioridad += 5;
      if (tipo === 'FAMILIA_TECNOLOGIA') prioridad += 5;
      if (tipo === 'CONCEPTO_APLICACION') prioridad += 8;
      if (tipo === 'CONCEPTO_TECNOLOGIA') prioridad += 8;
      if (tipo === 'TECNOLOGIA_APLICACION') prioridad += 8;
      if (tipo === 'CONCEPTO_APLICACION_TECNOLOGIA') prioridad += 6;

      return {
        id: x.id,
        vocablo: x.vocablo,
        titulo: x.titulo,
        descripcion: x.descripcion,
        tipo: x.tipo,
        codigo_solucion_multiconfort_base20: x.codigo_solucion_multiconfort_base20,
        slug: slugificar(x.vocablo),
        coincidencias,
        prioridad
      };
    })
    .filter(Boolean)
    .sort((a,b) => {
      if (b.prioridad !== a.prioridad) return b.prioridad - a.prioridad;
      if (b.coincidencias !== a.coincidencias) return b.coincidencias - a.coincidencias;
      return a.vocablo.localeCompare(b.vocablo);
    });

  return candidatos.slice(0, limite);
}

module.exports = {
  obtenerRelaciones,
  slugificar
};
