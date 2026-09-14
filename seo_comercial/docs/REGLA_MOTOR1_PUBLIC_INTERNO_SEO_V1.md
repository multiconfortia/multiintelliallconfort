# REGLA MOTOR 1 — PUBLIC / INTERNO / SEO

## Versión V1

**Proyecto:** MULTICONFORT IA
**Motor:** Motor 1
**Identidad comercial:** MULTICONFORT / MULTICONFOR
**Estado:** Regla arquitectónica propuesta
**Versión:** V1
**Fecha:** 2026-09-14

---

## 1. Propósito

Establecer la separación entre la información que MULTICONFORT IA necesita internamente para operar, diagnosticar y abastecer productos, y la información que debe exponerse públicamente al cliente y a los motores de búsqueda.

El objetivo es que **MULTICONFORT sea la identidad comercial, técnica y SEO de Motor 1**, sin perder internamente la inteligencia necesaria para localizar, adquirir y suministrar los productos.

---

## 2. Principio fundamental

> **MULTICONFORT es la identidad pública, comercial y SEO de Motor 1.**

La información sobre proveedores, fuentes de adquisición y procedencia de los productos constituye **inteligencia interna de abastecimiento**.

Dicha información no debe exponerse públicamente ni utilizarse para generar posicionamiento SEO de terceros, salvo que exista una decisión comercial explícita que indique lo contrario.

---

## 3. Separación PUBLIC / INTERNO

Motor 1 debe conceptualizarse en dos capas:

### 3.1 Capa PUBLIC

Es la información destinada al:

* cliente;
* HMI;
* buscador público;
* páginas de producto;
* contenido SEO;
* Google;
* JSON-LD público;
* resultados indexables.

La identidad comercial visible debe ser:

**MULTICONFORT**

La capa PUBLIC debe evitar la exposición innecesaria de:

* proveedores;
* fuentes de suministro;
* procedencia comercial;
* URLs internas de adquisición;
* identificadores internos de proveedores;
* textos provenientes de proveedores que no aporten valor técnico o comercial propio.

---

### 3.2 Capa INTERNO

Es la información utilizada por MULTICONFORT IA para operación, diagnóstico y abastecimiento.

Puede conservar:

* proveedor;
* fuente;
* dominio;
* URL de adquisición;
* código de proveedor;
* procedencia;
* archivo de origen;
* información necesaria para localizar el producto;
* información necesaria para adquirirlo;
* relaciones y equivalencias internas;
* datos útiles para suministro.

Esta información **no debe perderse simplemente por sanitizar la capa PUBLIC**.

---

## 4. Inteligencia de abastecimiento

Cuando un cliente solicite material, MULTICONFORT IA debe poder utilizar internamente la información de procedencia para responder a una necesidad de suministro.

Conceptualmente:

```text
SOLICITUD DEL CLIENTE
        |
        v
PRODUCTO / SOLUCIÓN
        |
        v
MULTICONFORT IA
        |
        +--> Diagnóstico técnico
        |
        +--> Identificación del producto
        |
        +--> Fuente interna de abastecimiento
        |
        +--> Ruta de adquisición
        |
        v
SUMINISTRO MULTICONFORT
```

El proveedor es un **medio interno para conseguir el producto**, no la identidad comercial que debe posicionarse frente al cliente.

---

## 5. Marcas de producto

Esta regla no implica falsificar marcas.

Si un producto tiene una marca comercial real y dicha marca aporta valor técnico al cliente, puede conservarse en la información pública correspondiente.

Ejemplos:

* Copeland
* Bitzer
* Danfoss
* Trane
* Carrier
* Bohn
* Flojet
* Koblenz
* Electrolux
* Maytag

La marca real del producto y el proveedor de abastecimiento son conceptos diferentes.

### Regla

> **Marca real del producto = información técnica/comercial del producto.**

> **Proveedor de abastecimiento = información interna de suministro.**

MULTICONFORT no debe sustituir artificialmente una marca real por MULTICONFORT.

---

## 6. Proveedores

Los proveedores pueden permanecer registrados en la capa INTERNO para permitir:

* adquisición;
* cotización;
* disponibilidad;
* rastreo;
* recuperación;
* sustitución;
* abastecimiento;
* auditoría interna.

Sin embargo, no deben convertirse automáticamente en:

* identidad comercial pública;
* título SEO;
* descripción SEO;
* keyword SEO;
* contenido indexable;
* nombre público del proveedor de la solución.

---

## 7. SEO y posicionamiento

La estrategia SEO de Motor 1 debe favorecer el posicionamiento de:

**MULTICONFORT**

y de sus capacidades, soluciones, productos y conocimiento técnico.

El contenido indexable debe priorizar:

* soluciones técnicas;
* productos;
* aplicaciones;
* sectores;
* especificaciones;
* compatibilidades;
* conocimiento técnico;
* problemas que MULTICONFORT resuelve;
* capacidad de suministro;
* autoridad técnica;
* trazabilidad y confiabilidad.

No debe generarse contenido SEO cuyo principal efecto sea posicionar gratuitamente a un proveedor de abastecimiento.

### Principio SEO

> **Google debe asociar las soluciones y el conocimiento técnico de Motor 1 con MULTICONFORT, no con las fuentes internas utilizadas para conseguir el material.**

---

## 8. Catálogo PUBLIC

El catálogo PUBLIC debe considerarse una **vista controlada del catálogo operativo**, no necesariamente una copia literal de todos los datos internos.

Conceptualmente:

```text
CATÁLOGO MAESTRO / OPERATIVO
              |
              +----------------------+
              |                      |
              v                      v
       CAPA INTERNO             CAPA PUBLIC
              |                      |
      abastecimiento            cliente / SEO
      procedencia               MULTICONFORT
      proveedores                producto
      URLs                       técnica
      trazabilidad               soluciones
              |                      |
              v                      v
       OPERACIÓN INTERNA       GOOGLE / HMI
```

---

## 9. Conservación de información

La sanitización PUBLIC **no debe implicar destrucción de la información interna**.

Antes de eliminar, reemplazar o modificar información de procedencia debe existir una versión interna o maestra que permita recuperar dicha información.

Regla:

> **Ocultar públicamente no significa destruir internamente.**

---

## 10. Aplicación a Motor 1

Esta regla aplica a:

* catálogo operativo;
* catálogo PUBLIC;
* buscador;
* HMI;
* resultados de consulta;
* recomendaciones;
* fichas de producto;
* JSON-LD;
* SEO;
* generación de contenido;
* futuras capas de suministro.

Debe considerarse antes de realizar modificaciones estructurales sobre el catálogo de Motor 1.

---

## 11. Caso de referencia actual

El catálogo `catalog_ia_v2.1_operator_v14_PUBLIC.json` contiene actualmente 3356 productos.

La auditoría realizada el 2026-09-14 identificó 376 productos con referencias a `Grupo Mereti`.

La información encontrada incluye campos de procedencia y otros campos públicos contaminados.

La decisión arquitectónica es:

> **No eliminar automáticamente esos productos.**

Primero debe separarse la información de abastecimiento de la información pública.

---

## 12. Regla de decisión

Ante cualquier dato encontrado en el catálogo:

### ¿Es información necesaria para identificar, comprender o utilizar el producto?

→ Puede pertenecer a PUBLIC.

### ¿Es información necesaria principalmente para saber dónde conseguirlo?

→ Pertenece a INTERNO.

### ¿Es información de un proveedor que no aporta valor al cliente?

→ No debe publicarse ni utilizarse para SEO.

### ¿Es una marca real del producto?

→ Se conserva cuando sea pertinente.

---

## 13. Principio comercial

> **MULTICONFORT no debe convertirse en una vitrina SEO gratuita para sus fuentes de abastecimiento.**

La inteligencia de suministro debe ayudar a MULTICONFORT a conseguir y suministrar el producto.

La presencia pública debe fortalecer:

**MULTICONFORT.**

---

## 14. Relación con futuras reglas maestras

Esta regla es una regla especializada de Motor 1.

Posteriormente podrá integrarse en:

`MOTOR1_REGLAS_MAESTRAS_V1.md`

junto con las reglas de:

* clasificación;
* búsqueda;
* ranking;
* procedencia;
* publicación;
* SEO;
* enriquecimiento;
* HMI.

Las reglas especializadas deben conservarse como documentos independientes aunque posteriormente exista un documento maestro consolidado.

---

## 15. Estado

**V1 — Definida para implementación y validación.**

No implica todavía modificaciones automáticas sobre el catálogo.

Toda intervención sobre el catálogo PUBLIC deberá realizarse mediante:

1. respaldo;
2. copia de trabajo;
3. modificación controlada;
4. validación;
5. comparación;
6. integración;
7. prueba HMI;
8. prueba SEO/publicación.
