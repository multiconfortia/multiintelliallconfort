CREATE TABLE IF NOT EXISTS clientes(

id INTEGER PRIMARY KEY AUTOINCREMENT,

telefono TEXT UNIQUE,

nombre TEXT,

empresa TEXT,

ciudad TEXT,

estado TEXT,

fecha_alta TEXT,

ultimo_contacto TEXT

);

CREATE TABLE IF NOT EXISTS conversaciones(

id INTEGER PRIMARY KEY AUTOINCREMENT,

telefono TEXT,

mensaje TEXT,

tipo TEXT,

fecha TEXT

);

CREATE TABLE IF NOT EXISTS tickets(

id INTEGER PRIMARY KEY AUTOINCREMENT,

telefono TEXT,

tipo TEXT,

descripcion TEXT,

estado TEXT,

fecha TEXT

);

CREATE TABLE IF NOT EXISTS logs(

id INTEGER PRIMARY KEY AUTOINCREMENT,

nivel TEXT,

mensaje TEXT,

fecha TEXT

);