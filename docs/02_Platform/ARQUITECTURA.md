# MULTICONFORT-AI Enterprise

## Versión

v0.2

---

# Objetivo

Desarrollar una plataforma empresarial para el sector HVACR que integre:

- WhatsApp
- CRM
- Dashboard Web
- IA híbrida
- RAG
- Tickets
- Cotizaciones
- Historial técnico
- Automatización

---

# Principios

- Un archivo = una responsabilidad
- Arquitectura modular
- Configuración centralizada
- Código reutilizable
- Escalable
- Compatible con Windows y Raspberry Pi
- Compatible con Ollama
- Compatible con SQLite y futuras BD

---

# Arquitectura General

Usuario
      │
      ▼
WhatsApp Engine
      │
      ▼
Message Router
      │
      ▼
State Machine
      │
      ├── Ventas
      ├── Servicio
      ├── Diagnóstico
      ├── Refacciones
      ├── Facturación
      └── Asesor
      │
      ▼
Business Rules
      │
      ▼
CRM
      │
      ▼
RAG
      │
      ▼
Ollama
      │
      ▼
Respuesta

---

# Arquitectura Física

app.js
    │
    ▼
src/init.js
    │
    ├── ConfigLoader
    ├── Logger
    ├── Database
    ├── Express
    ├── WhatsApp
    ├── Scheduler
    ├── StateMachine
    └── Services

---

# Estructura del Proyecto

MULTICONFORT-AI/

config/
controllers/
dashboard/
database/
docs/
legacy/
logs/
middlewares/
models/
prompts/
public/
rag/
routes/
services/
src/
states/
uploads/
utils/

---

# Flujo de un mensaje

Mensaje recibido

↓

Validación

↓

Identificación del usuario

↓

Carga de sesión

↓

Obtención del estado

↓

Motor de reglas

↓

¿Existe respuesta directa?

├── Sí → Responder
│
└── No
      ↓
Consulta RAG
      ↓
Consulta Ollama
      ↓
Validación
      ↓
Guardar historial
      ↓
Responder

---

# Máquina de estados

START

↓

SALUDO

↓

IDENTIFICAR_INTENCION

├── VENTAS
├── SERVICIO
├── DIAGNOSTICO
├── REFACCIONES
├── FACTURACION
├── ASESOR

↓

RECOLECTAR_DATOS

↓

CONFIRMAR

↓

GENERAR_TICKET

↓

SEGUIMIENTO

↓

FINALIZAR

---

# Base de datos

clientes

conversaciones

mensajes

estados

tickets

equipos

cotizaciones

seguimientos

logs

configuracion

documentos_rag

embeddings

---

# IA híbrida

Prioridad:

1. Reglas de negocio

↓

2. Base de conocimiento

↓

3. RAG

↓

4. Ollama

↓

5. Respuesta final

---

# Objetivo final

Construir un Ingeniero HVACR Virtual capaz de:

- Diagnosticar equipos
- Consultar manuales
- Generar tickets
- Elaborar cotizaciones
- Administrar clientes
- Dar seguimiento automático
- Aprender de documentación técnica
- Integrarse con sistemas industriales

---

# Roadmap

v0.1 ✅ Arquitectura

v0.2 ✅ Core Engine

v0.3 ⏳ WhatsApp Engine

v0.4 ⏳ CRM

v0.5 ⏳ Dashboard

v0.6 ⏳ IA híbrida

v0.7 ⏳ RAG

v0.8 ⏳ Automatización


Sí, y de hecho tomaste una muy buena decisión. ✅

Lo que acabas de crear ya no es un simple README, sino el Documento de Arquitectura del proyecto, y será la referencia para todo el desarrollo futuro.

Mi evaluación
Sección	Estado
Objetivo	✅
Principios	✅
Arquitectura General	✅
Arquitectura Física	✅
Flujo de mensajes	✅
Máquina de estados	✅
Base de datos	✅
IA híbrida	✅
Roadmap	✅

Calificación actual: 9.5/10 ⭐⭐⭐⭐⭐

Sin embargo, yo agregaría unas secciones más
1. Convenciones de nombres
# Convenciones

## Archivos

camelCase

Ejemplos:

configService.js

databaseService.js

messageRouter.js

sessionManager.js

## Clases

PascalCase

Ejemplos:

StateMachine

WhatsAppService

CRMController

## Variables

camelCase

Ejemplos:

clientId

currentState

ticketNumber

## Constantes

MAYÚSCULAS

Ejemplos:

DEFAULT_STATE

MAX_HISTORY

OLLAMA_TIMEOUT
2. Capas del sistema
Usuario

↓

WhatsApp

↓

API

↓

Controllers

↓

Services

↓

Business Rules

↓

State Machine

↓

RAG

↓

Ollama

↓

Database

↓

Respuesta
3. Dependencias entre módulos
app.js

↓

init.js

↓

Config

↓

Logger

↓

Database

↓

Express

↓

WhatsApp

↓

Router

↓

Controllers

↓

Services

↓

AI
4. Estructura futura
MULTICONFORT-AI

config/

controllers/

database/

dashboard/

docs/

legacy/

logs/

middlewares/

models/

prompts/

public/

rag/

routes/

services/

src/

states/

uploads/

utils/

tests/

scripts/

backups/
5. Flujo de IA
Pregunta

↓

Normalización

↓

Motor de reglas

↓

¿Existe respuesta?

│

├── Sí

│      ↓

│   Responder

│

└── No

↓

Buscar en RAG

↓

¿Encontró información?

│

├── Sí

│      ↓

│  Construir contexto

│

└── No

↓

Enviar a Ollama

↓

Validar

↓

Guardar

↓

Responder
6. Estados posibles
START

MENU

VENTAS

SERVICIO

DIAGNOSTICO

REFACCIONES

FACTURACION

ASESOR

ESPERANDO_DATOS

CONFIRMACION

GENERAR_TICKET

SEGUIMIENTO

FINALIZADO

ERROR
7. Modelo de Base de Datos
clientes
    id
    nombre
    telefono

conversaciones
    id
    cliente_id

mensajes
    id
    conversacion_id

tickets
    id
    estado

equipos

cotizaciones

seguimientos

logs

usuarios

documentos

embeddings
8. Objetivo de la IA
La IA nunca responderá primero con creatividad.

Prioridad:

1. Reglas internas

2. Información del CRM

3. Manuales (RAG)

4. Ollama

5. Inferencia

6. Respuesta
9. Integraciones futuras
WhatsApp

Telegram

Web

Email

BACnet

Modbus

MQTT

REST API

Dashboard
10. Norma del proyecto
Ningún archivo deberá superar aproximadamente 300 líneas.

Toda funcionalidad nueva deberá implementarse en un módulo independiente.

Todo cambio deberá compilar antes de continuar.

Todo módulo deberá documentarse.
📌 Mi recomendación

A partir de este momento, crea una carpeta:

docs/

y guarda ahí este documento como:

docs/
    ARQUITECTURA.md

No lo dejes en la raíz del proyecto. Con el crecimiento de MULTICONFORT-AI, la carpeta docs será el lugar para la documentación técnica (ARQUITECTURA.md, ROADMAP.md, API.md, DATABASE.md, etc.).

Además, propongo una mejora metodológica

Antes de seguir con la Entrega #3, dedicaremos una versión v0.2.1 exclusivamente a estabilizar la arquitectura (estructura de carpetas, documentación y convenciones). Esa inversión inicial hará que el desarrollo de los siguientes 6,000–10,000 líneas de código sea mucho más ordenado y mantenible.



v1.0 ⏳ Producción




// sigue 2da version:

# MULTICONFORT IA - ARQUITECTURA DEL ECOSISTEMA

**Documento:** `docs/01_ARCHITECTURE.md`

**Versión:** v2.0

**Estado:** En desarrollo

---

# Propósito

Este documento define la arquitectura general de **MULTICONFORT IA**, estableciendo los principios, módulos, componentes y reglas que regirán el desarrollo de toda la plataforma.

Este documento es la referencia técnica principal del proyecto y deberá actualizarse conforme evolucione la arquitectura.

---

# Visión

MULTICONFORT IA no es una aplicación.

No es únicamente un ERP.

No es únicamente un chatbot.

No es únicamente una tienda en línea.

Es un **ecosistema inteligente para la industria HVACR**, diseñado para integrar conocimiento técnico, inteligencia artificial, automatización industrial, comercio electrónico, monitoreo, simulación y gestión empresarial dentro de una única plataforma.

Su propósito es conectar el conocimiento, las personas, los equipos y los procesos durante todo el ciclo de vida de un sistema HVACR.

---

# Objetivos

Desarrollar una plataforma capaz de integrar:

* Ingeniería HVACR
* Building Management Systems (BMS)
* Automatización Industrial
* Inteligencia Artificial
* Knowledge Graph
* RAG
* CRM
* ERP
* Tienda en línea
* Productos propios MULTICONFORT
* Productos de fabricantes
* Servicios de ingeniería
* Gemelos Digitales (Digital Twin)
* Plataforma de Simulación
* IoT Industrial
* WhatsApp Assistant
* APIs
* Sistemas industriales

---

# Filosofía de Diseño

La arquitectura se basa en los siguientes principios:

* Una única Base de Conocimiento para todo el ecosistema.
* Arquitectura modular.
* Bajo acoplamiento entre módulos.
* Alta cohesión.
* Escalabilidad horizontal.
* Código reutilizable.
* Configuración centralizada.
* Versionado del conocimiento.
* IA basada en evidencia.
* Todo se comunica mediante APIs.
* Todo elemento del sistema es una entidad.
* Toda relación queda documentada.
* Todo conocimiento tiene una fuente.
* Todo conocimiento tiene un nivel de confianza.

---

# Principios de Desarrollo

* Un archivo = una responsabilidad.
* Un módulo = una responsabilidad.
* Ningún archivo deberá crecer innecesariamente.
* Toda funcionalidad nueva deberá implementarse mediante módulos independientes.
* Todo módulo deberá documentarse.
* Todo cambio deberá compilar y probarse antes de integrarse.
* Compatible con Windows.
* Compatible con Linux.
* Compatible con Raspberry Pi.
* Compatible con Docker (futuro).

---

# Arquitectura General

```text
                               INTERNET

                                   │

                   ┌───────────────┴────────────────┐
                   │                                │
              Plataforma Web                 Aplicaciones Futuras

                                   │

                           API Gateway

                                   │

============================================================

                 MULTICONFORT IA PLATFORM

============================================================

Knowledge Platform

AI Platform

Communication Platform

Industrial Platform

Commerce Platform

ERP Platform

Simulation Platform

Digital Twin Platform

Learning Platform

API Platform

============================================================

Knowledge Database

Knowledge Graph

============================================================

ESP32

PLC

BACnet

Modbus

MQTT

SQLite

PostgreSQL (futuro)

============================================================
```

---

# Plataformas del Ecosistema

## 1. Knowledge Platform

Responsable de adquirir, organizar y relacionar conocimiento.

Incluye:

* Catálogos PDF
* Listas de precios
* Manuales
* OCR
* Excel
* CSV
* Imágenes
* Sitios Web
* APIs
* WhatsApp
* Documentación interna

---

## 2. AI Platform

Responsable del razonamiento del sistema.

Componentes:

* Entity Recognition
* Attribute Extraction
* Knowledge Merge
* Knowledge Graph
* Search Engine
* Recommendation Engine
* RAG
* LLM
* Response Generator

La IA responde utilizando primero el conocimiento estructurado y posteriormente los modelos de lenguaje cuando sea necesario.

---

## 3. Communication Platform

Integra todos los canales de comunicación.

Incluye:

* WhatsApp
* Web Chat
* Email
* Telegram (futuro)
* API
* Aplicaciones móviles (futuro)

---

## 4. Commerce Platform

Gestiona el comercio digital.

Incluye:

* Tienda en línea
* Catálogos
* Productos propios
* Productos de fabricantes
* Soluciones completas
* Compatibilidades
* Accesorios relacionados
* Recomendaciones inteligentes

La plataforma vende soluciones, no únicamente productos.

---

## 5. ERP Platform

Incluye:

* CRM
* Clientes
* Inventario
* Compras
* Ventas
* Facturación
* Servicios
* Cotizaciones
* Garantías
* Órdenes de trabajo
* Proyectos

---

## 6. Industrial Platform

Preparada para integrar:

* ESP32
* PLC
* BACnet
* Modbus
* MQTT
* Sensores
* Controladores
* Históricos
* Alarmas
* Dashboards

---

## 7. Simulation Platform

Permite simular sistemas HVACR completos.

Ejemplos:

* Chillers
* UMAs
* Fan & Coil
* VRF
* Cámaras frigoríficas
* Laboratorios
* Sistemas de agua helada

El objetivo es capacitación, validación y entrenamiento.

---

## 8. Digital Twin Platform

Cada cliente podrá disponer de un modelo digital de su instalación.

Incluye:

* Equipos
* Sensores
* Variables
* Alarmas
* Históricos
* Mantenimiento
* IA personalizada

---

## 9. Learning Platform

Aprende continuamente mediante:

* Nuevos catálogos
* Nuevos fabricantes
* Nuevas listas de precios
* Consultas Web
* WhatsApp
* Retroalimentación
* Experiencia técnica

El aprendizaje conversacional nunca modifica directamente el conocimiento técnico validado.

---

# Arquitectura de IA

Prioridad de decisión:

1. Reglas de negocio.
2. Base de Conocimiento.
3. Knowledge Graph.
4. CRM.
5. RAG.
6. LLM.
7. Inferencia.
8. Respuesta.

El modelo de lenguaje nunca será la primera fuente de verdad.

---

# Flujo IA

```text
Pregunta

↓

Normalización

↓

Entity Recognition

↓

Business Rules

↓

Knowledge Database

↓

Knowledge Graph

↓

Search Engine

↓

Recommendation Engine

↓

RAG

↓

LLM

↓

Response Generator

↓

Guardar aprendizaje

↓

Responder
```

---

# Flujo de Aprendizaje

```text
Nueva Fuente

↓

OCR

↓

Texto

↓

Normalización

↓

Entidades

↓

Atributos

↓

Relaciones

↓

Detección de duplicados

↓

Knowledge Merge

↓

Validación

↓

Knowledge Database
```

---

# Modelo de Conocimiento

Todo elemento es una entidad.

Ejemplos:

* Producto
* Marca
* Fabricante
* Equipo
* Compresor
* Refrigerante
* Aceite
* Sensor
* Cliente
* Servicio
* Documento
* Manual
* Proyecto
* Proveedor
* Imagen
* Video
* Curso

Todas las entidades pueden relacionarse entre sí mediante un Knowledge Graph.

---

# Niveles de Confianza

| Nivel | Fuente                        |
| ----- | ----------------------------- |
| 100   | Manual oficial del fabricante |
| 95    | Ficha técnica oficial         |
| 90    | Catálogo oficial              |
| 80    | Documento interno validado    |
| 70    | Varias fuentes coincidentes   |
| 50    | Inferencia IA                 |
| 30    | Aprendizaje conversacional    |

---

# Convenciones

## Archivos

camelCase

Ejemplos:

* configService.js
* databaseService.js
* knowledgeEngine.js

## Clases

PascalCase

Ejemplos:

* KnowledgeGraph
* SearchEngine
* RecommendationEngine

## Variables

camelCase

## Constantes

MAYÚSCULAS

---

# Dependencias

```text
app.js

↓

init.js

↓

Config

↓

Logger

↓

Database

↓

API

↓

Controllers

↓

Services

↓

Knowledge Core

↓

AI Platform

↓

Business Platform

↓

Industrial Platform
```

---

# Integraciones

* REST API
* WebSocket
* WhatsApp
* Telegram (futuro)
* Email
* ESP32
* PLC
* BACnet
* Modbus
* MQTT
* SQLite
* PostgreSQL
* Docker (futuro)

---

# Estructura General

```text
MULTICONFORT IA

README.md

/docs

01_ARCHITECTURE.md

02_KNOWLEDGE_PLATFORM.md

03_AI_ENGINE.md

04_COMMUNICATION_PLATFORM.md

05_COMMERCE_PLATFORM.md

06_ERP_PLATFORM.md

07_SIMULATION_PLATFORM.md

08_DIGITAL_TWIN_PLATFORM.md

09_INDUSTRIAL_PLATFORM.md

10_DATABASE.md

11_API.md

12_ROADMAP.md

CHANGELOG.md

/catalog_engine

/knowledge_core

/ai_query

/api

/erp

/hmi

/simulation

/commerce

/industrial

/tests

/scripts

/backups
```

---

# Roadmap de Arquitectura

## v1.x

* Arquitectura inicial.
* WhatsApp Engine.
* CRM.
* IA híbrida.
* Dashboard.

## v2.x (Actual)

* Plataforma de conocimiento.
* Knowledge Graph.
* Catálogo inteligente.
* Productos propios.
* Tienda en línea.
* ERP.
* API.
* Simulación.
* Digital Twin.
* Integración industrial.

## v3.x

* Marketplace HVACR.
* Academia MULTICONFORT.
* Mantenimiento predictivo.
* IA multimodal.
* Agentes especializados.
* Integración con múltiples clientes.

---

# Objetivo Final

Construir una plataforma inteligente especializada en HVACR capaz de integrar conocimiento técnico, automatización industrial, comercio electrónico, productos propios, servicios de ingeniería, simulación, gemelos digitales, monitoreo en tiempo real e inteligencia artificial, proporcionando un ecosistema unificado para fabricantes, distribuidores, ingenieros, técnicos y clientes.

> **"Toda información que ingresa al ecosistema debe convertirse en conocimiento reutilizable. Todo conocimiento debe estar disponible para apoyar decisiones, operaciones, aprendizaje y servicios dentro de MULTICONFORT IA."**
