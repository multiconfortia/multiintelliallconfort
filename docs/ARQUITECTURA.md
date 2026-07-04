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