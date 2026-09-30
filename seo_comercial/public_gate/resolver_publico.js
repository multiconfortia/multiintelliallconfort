const fs = require("fs");
const path = require("path");
const gate = require("./vocabulario_gate");

const solucionesPath = path.join(
  __dirname,
  "..",
  "docs",
  "SOLUCIONES_MULTICONFORT_V1_GRANDE.json"
);

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
}

function slugificar(texto) {
  return normalizar(texto)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function construirResultado(solucion, vocablo) {
  return {
    permitido: true,
    motivo: "SOLUCION_AUTORIZADA",
    vocablo,
    solucion: {
      id: solucion.id,
      titulo: solucion.titulo,
      descripcion: solucion.descripcion,
      codigo_solucion_multiconfort_base20:
        solucion.codigo_solucion_multiconfort_base20
    }
  };
}

function resolverPublico(consulta) {
  const consultaOriginal = String(consulta || "").trim();

  const data =
    JSON.parse(fs.readFileSync(solucionesPath, "utf8")).soluciones || [];

  /*
   * 1. Primero intentamos coincidencia directa por vocablo.
   *
   * Ejemplo:
   * "refrigeracion"
   * "REFRIGERACION"
   */
  const texto = normalizar(consultaOriginal);

  const exacta = data.find(
    x =>
      x.publicable === true &&
      normalizar(x.vocablo) === texto
  );

  if (exacta) {
    return construirResultado(
      exacta,
      normalizar(exacta.vocablo)
    );
  }

  /*
   * 2. Si no existe coincidencia directa,
   *    tratamos la consulta como SLUG.
   *
   * Ejemplo:
   *
   * salas-limpias
   *       â†“
   * SALAS LIMPIAS
   */
  const slugConsulta = slugificar(consultaOriginal);

  const porSlug = data.find(
    x =>
      x.publicable === true &&
      slugificar(x.vocablo) === slugConsulta
  );

  if (porSlug) {
    return construirResultado(
      porSlug,
      normalizar(porSlug.vocablo)
    );
  }

  /*
   * 3. Si no existe soluciÃ³n directa,
   *    mantenemos la lÃ³gica del Public Gate.
   */
  const validacionInicial = gate.validarConsulta(texto);

  if (
    !validacionInicial.permitido &&
    validacionInicial.motivo === "VOCABLO_BLOQUEADO"
  ) {
    return {
      permitido: false,
      motivo: validacionInicial.motivo,
      vocablo: validacionInicial.vocablo,
      solucion: null
    };
  }

  const validacion = gate.validarConsulta(texto);

  if (!validacion.permitido) {
    return {
      permitido: false,
      motivo: validacion.motivo,
      vocablo: validacion.vocablo,
      solucion: null
    };
  }

  const vocablo = validacion.vocablo;

  const solucion = data.find(
    x =>
      x.publicable === true &&
      normalizar(x.vocablo) === vocablo
  );

  if (!solucion) {
    return {
      permitido: true,
      motivo: "VOCABLO_AUTORIZADO_SIN_SOLUCION",
      vocablo,
      solucion: null
    };
  }

  return construirResultado(solucion, vocablo);
}

module.exports = {
  resolverPublico
};
