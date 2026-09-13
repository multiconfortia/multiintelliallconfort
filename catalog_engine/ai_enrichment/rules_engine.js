// ======================================
// MULTICONFORT IA
// MOTOR DE REGLAS HVACR
// VERSION 3.2.1
//
// OBJETIVO:
// Clasificar productos externos mediante:
//
// 1. Codigo de proveedor
// 2. Descripcion comercial
// 3. Palabras clave HVACR
//
// FLUJO:
//
// CODIGO
//    â†“
// DESCRIPCION
//    â†“
// CATEGORIA
//    â†“
// FAMILIA
//    â†“
// SUBFAMILIA
//
// V3.2.1
// - Compatible con V3.1 / V3.2
// - Codigo conserva prioridad principal
// - Descripcion refina cuando corresponde
// - Reglas especificas antes de generales
// - Marca separada de clasificacion
// - Reduce falsos positivos
// - Mejora controladores
// - Mejora deteccion de refrigerantes
// - No modifica catalogo maestro
// ======================================


// ============================================================
// NORMALIZACION
// ============================================================

function normalizarTexto(texto) {

    return String(texto || "")
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();

}


// ============================================================
// CLASIFICACION POR CODIGO
// ============================================================

function clasificarPorCodigo(codigo) {

    if (!codigo) return null;

    const c = normalizarTexto(codigo);


    // ========================================================
    // EVAPORADORES CRIOS - ECRE
    // ========================================================

    if (c.startsWith("ECRE")) {

        return {
            categoria: "Refrigeracion",
            familia: "Evaporadores",
            subfamilia: "Evaporadores baja temperatura"
        };

    }


    // ========================================================
    // EVAPORADORES CRIOS - ECRA
    // ========================================================

    if (c.startsWith("ECRA")) {

        return {
            categoria: "Refrigeracion",
            familia: "Evaporadores",
            subfamilia: "Evaporadores media temperatura"
        };

    }


    // ========================================================
    // RESISTENCIAS
    // ========================================================

    if (c.startsWith("RES-")) {

        return {
            categoria: "Electrico HVAC",
            familia: "Resistencias y calefaccion",
            subfamilia: "Elementos calefactores"
        };

    }


    // ========================================================
    // CONEXIONES BRONCE
    // ========================================================

    if (c.startsWith("BRO-")) {

        return {
            categoria: "Refrigeracion",
            familia: "Conexiones",
            subfamilia: "Conexiones de bronce"
        };

    }


    // ========================================================
    // EMPAQUES
    // ========================================================

    if (c.startsWith("EMP-")) {

        return {
            categoria: "Refacciones",
            familia: "Sellos y empaques",
            subfamilia: "Empaques refrigeracion"
        };

    }


    // ========================================================
    // MOTORES
    // ========================================================

    if (c.startsWith("MOT-")) {

        return {
            categoria: "Componentes HVAC",
            familia: "Motores electricos",
            subfamilia: "Motores electricos HVAC"
        };

    }


    // ========================================================
    // FILTROS
    // ========================================================

    if (c.startsWith("FIL-")) {

        return {
            categoria: "Refrigeracion",
            familia: "Filtracion",
            subfamilia: "Filtros deshidratadores"
        };

    }


    // ========================================================
    // CINTAS
    // ========================================================

    if (c.startsWith("CIN-")) {

        return {
            categoria: "Material HVAC",
            familia: "Cintas tecnicas",
            subfamilia: "Sellado y aislamiento"
        };

    }


    // ========================================================
    // AISLAMIENTO
    // ========================================================

    if (c.startsWith("AIS-")) {

        return {
            categoria: "Aislamiento",
            familia: "Material aislante",
            subfamilia: "Adhesivos y espumas"
        };

    }


    // ========================================================
    // VALVULAS DE SERVICIO
    // ========================================================

    if (c.startsWith("VSE-")) {

        return {
            categoria: "Refrigeracion",
            familia: "Valvulas",
            subfamilia: "Valvulas de servicio"
        };

    }


    // ========================================================
    // CONTROL
    // ========================================================

    if (c.startsWith("CON-")) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Accesorios de control",
            subfamilia: "Termostatos y accesorios"
        };

    }


    // ========================================================
    // LIMPIEZA
    // ========================================================

    if (c.startsWith("FOA-")) {

        return {
            categoria: "Quimicos HVAC",
            familia: "Limpieza",
            subfamilia: "Limpiadores de serpentin"
        };

    }


    // ========================================================
    // INSTALACION
    // ========================================================

    if (c.startsWith("INS-")) {

        return {
            categoria: "Instalacion HVAC",
            familia: "Aislamiento y selladores",
            subfamilia: "Espumas y adhesivos"
        };

    }


    // ========================================================
    // ASPAS
    // ========================================================

    if (c.startsWith("ASP-")) {

        return {
            categoria: "Componentes HVAC",
            familia: "Ventilacion",
            subfamilia: "Aspas y helices"
        };

    }


    // ========================================================
    // RELEVADORES
    // ========================================================

    if (c.startsWith("REL-")) {

        return {
            categoria: "Electrico HVAC",
            familia: "Control electrico",
            subfamilia: "Relevadores"
        };

    }


    // ========================================================
    // ADAPTADORES
    // ========================================================

    if (c.startsWith("VEX-")) {

        return {
            categoria: "Refrigeracion",
            familia: "Conexiones",
            subfamilia: "Adaptadores de valvula"
        };

    }


    return null;

}



// ============================================================
// CLASIFICACION POR DESCRIPCION
// ============================================================

function clasificarPorDescripcion(descripcion) {
    const texto = normalizarTexto(descripcion).replace(/\bMINI[- ]SPLIT\b/g, "MINISPLIT");

    if (!texto) return null;


    // ========================================================
    // V3.2.12 - PRIORIDAD SEMANTICA
    //
    // Determina primero el OBJETO PRINCIPAL del producto.
    //
    // PRODUCTO PRINCIPAL > COMPONENTE MENCIONADO
    //
    // Ejemplo:
    // MINISPLIT + COMPRESOR + R32 + CONDENSADORA
    //                  ↓
    //               MINISPLIT
    // ========================================================


    // ========================================================
    // PRIORIDAD 1: MINISPLIT
    // ========================================================

    if (
        texto.includes("MINISPLIT") ||
        texto.includes("MINI SPLIT")
    ) {

        return {
            categoria: "Aire Acondicionado",
            familia: "Equipos tipo minisplit",
            subfamilia: "Minisplit"
        };

    }


    // ========================================================
    // PRIORIDAD 2: UNIDAD CONDENSADORA
    // ========================================================

    if (
        texto.startsWith("UNIDAD CONDENSADORA") ||
        texto.startsWith("UNID CONDENSADORA") ||
        texto.startsWith("UNIDAD BASICA") ||
        texto.startsWith("UNID BASICA") ||
        texto.startsWith("SEMIEQUIP")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Unidades condensadoras",
            subfamilia: "Unidades condensadoras"
        };

    }


    // ========================================================
    // PRIORIDAD 3: REFRIGERANTES
    // ========================================================

    const refrigerantesPrioridad = [
        "R-22", "R22",
        "R-134A", "R134A", "R-134", "R134",
        "R-404A", "R404A", "R-404", "R404",
        "R-407A", "R407A",
        "R-407C", "R407C",
        "R-410A", "R410A",
        "R-448A", "R448A",
        "R-449A", "R449A",
        "R-507", "R507",
        "R-513A", "R513A",
        "R-290", "R290",
        "R-32", "R32",
        "R-600A", "R600A"
    ];


    if (
        (
            texto.includes("GAS REFRIGERANTE") ||
            texto.includes("REFRIGERANTE R") ||
            texto.startsWith("REFRIGERANTE") ||
            texto.startsWith("GAS R") ||
            texto.startsWith("FREON")
        ) &&
        refrigerantesPrioridad.some(r => texto.includes(r))
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Refrigerantes",
            subfamilia: "Gases refrigerantes"
        };

    }


    // ========================================================
    // PRIORIDAD 4: ACEITES
    // ========================================================

    if (
        texto.startsWith("ACEITE ") ||
        texto.startsWith("ACEITE DE ") ||
        texto.startsWith("ACEITE PARA ") ||
        texto.includes("ACEITE ALQUILBENCENO")
    ) {

        return {
            categoria: "Lubricantes",
            familia: "Aceites de refrigeracion",
            subfamilia: "Aceite POE / Mineral"
        };

    }


    // ========================================================
    // PRIORIDAD: LIMPIADORES DE MAQUINAS DE HIELO
    // ========================================================
    if (
        (texto.includes("LIMPIADOR") || texto.includes("LIMPIEZA") || texto.includes("DESINCRUSTANTE")) &&
        (texto.includes("MAQUINA DE HIELO") || texto.includes("MAQUINA HIELO") || texto.includes("MAQ HIELO") || texto.includes("FABRICADORA DE HIELO") || texto.includes("FABRICADOR DE HIELO") || texto.includes("EQUIPO DE HIELO") || texto.includes("EQUIPO HIELO"))
    ) {
        return {
            categoria: "Refrigeracion",
            familia: "Fabricacion de hielo",
            subfamilia: "Limpiadores de maquinas de hielo"
        };
    }







    // ========================================================
    // 1. MONITORES DE TENSION / FASE
    // ========================================================

    if (
        texto.includes("MONITOR DE TENSION") ||
        texto.includes("MONITOR TENSION") ||
        texto.includes("PROTECTOR DE FASE") ||
        texto.includes("PROTECTOR FASE") ||
        texto.includes("RELEVADOR DE FASE") ||
        texto.includes("RELEVADOR FASE") ||
        texto.includes("RELEVADOR DE VOLTAJE") ||
        texto.includes("RELEVADOR VOLTAJE") ||
        texto.includes("RELEVADOR DE TENSION") ||
        texto.includes("RELEVADOR TENSION")
    ) {

        return {
            categoria: "Electrico HVAC",
            familia: "Proteccion electrica",
            subfamilia: "Monitores de tension y fase"
        };

    }


    // ========================================================
    // 2. PROTECTORES TERMICOS
    // ========================================================

    // ========================================================
// 2. PROTECTORES TERMICOS
// ========================================================

if (
    texto.includes("PROTEC. TERMICO") ||
    texto.includes("PROTECTOR TERMICO DE COMPRESOR") ||
    texto.includes("PROTECTOR TERMICO COMPRESOR") ||
    texto.includes("PROTECTOR TERMICO") ||
    texto.includes("TERMICO TECUM")
) {

    return {
        categoria: "Electrico HVAC",
        familia: "Proteccion electrica",
        subfamilia: "Protectores termicos de compresor"
    };

}


    // ========================================================
    // ========================================================
    // 3. CONTROLADORES ELECTRONICOS - PRIORIDAD ALTA
    // ========================================================

    // El producto principal tiene prioridad sobre el elemento que controla.
    // Un controlador para compresor sigue siendo un controlador.
    if (texto.includes("CONTROLADOR") &&
        !texto.includes("CAJA PROTECTORA") &&
        !texto.includes("SOFTWARE CONTROLADOR") &&
        !texto.includes("CONTROLADOR PARA VALVULA ELECTRONICA") &&
        (texto.includes("CONTROLADOR DIGITAL") ||
         texto.includes("CONTROLADOR ELECT") ||
         texto.includes("CONTROLADOR DE TEM") ||
         texto.includes("CONTROLADOR DE HUM") ||
         texto.includes("CONTROLADOR PARA COMPRESOR") ||
         texto.includes("CONTROLADORXC") ||
         texto.includes("CONTROLADOR XR") ||
         texto.includes("CONTROLADOR XC") ||
         texto.includes("CONTROLADOR ERC") ||
         texto.includes("CONTROLADOR AKCC") ||
         texto.includes("CONTROLADOR PANEL") ||
         texto.includes("CONTROLADOR SPYDER") ||
         texto.includes("CONTROLADOR UNITARIO") ||
         texto.includes("CONTROLADOR 8A") ||
         texto.includes("CONTROLADOR 115") ||
         texto.includes("CONTROLADOR 12/24") ||
         texto.includes("CONTROLADOR -50C") ||
         texto.includes("CONTROLADOR 2REL") ||
         texto.includes("CONTROLADOR 3 ETAPAS") ||
         texto.includes("CONTROLADOR 4ETAPAS") ||
         texto.includes("CONTROLADOR 4 ETAPAS") ||
         (texto.includes("CONTROLADOR") &&
          (texto.includes("REFRI") ||
           texto.includes("CONGEL") ||
           texto.includes("TEMPERATURA") ||
           texto.includes("TEMP.") ||
           texto.includes("HUMEDAD") ||
           texto.includes("DATALOG") ||
           texto.includes("ETAPA") ||
           texto.includes("ALARMA") ||
           texto.includes("SENSOR") ||
           texto.includes("RELE") ||
           texto.includes("RELAY"))))) {
        return {
            categoria: "Instrumentacion y Control",
            familia: "Controladores electronicos",
            subfamilia: "Controladores de refrigeracion"
        };
    }

    // 3. COMPRESORES SCROLL
    // ========================================================

    if (
        texto.includes("COMPRESOR SCROLL") ||
        texto.includes("COMP SCROLL") ||
        texto.includes("COMP. SCROLL")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Compresores",
            subfamilia: "Compresores scroll"
        };

    }


    // ========================================================
    // 4. COMPRESORES RECIPROCANTES
    // ========================================================

    if (
        texto.includes("COMPRESOR RECIPROCANTE") ||
        texto.includes("COMP RECIPROCANTE")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Compresores",
            subfamilia: "Compresores reciprocantes"
        };

    }


    // ========================================================
    // 5. COMPRESORES HERMETICOS / SEMIHERMETICOS
    // ========================================================

    if (
        texto.includes("COMPRESOR SEMIHERMETICO") ||
        texto.includes("COMP SEMIHERMETICO") ||
        texto.includes("COMPRESOR HERMETICO") ||
        texto.includes("COMP HERMETICO")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Compresores",
            subfamilia: "Compresores hermeticos y semihermeticos"
        };

    }


    // ========================================================
    // 6. COMPRESORES TECUMSEH
    // ========================================================

    if (
        texto.includes("COMPRESOR TECUMSEH") ||
        texto.includes("COMP TECUMSEH")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Compresores",
            subfamilia: "Compresores reciprocantes"
        };

    }


    // ========================================================
    // 7. COMPRESORES GENERALES
    // ========================================================

    // ========================================================
// 7. COMPRESORES GENERALES
// PRIORIDAD SEMANTICA
//
// IMPORTANTE:
// Un equipo completo que menciona "COMPRESOR" dentro
// de sus características no debe clasificarse como
// compresor.
//
// Ejemplo:
// "MINISPLIT ... COMPRESOR INVERTER ..."
// => MINISPLIT
//
// Un producto cuyo objeto principal es un compresor
// continúa clasificándose como COMPRESOR.
// ========================================================

if (
    (
        texto.includes("COMPRESOR") ||
        texto.startsWith("COMP ") ||
        texto.includes(" COMP ")
    )
    &&
    !texto.includes("MINISPLIT") &&
    !texto.includes("MINI SPLIT")
) {

    return {
        categoria: "Refrigeracion",
        familia: "Compresores",
        subfamilia: "Compresores hermeticos y semihermeticos"
    };

}


    // ========================================================
    // 8. UNIDADES SEMIEQUIP
    // ========================================================

    if (
        texto.includes("SEMIEQUIP") &&
        (
            texto.includes("UNID ") ||
            texto.includes("UNIDAD ")
        )
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Unidades condensadoras",
            subfamilia: "Unidades condensadoras"
        };

    }


    // ========================================================
    // 9. UNIDADES CONDENSADORAS
    // ========================================================

    if (
        texto.includes("UNIDAD BASICA") ||
        texto.includes("UNID BASICA") ||
        texto.includes("UNIDAD CONDENSADORA") ||
        texto.includes("U. CONDENSADORA") ||
        texto.includes("U CONDENSADORA") ||
        texto.includes("U CONDENSDORA") ||
        texto.includes("UNIDAD CONDESADORA") ||
        texto.includes("UNIDAD COND.") ||
        texto.includes("UNID CONDENSADORA") ||
        (
            texto.includes("UNID ") &&
            (
                texto.includes("SCROLL") ||
                texto.includes("SEMIHERM") ||
                texto.includes("HERM ") ||
                texto.includes("DISCUSS") ||
                texto.includes("DISCUS")
            )
        )
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Unidades condensadoras",
            subfamilia: "Unidades condensadoras"
        };

    }


    // ========================================================
    // 10. MINISPLIT
    // ========================================================

    if (
        texto.includes("MINISPLIT") ||
        texto.includes("MINI SPLIT")
    ) {

        return {
            categoria: "Aire Acondicionado",
            familia: "Equipos tipo minisplit",
            subfamilia: "Minisplit"
        };

    }


    // ========================================================
    // 11. EVAPORADORES
    // ========================================================

    if (
        texto.startsWith("EVAP ") ||
        texto.includes(" EVAP ") ||
        texto.includes("EVAPORADOR")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Evaporadores",
            subfamilia: "Evaporadores comerciales"
        };

    }


    // ========================================================
    // 12. VALVULAS DE INYECCION
    // ========================================================

    if (
        texto.includes("VALV INYECCION") ||
        texto.includes("VALVULA DE INYECCION") ||
        texto.includes("VALVULA INYECCION")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Valvulas",
            subfamilia: "Valvulas de inyeccion"
        };

    }


    // ========================================================
    // 13. VALVULAS SOLENOIDE
    // ========================================================

    if (
        texto.includes("VALVULA SOLENOIDE") ||
        texto.includes("VALV SOLENOIDE") ||
        texto.includes("VALVULA DE SOLENOIDE")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Valvulas",
            subfamilia: "Valvulas solenoides"
        };

    }


    // ========================================================
    // 14. BOBINAS DE SOLENOIDE
    // ========================================================

    if (
        texto.includes("BOBINA SOLENOIDE") ||
        texto.includes("BOBINA DE SOLENOIDE") ||
        (
            texto.includes("BOBINA ") &&
            texto.includes("SPORLAN")
        )
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Valvulas",
            subfamilia: "Bobinas de solenoide"
        };

    }


    // ========================================================
    // 15. VALVULAS DE EXPANSION
    // ========================================================

    if (
        texto.includes("VALV EXP") ||
        texto.includes("VALVULA DE EXPANSION") ||
        texto.includes("VALVULA EXPANSION") ||
        texto.includes("VALV EXPANSION")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Valvulas",
            subfamilia: "Valvulas de expansion"
        };

    }


    // ========================================================
    // 16. VALVULAS DE SERVICIO
    // ========================================================

    if (
        texto.includes("VALVULA DE SERVICIO") ||
        texto.includes("VALV SERVICIO") ||
        texto.includes("VALVULA SERVICIO")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Valvulas",
            subfamilia: "Valvulas de servicio"
        };

    }


    // ========================================================
    // 17. VALVULAS GENERALES
    // ========================================================

    if (
        texto.includes("VALVULA") ||
        texto.includes("VALV ")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Valvulas",
            subfamilia: "Valvulas de refrigeracion"
        };

    }


    // ========================================================
    // 18. ACUMULADORES DE SUCCION
    // ========================================================

    if (
        texto.includes("ACUMULADOR DE SUCCION") ||
        texto.includes("ACUMULADOR SUCCION")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Acumuladores",
            subfamilia: "Acumuladores de succion"
        };

    }


    // ========================================================
    // 19. RECIBIDORES DE LIQUIDO
    // ========================================================

    if (
        texto.includes("RECIBIDOR LIQUIDO") ||
        texto.includes("RECIBIDOR DE LIQUIDO") ||
        texto.includes("RECIBIDORES DE LIQUIDO")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Recipientes de refrigeracion",
            subfamilia: "Recibidores de liquido"
        };

    }


    // ========================================================
    // 20. NUCLEOS DESHIDRATADORES
    // ========================================================

    if (
        texto.includes("PIEDRA ALTA CAPACIDAD") ||
        texto.includes("PIEDRA STD") ||
        texto.includes("PIEDRA STANDARD") ||
        texto.includes("PIEDRA STD LINEA DE LIQUIDO") ||
        texto.includes("PIEDRA DE ALTA CAPACIDAD") ||
        texto.includes("NUCLEO POROSO") ||
        texto.includes("NUCLEO POROSO MOLDEADO") ||
        texto.includes("NUCLEO DESHIDRATADOR") ||
        texto.includes("NUCLEOS DESHIDRATADORES")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Filtracion",
            subfamilia: "Nucleos deshidratadores"
        };

    }


    // ========================================================
    // 21. FILTROS DESHIDRATADORES
    // ========================================================

    if (
        texto.includes("FILTRO DESHIDRATADOR") ||
        texto.includes("FILT DESHIDRATADOR") ||
        texto.includes("FILTRO DESHIDRAT") ||
        texto.includes("DESHIDRATADOR")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Filtracion",
            subfamilia: "Filtros deshidratadores"
        };

    }


    // ========================================================
    // 22. INDICADORES DE LIQUIDO
    // ========================================================

    if (
        texto.includes("INDICADOR DE LIQUIDO") ||
        texto.includes("INDICADOR LIQUIDO")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Instrumentacion de refrigeracion",
            subfamilia: "Indicadores de liquido"
        };

    }


    // ========================================================
    // 23. CONTROLES DE PRESION
    // ========================================================

    if (
        texto.includes("CONTROL PRES") ||
        texto.includes("CONTROL DE PRESION") ||
        texto.includes("CONTROL ALTA/PRES") ||
        texto.includes("CONTROL BAJ/PRES") ||
        texto.includes("CONTROL PRES/DUAL") ||
        texto.includes("CONTROL PRESION") ||
        texto.includes("PRESOSTATO")
    ) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Controles de presion",
            subfamilia: "Presostatos y controles de presion"
        };

    }


    // ========================================================
    // 24. TRANSMISORES DE PRESION
    // ========================================================

    if (
        texto.includes("TRANSMISOR DE PRESION") ||
        texto.includes("TRANSMISOR PRESION")
    ) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Sensores y transmisores",
            subfamilia: "Transmisores de presion"
        };

    }


    // ========================================================
    // 25. SENSORES DE PRESION
    // ========================================================

    if (
        texto.includes("SENSOR DE PRESION") ||
        texto.includes("SENSOR PRESION")
    ) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Sensores y transmisores",
            subfamilia: "Sensores de presion"
        };

    }


    // ========================================================
    // 26. TERMOSTATOS
    // ========================================================

    if (texto.includes("TERMOSTATO")) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Controladores electronicos",
            subfamilia: "Termostatos"
        };

    }


    // ========================================================
    // 27. TEMPORIZADORES
    // ========================================================

    if (
        texto.includes("TEMPORIZADOR") ||
        texto.includes("RELOJ DESHIELO") ||
        texto.includes("RELOJ DE DESHIELO") ||
        texto.includes("TIMER")
    ) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Temporizadores y programadores",
            subfamilia: "Temporizadores"
        };

    }


    // ========================================================
    // 28. CONTROLADORES ELECTRONICOS
    // ========================================================

    if (
        texto.includes("CONTROLADOR ELECTRONICO") ||
        texto.includes("CONTROLADOR DE TEMPERATURA") ||
        texto.includes("CONTROL DE TEMPERATURA") ||
        texto.includes("CONTROL DE REFRIGERA") ||
        texto.includes("CONTROL CONGELACION") ||
        texto.includes("CONTROLADOR DE REFRIGERACION") ||
        texto.includes("CONTROLADOR DE CONGELACION")
    ) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Controladores electronicos",
            subfamilia: "Controladores de refrigeracion"
        };

    }



        // ========================================
// CONEXIONES Y ACCESORIOS DE REFRIGERACION
// ========================================

if (
    texto.includes("MIRILLA")
) {
    return {
        categoria: "Componentes de refrigeracion",
        familia: "Accesorios de linea",
        subfamilia: "Mirillas",
        marca: "",
        atributos: {}
    };
}


if (
    texto.includes("ORIFICIO")
) {
    return {
        categoria: "Componentes de refrigeracion",
        familia: "Componentes de expansion",
        subfamilia: "Orificios",
        marca: "",
        atributos: {}
    };
}


if (
    texto.includes("ELIMIN VIBRAC") ||
    texto.includes("ELIMINADOR DE VIBRACION")
) {
    return {
        categoria: "Componentes de refrigeracion",
        familia: "Accesorios de linea",
        subfamilia: "Eliminadores de vibracion",
        marca: "",
        atributos: {}
    };
}


if (
    texto.includes("NIPLE")
) {
    return {
        categoria: "Conexiones y tuberia",
        familia: "Conexiones de cobre",
        subfamilia: "Niples",
        marca: "",
        atributos: {}
    };
}


if (
    texto.includes("COPLE SOLDABLE")
) {
    return {
        categoria: "Conexiones y tuberia",
        familia: "Conexiones de cobre",
        subfamilia: "Coples",
        marca: "",
        atributos: {}
    };
}


if (
    texto.includes("CAMPANA REDUCIDA")
) {
    return {
        categoria: "Conexiones y tuberia",
        familia: "Conexiones de cobre",
        subfamilia: "Campanas reducidas",
        marca: "",
        atributos: {}
    };
}


if (
    texto.includes("TAPON DE COBRE")
) {
    return {
        categoria: "Conexiones y tuberia",
        familia: "Conexiones de cobre",
        subfamilia: "Tapones",
        marca: "",
        atributos: {}
    };
}



    // ========================================================
    // 29. ACTUADORES
    // ========================================================

    if (texto.includes("ACTUADOR")) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Actuadores",
            subfamilia: "Actuadores electricos"
        };

    }


    // ========================================================
    // 30. MOTORES VENTILADOR
    // ========================================================

    if (
        texto.includes("MOTOR VENTILADOR") ||
        texto.includes("MOTOR DE VENTILADOR") ||
        texto.includes("MOTOR VENT.")
    ) {

        return {
            categoria: "Componentes HVAC",
            familia: "Motores electricos",
            subfamilia: "Motores ventilador"
        };

    }


    // ========================================================
    // 31. MOTORES ELECTRICOS
    // ========================================================

    if (
        texto.includes("MOTOR ELECTRICO") ||
        texto.includes("MOTOR MARATHON")
    ) {

        return {
            categoria: "Componentes HVAC",
            familia: "Motores electricos",
            subfamilia: "Motores electricos HVAC"
        };

    }


    // ========================================================
    // 32. MOTORES GENERALES
    // ========================================================

    if (
        texto.startsWith("MOTOR ") ||
        texto.includes(" MOTOR ")
    ) {

        return {
            categoria: "Componentes HVAC",
            familia: "Motores electricos",
            subfamilia: "Motores"
        };

    }


// ========================================================
// PRIORIDAD: MAQUINAS / FABRICADORAS DE HIELO
// Si el producto es una maquina de hielo,
// NO debe clasificarse como refrigerante aunque
// contenga R-404A, R-404, R404A, etc.
// ========================================================

if (
    texto.includes("MAQUINA DE HIELO") ||
    texto.includes("MAQUINA HIELO") ||
    texto.includes("MAQ HIELO") ||
    texto.includes("FABRICADORA DE HIELO") ||
    texto.includes("FABRICADOR DE HIELO") ||
    texto.includes("EQUIPO DE HIELO") ||
    texto.includes("EQUIPO HIELO")
) {

    return {
        categoria: "Refrigeracion",
        familia: "Fabricacion de hielo",
        subfamilia: "Maquinas de hielo"
    };

}


    // ========================================================
    // 33. REFRIGERANTES
    // ========================================================

    const refrigerantes = [

        "R-22",
        "R22",

        "R-134A",
        "R134A",

        "R-134",
        "R134",

        "R-404A",
        "R404A",

        "R-404",
        "R404",

        "R-407A",
        "R407A",

        "R-407C",
        "R407C",

        "R-410A",
        "R410A",

        "R-448A",
        "R448A",

        "R-449A",
        "R449A",

        "R-507",
        "R507",

        "R-513A",
        "R513A",

        "R-290",
        "R290",

        "R-32",
        "R32",

        "R-600A",
        "R600A"

    ];


    if (
        texto.startsWith("REFRIGERANTE") ||
        texto.startsWith("GAS REFRIGERANTE") ||
        texto.startsWith("GAS R") ||
        texto.startsWith("FREON")
    ) {

        return {
            categoria: "Refrigeracion",
            familia: "Refrigerantes",
            subfamilia: "Gases refrigerantes"
        };

    }


// ========================================================
// 33.1 CONTROLES DE ACEITE
// ========================================================

if (
    texto.includes("CONTROL ELECTRONICO DE ACEITE") ||
    texto.includes("CONTROL ELECTRONICO NIVEL DE ACEITE") ||
    texto.includes("CONTROL NIVEL DE ACEITE") ||
    texto.includes("CONTROL DE NIVEL DE ACEITE")
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Controles de aceite",
        subfamilia: "Controles electronicos de nivel de aceite"
    };

}


// ========================================================
// 33.2 INDICADORES DE ACEITE
// ========================================================

if (
    texto.includes("INDICADOR DE ACEITE") ||
    texto.includes("INDICADOR NIVEL DE ACEITE") ||
    texto.includes("INDICADOR DE NIVEL DE ACEITE") ||
    texto.includes("MIRILLA DE ACEITE") ||
    texto.includes("VISOR DE ACEITE")
) {

    return {
        categoria: "Refrigeracion",
        familia: "Indicadores de aceite",
        subfamilia: "Indicadores y visores de aceite"
    };

}


// ========================================================
// 33.3 SEPARADORES DE ACEITE
// ========================================================

if (
    texto.includes("SEPARADOR DE ACEITE") ||
    texto.includes("SEPARADOR ACEITE")
) {

    return {
        categoria: "Refrigeracion",
        familia: "Separadores de aceite",
        subfamilia: "Separadores de aceite"
    };

}



    // ========================================================
    // 34. ACEITES
    // ========================================================

    if (
        texto.includes("ACEITE") &&
        !texto.includes("CONTROL ELECTRONICO DE ACEITE") &&
        !texto.includes("CONTROL ELECTRONICO NIVEL DE ACEITE") &&
        !texto.includes("CONTROL NIVEL DE ACEITE") &&
        !texto.includes("INDICADOR DE ACEITE") &&
        !texto.includes("SEPARADOR DE ACEITE")
    ) {

        return {
            categoria: "Lubricantes",
            familia: "Aceites de refrigeracion",
            subfamilia: "Aceite POE / Mineral"
        };

    }


    // ========================================================
    // 35. FILTROS GENERALES
    // ========================================================

    if (texto.includes("FILTRO")) {

        return {
            categoria: "Refrigeracion",
            familia: "Filtracion",
            subfamilia: "Filtros"
        };

    }


    // ========================================================
    // 36. TUBERIA DE COBRE
    // ========================================================

    if (
        texto.includes("TUBO COBRE") ||
        texto.includes("TUBERIA COBRE")
    ) {

        return {
            categoria: "Material HVAC",
            familia: "Tuberia y conexiones",
            subfamilia: "Tuberia de cobre"
        };

    }


    // ========================================================
    // 37. CONEXIONES DE COBRE
    // ========================================================

    if (
        texto.includes("CODO") ||
        texto.includes("TEE ") ||
        texto.includes("COPLA") ||
        texto.includes("UNION COBRE")
    ) {

        return {
            categoria: "Material HVAC",
            familia: "Tuberia y conexiones",
            subfamilia: "Conexiones de cobre"
        };

    }


    // ========================================================
    // 38. REDUCCIONES Y BUSHINGS
    // ========================================================

    if (
        texto.includes("REDUC.") ||
        texto.includes("REDUCCION") ||
        texto.includes("BUSHING")
    ) {

        return {
            categoria: "Material HVAC",
            familia: "Tuberia y conexiones",
            subfamilia: "Reducciones y adaptadores"
        };

    }


    // ========================================================
    // 39. COPLES ZOOMLOCK
    // ========================================================

    if (
        texto.includes("ZOOMLOCK") ||
        texto.includes("ZOOM LOCK") ||
        (
            texto.includes("COPLE ") &&
            texto.includes("EMPUJE")
        )
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Conexiones sin soldadura",
            subfamilia: "Coples ZoomLock"
        };

    }


    // ========================================================
    // 40. TUBERIA GENERAL
    // ========================================================

    if (
        texto.includes("TUBERIA") ||
        texto.startsWith("TUBO ") ||
        texto.includes(" TUBO ")
    ) {

        return {
            categoria: "Material HVAC",
            familia: "Tuberia y conexiones",
            subfamilia: "Tuberia"
        };

    }


    // ========================================================
    // 41. SOLDADURA
    // ========================================================

    if (
        texto.includes("SOLDADURA") ||
        texto.includes("VARILLA DE SOLDAR") ||
        texto.includes("VARILLA SOLDADURA")
    ) {

        return {
            categoria: "Consumibles",
            familia: "Soldadura",
            subfamilia: "Material de union"
        };

    }


    // ========================================================
    // 42. AISLAMIENTO
    // ========================================================

    if (
        texto.includes("AISLANTE") ||
        texto.includes("AISLAMIENTO") ||
        texto.includes("INSULTUBE") ||
        texto.includes("FOAM")
    ) {

        return {
            categoria: "Aislamiento",
            familia: "Aislamiento termico",
            subfamilia: "Tubular / espuma"
        };

    }


    // ========================================================
    // 43. CINTAS
    // ========================================================

    if (texto.includes("CINTA")) {

        return {
            categoria: "Material HVAC",
            familia: "Cintas tecnicas",
            subfamilia: "Sellado y aislamiento"
        };

    }


    // ========================================================
    // 44. ASPAS / HELICES
    // ========================================================

    if (
        texto.includes("ASPA") ||
        texto.includes("HELICE")
    ) {

        return {
            categoria: "Componentes HVAC",
            familia: "Ventilacion",
            subfamilia: "Aspas y helices"
        };

    }


    // ========================================================
    // 45. RELEVADORES
    // ========================================================

    if (texto.includes("RELEVADOR")) {

        return {
            categoria: "Electrico HVAC",
            familia: "Control electrico",
            subfamilia: "Relevadores"
        };

    }


    // ========================================================
    // 46. CONTACTORES
    // ========================================================

    if (texto.includes("CONTACTOR")) {

        return {
            categoria: "Electrico HVAC",
            familia: "Control electrico",
            subfamilia: "Contactores"
        };

    }


    // ========================================================
    // 47. CAPACITORES
    // ========================================================

    if (
        texto.includes("CAPACITOR") ||
        texto.includes("CONDENSADOR ELECTRICO")
    ) {

        return {
            categoria: "Electrico HVAC",
            familia: "Componentes electricos",
            subfamilia: "Capacitores"
        };

    }


    // ========================================================
    // 48. BALASTRAS
    // ========================================================

    if (
        texto.includes("BALASTRA") ||
        texto.includes("BALASTRO")
    ) {

        return {
            categoria: "Electrico HVAC",
            familia: "Componentes electricos",
            subfamilia: "Balastras"
        };

    }


    // ========================================================
    // 49. BOMBAS DE VACIO
    // ========================================================

    if (
        texto.includes("BOMBA VACIO") ||
        texto.includes("BOMBA DE VACIO") ||
        texto.includes("BOMBA VACION")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Bombas de vacio",
            subfamilia: "Bombas de vacio"
        };

    }


    // ========================================================
    // 50. BOMBAS DE CIRCULACION
    // ========================================================

    if (
        texto.includes("BOMBA CIRCUL") ||
        texto.includes("BOMBA DE CIRCULACION")
    ) {

        return {
            categoria: "Componentes HVAC",
            familia: "Bombas",
            subfamilia: "Bombas de circulacion"
        };

    }


    // ========================================================
    // 51. HERRAMIENTAS DE MEDICION
    // ========================================================

    if (
        texto.includes("MANOMETRO") ||
        texto.includes("VACUOMETRO") ||
        texto.includes("MULTIMETRO") ||
        texto.includes("TERMOMETRO") ||
        texto.includes("AMPERIMETRO")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Instrumentos de medicion",
            subfamilia: "Instrumentos HVAC"
        };

    }


    // ========================================================
    // 52. ABOCINADORES
    // ========================================================

    if (
        texto.includes("ABOCINADOR") ||
        texto.includes("FLARE")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Herramientas de instalacion",
            subfamilia: "Abocinadores y herramientas flare"
        };

    }


    // ========================================================
    // 53. HERRAMIENTAS DE ENSAMBLE
    // ========================================================

    if (
        texto.includes("HERRAMIENTA P/ENSAMBLE") ||
        texto.includes("HERRAMIENTA PARA ENSAMBLE") ||
        texto.includes("HERRAMIENTA DE ENSAMBLE") ||
        texto.includes("HERRAMIENTAS DE ENSAMBLE") ||
        texto.includes("ADAPTADOR P/HERRAMIENTA")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Herramientas de instalacion",
            subfamilia: "Herramientas de ensamble"
        };

    }


    // ========================================================
    // 54. PEINES PARA CONDENSADOR
    // ========================================================

    if (
        texto.includes("PEINE DE ESTRELLA") ||
        texto.includes("PEINE PARA CONDENSADOR") ||
        texto.includes("PEINE CONDENSADOR")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Herramientas de mantenimiento",
            subfamilia: "Peines para serpentines"
        };

    }


    // ========================================================
    // 55. CORTINAS PARA CAMARA
    // ========================================================

    if (
        texto.includes("CORTINA HAWAIANA") ||
        texto.includes("CORTINA HAWAI") ||
        texto.includes("CORTINA PVC")
    ) {

        return {
            categoria: "Material HVAC",
            familia: "Accesorios para camaras frigorificas",
            subfamilia: "Cortinas de PVC"
        };

    }


    // ========================================================
    // 56. CUBIERTAS PARA MINISPLIT
    // ========================================================

    if (
        texto.includes("CUBIERTA P/MINISPLIT") ||
        texto.includes("CUBIERTA MINISPLIT") ||
        (
            texto.includes("CUBIERTA IMPERMEABLE") &&
            texto.includes("AIRE ACONDICIONADO")
        )
    ) {

        return {
            categoria: "Instalacion HVAC",
            familia: "Accesorios para aire acondicionado",
            subfamilia: "Cubiertas para minisplit"
        };

    }


    // ========================================================
    // 57. ABRAZADERAS
    // ========================================================

    if (texto.includes("ABRAZADERA")) {

        return {
            categoria: "Material HVAC",
            familia: "Sujecion e instalacion",
            subfamilia: "Abrazaderas"
        };

    }


    // ========================================================
    // 58. BISAGRAS
    // ========================================================

    if (texto.includes("BISAGRA")) {

        return {
            categoria: "Refacciones",
            familia: "Accesorios de camaras",
            subfamilia: "Bisagras"
        };

    }


    // ========================================================
    // 59. CERROJOS
    // ========================================================

    if (texto.includes("CERROJO")) {

        return {
            categoria: "Refacciones",
            familia: "Accesorios de camaras",
            subfamilia: "Cerrojos"
        };

    }


    // ========================================================
    // 60. BOBINAS GENERALES
    // ========================================================

    if (texto.includes("BOBINA ")) {

        return {
            categoria: "Electrico HVAC",
            familia: "Componentes electricos",
            subfamilia: "Bobinas"
        };

    }


    // ========================================================
    // 61. APAGADORES / SELECTORES
    // ========================================================

    if (
        texto.includes("APAGADOR") ||
        texto.includes("SELECTOR")
    ) {

        return {
            categoria: "Electrico HVAC",
            familia: "Control electrico",
            subfamilia: "Interruptores y selectores"
        };

    }


    // ========================================================
    // 62. KITS DE REFRIGERACION
    // ========================================================

    if (
        texto.includes("KIT DE REFRIGERADOR") ||
        texto.includes("KIT DE REFRIGERACION")
    ) {

        return {
            categoria: "Instalacion HVAC",
            familia: "Kits de instalacion",
            subfamilia: "Kits de refrigeracion"
        };

    }


    // ========================================================
    // 63. KITS DE CONEXIONES ELECTRICAS
    // ========================================================

    if (
        texto.includes("KIT DE CONEXIONES ELECTRICAS") ||
        texto.includes("KIT CONEXIONES ELECTRICAS")
    ) {

        return {
            categoria: "Electrico HVAC",
            familia: "Componentes electricos",
            subfamilia: "Kits de conexiones electricas"
        };

    }


    // ========================================================
    // 64. KITS DE ALARMA HOMBRE ENCERRADO
    // ========================================================

    if (
        texto.includes("KIT ALARMA HOMBRE ENCERRADO") ||
        texto.includes("ALARMA HOMBRE ENCERRADO")
    ) {

        return {
            categoria: "Instrumentacion y Control",
            familia: "Sistemas de alarma",
            subfamilia: "Alarmas de hombre encerrado"
        };

    }


    // ========================================================
    // 65. KITS DE VENTILADOR
    // ========================================================

    if (
        texto.includes("KIT DE VENTILADOR") ||
        texto.includes("KIT VENTILADOR") ||
        texto.includes("VENTILADOR GUARDA ENFRIA")
    ) {

        return {
            categoria: "Componentes HVAC",
            familia: "Ventilacion",
            subfamilia: "Kits de ventilador"
        };

    }


    // ========================================================
    // 66. DETECTORES DE FUGAS
    // ========================================================

    if (
        texto.includes("DETECTOR DE FUGA") ||
        texto.includes("DETECTOR DE FUGAS") ||
        texto.includes("DETECTOR FUGA")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Deteccion de fugas",
            subfamilia: "Detectores de fugas"
        };

    }


    // ========================================================
    // 67. PROBADORES DE ACIDEZ
    // ========================================================

    if (
        texto.includes("PROBADOR DE ACIDEZ") ||
        texto.includes("PROBADOR ACIDEZ")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Analisis de refrigeracion",
            subfamilia: "Probadores de acidez"
        };

    }


    // ========================================================
    // 68. CALENTADORES DE CARTER
    // ========================================================

    if (
        texto.includes("CALENTADOR CARTER") ||
        texto.includes("CALENTADOR DE CARTER")
    ) {

        return {
            categoria: "Componentes HVAC",
            familia: "Calefaccion",
            subfamilia: "Calentadores de carter"
        };

    }


    // ========================================================
    // 69. CUBIERTAS PARA AIRE ACONDICIONADO
    // ========================================================

    if (
        texto.includes("CUBIERTA IMPERMEABLE") ||
        texto.includes("CUBIERTA PARA AIRE ACONDICIONADO") ||
        texto.includes("CUBIERTA P/AIRE ACONDICIONADO")
    ) {

        return {
            categoria: "Instalacion HVAC",
            familia: "Accesorios para aire acondicionado",
            subfamilia: "Cubiertas para equipos"
        };

    }


    // ========================================================
    // 70. JUEGOS DE MANGUERAS
    // ========================================================

    if (
        texto.includes("JGO MANG") ||
        texto.includes("JUEGO DE MANGUERAS") ||
        texto.includes("JUEGO MANGUERAS") ||
        texto.includes("MANGUERAS YELLOW")
    ) {

        return {
            categoria: "Herramientas HVAC",
            familia: "Herramientas de servicio",
            subfamilia: "Juegos de mangueras"
        };

    }


    // ========================================================
    // 71. PISTONES / BIELAS / ANILLOS
    // ========================================================

    if (
        texto.includes("PISTON") ||
        texto.includes("BIELA") ||
        texto.includes("ANILLOS") ||
        texto.includes("KIT PISTON")
    ) {

        return {
            categoria: "Refacciones",
            familia: "Refacciones de compresores",
            subfamilia: "Pistones, bielas y anillos"
        };

    }



// ========================================================
// 72. ASPAS / HELICES HVAC
// ========================================================

if (
    texto.includes("ASPA ") ||
    texto.startsWith("ASPA") ||
    texto.includes(" ASPA") ||
    texto.includes("HELICE") ||
    texto.includes("HElice")
) {

    return {
        categoria: "Componentes HVAC",
        familia: "Ventilacion",
        subfamilia: "Aspas y helices"
    };

}


// ========================================================
// 73. MEDIDORES DE CAPACITANCIA
// ========================================================

if (
    texto.includes("MEDIDOR DE CAPACITANCIA") ||
    texto.includes("MEDIDOR CAPACITANCIA") ||
    texto.includes("MEDIDOR DE CAPACITORES") ||
    texto.includes("MEDIDOR CAPACITORES")
) {

    return {
        categoria: "Herramientas HVAC",
        familia: "Instrumentos de medicion",
        subfamilia: "Medidores electricos"
    };

}


// ========================================================
// 74. MANIJAS PARA CAMARAS FRIGORIFICAS
// ========================================================

if (
    texto.includes("MANIJA KASON") ||
    texto.includes("MANIJA PARA CAMARA") ||
    texto.includes("MANIJA CAMARA") ||
    texto.includes("MANIJA REFRIGERACION")
) {

    return {
        categoria: "Refacciones",
        familia: "Accesorios de camaras",
        subfamilia: "Manijas"
    };

}


// ========================================================
// 75. ESPUMAS DE POLIURETANO
// ========================================================

if (
    texto.includes("POLIURETANO EN SPRAY") ||
    texto.includes("POLIURETANO SPRAY") ||
    texto.includes("ESPUMA DE POLIURETANO") ||
    texto.includes("ESPUMA POLIURETANO") ||
    texto.includes("POLIURETANO TOUCH") ||
    texto.includes("TOUCH&EASY")
) {

    return {
        categoria: "Instalacion HVAC",
        familia: "Aislamiento y selladores",
        subfamilia: "Espumas de poliuretano"
    };

}


// ========================================================
// 76. PROTECTORES DE MANIFOLD
// ========================================================

if (
    texto.includes("PROTECTOR MANIFOLD") ||
    texto.includes("PROTECTOR DE MANIFOLD") ||
    (
        texto.includes("MANIFOLD") &&
        texto.includes("PROTECTOR")
    )
) {

    return {
        categoria: "Herramientas HVAC",
        familia: "Herramientas de servicio",
        subfamilia: "Accesorios para manifold"
    };

}


// ========================================================
// 77. PIEDRAS / NUCLEOS DESHIDRATADORES - VARIANTES
// ========================================================

if (
    texto.includes("PIEDRA P/ LINEA DE LIQ") ||
    texto.includes("PIEDRA PARA LINEA DE LIQ") ||
    texto.includes("PIEDRA ALTA CAP LINEA LIQUIDO") ||
    texto.includes("PIEDRA ALTA CAP") && texto.includes("LINEA")
) {

    return {
        categoria: "Refrigeracion",
        familia: "Filtracion",
        subfamilia: "Nucleos deshidratadores"
    };

}


// ========================================================
// 78. TEMPERATURA MULTIESCALA PROGRAMABLE
// ========================================================

if (
    texto.includes("TEMP MULTIESCALA") ||
    texto.includes("TEMPERATURA MULTIESCALA") ||
    (
        texto.includes("TEMP") &&
        texto.includes("PROGRAMABLE") &&
        texto.includes("NFC")
    )
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Controladores electronicos",
        subfamilia: "Termostatos"
    };

}


// ========================================================
// 79. MORDAZAS / HERRAMIENTAS ZOOMLOCK
// ========================================================

if (
    texto.includes("MORDAZA") &&
    (
        texto.includes("SPORLAN") ||
        texto.includes("ZOOMLOCK")
    )
) {

    return {
        categoria: "Herramientas HVAC",
        familia: "Herramientas de instalacion",
        subfamilia: "Herramientas de ensamble"
    };

}



// ========================================================
// 80. FABRICADORAS DE HIELO
// ========================================================

if (
    texto.includes("MAQUINA DE HIELO") ||
    texto.includes("MÃQUINA DE HIELO") ||
    texto.includes("FABRICADORA DE HIELO") ||
    texto.includes("FABRICADOR DE HIELO")
) {

    return {
        categoria: "Refrigeracion",
        familia: "Fabricadoras de hielo",
        subfamilia: "Maquinas de hielo"
    };

}




    // ========================================================
    // V3.2.2 - REGLAS DE RECUPERACION DE PENDIENTES
    // ========================================================

    // REFACCIONES DE COMPRESOR - GASKETS / PISTON / BIELA
    if (
        /JUEGO.*GASKETS/.test(texto) ||
        /GASKET.*INFERIOR/.test(texto) ||
        /PISTON.*BIELA/.test(texto) ||
        /KIT.*PISTON.*BIELA/.test(texto)
    ) {
        return {
            categoria: "Refacciones",
            familia: "Refacciones de compresores",
            subfamilia: "Juntas y componentes de compresor"
        };
    }


    // PROTECTORES TERMICOS TECUM
    if (
        /K90.*TERMICO.*TECUM/.test(texto) ||
        /TERMICO.*TECUM/.test(texto)
    ) {
        return {
            categoria: "Electrico HVAC",
            familia: "Proteccion electrica",
            subfamilia: "Protectores termicos"
        };
    }


    // UNIDADES CONDENSADORAS
    if (
        /UNID.*SCROLL.*EQUIP/.test(texto) ||
        /UNID.*HERM.*EQUIP/.test(texto) ||
        /UNID.*SEMIHERM.*EQUIP/.test(texto)
    ) {
        return {
            categoria: "Refrigeracion",
            familia: "Unidades condensadoras",
            subfamilia: "Unidades condensadoras"
        };
    }


    // CONEXIONES ZOOMLOCK
    if (
        /CONEXION.*ZOOMLOCK/.test(texto) ||
        /ZOOMLOCK.*CONEXION/.test(texto) ||
        /HNBR.*ZOOMLOCK/.test(texto)
    ) {
        return {
            categoria: "Herramientas HVAC",
            familia: "Conexiones sin soldadura",
            subfamilia: "Coples ZoomLock"
        };
    }


    // FILTRACION - NUCLEOS / PIEDRAS DESHIDRATADORAS
    if (
        /PIEDRA.*ALTA.*CAPACIDAD/.test(texto) ||
        /PIEDRA.*CARBON/.test(texto)
    ) {
        return {
            categoria: "Refrigeracion",
            familia: "Filtracion",
            subfamilia: "Nucleos deshidratadores"
        };
    }


    // DISPLAY / CONTROLADORES ELECTRONICOS
    if (
        texto.includes("DISPLAY TOUCH") ||
        texto.includes("DISPLAY DIM")
    ) {
        return {
            categoria: "Instrumentacion y Control",
            familia: "Controladores electronicos",
            subfamilia: "Displays y controladores"
        };
    }


    // PRESOSTATOS DUALES
    if (
        /PRESOST.*PENN/.test(texto) ||
        /PRESOSTATO.*DUAL/.test(texto)
    ) {
        return {
            categoria: "Instrumentacion y Control",
            familia: "Controles de presion",
            subfamilia: "Presostatos y controles de presion"
        };
    }


    // PROTECTORES DE VOLTAJE
    if (
        texto.includes("PROTECTOR VOLTAJE") ||
        texto.includes("PROTECTOR DE VOLTAJE")
    ) {
        return {
            categoria: "Electrico HVAC",
            familia: "Proteccion electrica",
            subfamilia: "Protectores de voltaje"
        };
    }


    // SENSORES DE PROTECCION DE COMPRESOR
    if (
        texto.includes("SENSOR OLC")
    ) {
        return {
            categoria: "Instrumentacion y Control",
            familia: "Proteccion de compresores",
            subfamilia: "Sensores de proteccion"
        };
    }


    // KITS DE CONEXIONES ELECTRICAS
    if (
        texto.includes("KIT DE CONEXIONES ELECTRICAS") ||
        texto.includes("KIT CONEXIONES ELECTRICAS")
    ) {
        return {
            categoria: "Electrico HVAC",
            familia: "Componentes electricos",
            subfamilia: "Kits de conexiones electricas"
        };
    }



// ========================================================
// V3.2.6 - PRIORIDAD SEMANTICA CONSOLIDADA
// BLOQUE DE ALTA PRECISION
// ========================================================


// ========================================================
// 77. TRANSDUCTORES DE PRESION
// ========================================================

if (
    texto.includes("TRANSDUCTOR DE PRESION") ||
    texto.includes("TRANSDUCTOR PRESION") ||
    texto.includes("TRANSDUCTOR DE PRESION") ||
    texto.includes("TRANSDUCTOR") &&
    (
        texto.includes("PSI") ||
        texto.includes("PSIG") ||
        texto.includes("LB")
    )
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Transductores",
        subfamilia: "Transductores de presion"
    };

}


// ========================================================
// 78. SONDAS DE PRESION
// ========================================================

if (
    texto.includes("SONDA PRESION") ||
    texto.includes("SONDAS PRESION")
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Sensores y sondas",
        subfamilia: "Sondas de presion"
    };

}


// ========================================================
// 79. REGISTRADORES
// PRIORIDAD ALTA SOBRE "SONDA"
// ========================================================

if (
    texto.includes("REGISTRADOR") ||
    texto.includes("REGISTRADORA") ||
    texto.includes("REGISTRADOR DE TEMPERATURA") ||
    texto.includes("REGISTRADORA DE DATOS") ||
    texto.includes("REGISTRA TEMPERATURA")
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Registradores",
        subfamilia: "Registradores de temperatura"
    };

}


// ========================================================
// 80. CUADROS / MODULOS / CONTROLADORES
// PRIORIDAD ALTA SOBRE "SONDA"
// ========================================================

if (
    texto.includes("CUADRO ELE") ||
    texto.includes("CUADRO ELECTRICO") ||
    texto.includes("CUADRO ELECTRÃ“NICO") ||
    texto.includes("MODULO CONTROL") ||
    texto.includes("MODULO DE CONTROL") ||
    texto.includes("MODULO ELECTRONICO") ||
    texto.includes("MODULO ELECTRÃ“NICO") ||
    texto.includes("CONTROLADOR ELECTRONICO") ||
    texto.includes("CONTROLADOR ELECTRÃ“NICO")
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Controladores electronicos",
        subfamilia: "Controladores de refrigeracion"
    };

}


// ========================================================
// V3.2.9 - CONTROLADORES DE REFRIGERACION
// PRIORIDAD SEMANTICA CONSOLIDADA
// ========================================================

if (

    // ----------------------------------------------------
    // SERIES Y MODELOS CONOCIDOS
    // ----------------------------------------------------

    texto.includes("Y39-HRRR") ||
    texto.includes("Y39SHRRRB") ||
    texto.includes("Y39H-HRRRB") ||

    texto.includes("Z31-HR-SCOF1") ||
    texto.includes("Z31S-HRB-A-SCOF1") ||

    texto.includes("TC-900E") ||

    texto.includes("TC3221") ||
    texto.includes("TC3222") ||
    texto.includes("TC3223") ||
    texto.includes("TC3224") ||

    // ----------------------------------------------------
    // AKO - CONTROLADORES DE PANEL / REFRIGERACION
    // ----------------------------------------------------

    texto.includes("AKO-D14423") ||
    texto.includes("AKO-D14123") ||
    texto.includes("AKO-D14120") ||
    texto.includes("AKO-D14412") ||
    texto.includes("AKO-D14726") ||
    texto.includes("AKO-15226") ||
    texto.includes("AKO-15227") ||

    // ----------------------------------------------------
    // CONTEXTO SEMANTICO FUERTE
    // ----------------------------------------------------

    (
        (
            texto.includes("CONTROLADOR") ||
            texto.includes("CONTROL")
        )
        &&
        (
            texto.includes("REFRI") ||
            texto.includes("REFRIGERACION") ||
            texto.includes("CONGELACION") ||
            texto.includes("CONGELACIÃ“N")
        )
    )

    ||

    (
        texto.includes("CONTROLADOR")
        &&
        (
            texto.includes("PANEL") ||
            texto.includes("MULTISONDA")
        )
        &&
        (
            texto.includes("RELE") ||
            texto.includes("RELES") ||
            texto.includes("RELAY")
        )
    )

) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Controladores electronicos",
        subfamilia: "Controladores de refrigeracion"
    };

}



// ========================================================
// 81. DISPLAYS
// ========================================================

if (
    texto.includes("DISPLAY REMOTO") ||
    texto.includes("DISPLAY TOUCH") ||
    texto.includes("DISPLAY DIM") ||
    texto.includes("DISPLAY DIGITAL") ||
    texto.includes("DISPLAY") &&
    (
        texto.includes("PANTALLA") ||
        texto.includes("96X50") ||
        texto.includes("DESHIELO")
    )
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Controladores electronicos",
        subfamilia: "Displays y controladores"
    };

}



// ========================================================
// V3.2.7 - SONDA DE TEMPERATURA JOHNSON
// ========================================================

if (
    texto.includes("EVTPN615F200") ||
    (
        texto.includes("SONDA JOHNSON") &&
        texto.includes("NTC")
    )
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Sensores y sondas",
        subfamilia: "Sondas de temperatura"
    };

}



// ========================================================
// 82. SONDAS DE TEMPERATURA
// ========================================================

if (
    (
        texto.includes("SONDA NTC") ||
        texto.includes("SONDA PTC") ||
        texto.includes("SONDA PT100") ||
        texto.includes("SONDA PT 100") ||
        texto.includes("SONDA PT1000") ||
        texto.includes("SONDA 10KOHM") ||
        texto.includes("SONDA DE TEMPERATURA") ||
        texto.includes("SONDA TEMPERATURA")
    )
    &&
    !texto.includes("REGISTRADOR")
    &&
    !texto.includes("REGISTRADORA")
    &&
    !texto.includes("CUADRO")
    &&
    !texto.includes("MODULO CONTROL")
    &&
    !texto.includes("CONTROLADOR")
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Sensores y sondas",
        subfamilia: "Sondas de temperatura"
    };

}


// ========================================================
// 83. SENSORES DE TEMPERATURA
// ========================================================

if (
    texto.includes("SENSOR PT1000") ||
    texto.includes("SENSOR PT 1000") ||
    texto.includes("SENSOR TEMPERATURA") ||
    texto.includes("SENSOR TEMP") ||
    texto.includes("SENSOR DESCARGA") ||
    texto.includes("SENSOR NTC") ||
    texto.includes("SENSOR PTC")
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Sensores y sondas",
        subfamilia: "Sensores de temperatura"
    };

}






// ========================================================
// 84. MAQUINAS DE HIELO
// EXCLUYE LIMPIADORES Y QUIMICOS
// ========================================================

if (
    (
        texto.includes("MAQUINA DE HIELO") ||
        texto.includes("MAQUINA HIELO") ||
        texto.includes("FABRICADORA DE HIELO") ||
        texto.includes("EQUIPO DE HIELO") ||
        texto.includes("EQUIPO HIELO")
    )
    &&
    !texto.includes("LIMPIADOR")
    &&
    !texto.includes("LIMPIEZA")
    &&
    !texto.includes("DESINCRUSTANTE")
    &&
    !texto.includes("QUIMICO")
) {

    return {
        categoria: "Refrigeracion",
        familia: "Fabricacion de hielo",
        subfamilia: "Maquinas de hielo"
    };

}



// ========================================================
// V3.2.8 - LIMPIADORES DE MAQUINAS DE HIELO
// PRIORIDAD ALTA
// EVITA CLASIFICAR EL LIMPIADOR COMO MAQUINA DE HIELO
// ========================================================

if (
    (
        texto.includes("LIMPIADOR") ||
        texto.includes("LIMPIEZA") ||
        texto.includes("DESINCRUSTANTE")
    )
    &&
    (
        texto.includes("MAQUINA DE HIELO") ||
        texto.includes("MAQUINA HIELO") ||
        texto.includes("MAQ HIELO") ||
        texto.includes("FABRICADORA DE HIELO") ||
        texto.includes("FABRICADOR DE HIELO") ||
        texto.includes("EQUIPO DE HIELO") ||
        texto.includes("EQUIPO HIELO")
    )
) {

    return {
        categoria: "Refrigeracion",
        familia: "Fabricacion de hielo",
        subfamilia: "Limpiadores de maquinas de hielo"
    };

}



// ========================================================
// 85. TEMPORIZADORES
// ========================================================

if (
    texto.includes("TEMPORIZADOR") ||
    texto.includes("TEMPOR ARRANQUE") ||
    texto.includes("TEMPOR. ARRANQUE") ||
    texto.includes("PROGRAMADOR DE HORARIO") ||
    texto.includes("RELOJ DESHIELO") ||
    texto.includes("RELOJ DE DESHIELO") ||
    texto.includes("OFF DELAY") ||
    texto.includes("ON DELAY")
) {

    return {
        categoria: "Instrumentacion y Control",
        familia: "Temporizadores y programadores",
        subfamilia: "Temporizadores"
    };

}


// ========================================================
// 86. BOMBAS DE CONDENSADO
// ========================================================

if (
    texto.includes("BOMBA CONDENSADO") ||
    texto.includes("BOMBA DE CONDENSADO") ||
    texto.includes("BOMBA CONDENSADOR")
) {

    return {
        categoria: "Componentes HVAC",
        familia: "Bombas",
        subfamilia: "Bombas de condensado"
    };

}




    // ========================================================
    // V3.2.11 - CONTROLADORES HONEYWELL / SPYDER
    // ========================================================

    if (texto.includes('SPYDER')) {
        return {
            categoria: 'Instrumentacion y Control',
            familia: 'Controladores electronicos',
            subfamilia: 'Controladores de refrigeracion'
        };
    }

    // ========================================================
    // SIN CLASIFICACION
    // ========================================================

    return null;

}


// ============================================================
// DETECCION DE MARCA
// ============================================================

function detectarMarca(texto) {

    const marcas = [

        "FULL GAUGE",
        "GEFRIEREN",
        "HARRYS",
        "SIKA",
        "SIKAFLEX",
        "KASON",
        "MCMILLAN",
        "NORCUL",
        "DORIN",
        "SPORLAN",
        "MARATHON",
        "FIEL",
        "FIELDPIECE",
        "COPELAND",
        "DANFOSS",
        "EMERSON",
        "BITZER",
        "TECUMSEH",
        "CARRIER",
        "TRANE",
        "YORK",
	"LG",
        "MIDEA",
        "BOHN",
        "GENEBRE",
        "CASTEL",
        "YELLOW JACKET",
        "RED LINE",
        "RHEEM",
        "MCQUAY",
        "RIDGID",
        "ZOOMLOCK"

    ];


    // ========================================================
    // PRIORIDAD: MARCA DECLARADA DEL PRODUCTO
    //
    // Ejemplo:
    // "marca BOHN ... compresor ... Copeland"
    //
    // Debe devolver BOHN y no Copeland.
    // ========================================================

    const marcaExplicita = texto.match(
        /\bmarca\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9]*(?:\s+[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9]*)*)/i
    );

    if (marcaExplicita) {

        const candidata = marcaExplicita[1]
            .trim()
            .toUpperCase();

        const encontrada = marcas.find(marca =>
            candidata === marca ||
            candidata.startsWith(marca + " ")
        );

        if (encontrada) {
            return encontrada;
        }
    }


    // ========================================================
    // FALLBACK
    //
    // Conserva la lógica anterior para productos donde la
    // marca no está declarada explícitamente.
    // ========================================================

    for (const marca of marcas) {

        if (texto.includes(marca)) {

            return marca;

        }

    }


    return "";

}


// ============================================================
// CLASIFICADOR PRINCIPAL
// ============================================================

function clasificarProducto(codigo, descripcion) {

    const texto = normalizarTexto(descripcion);


    let resultado = {

        categoria: "",
        familia: "",
        subfamilia: "",
        marca: "",
        atributos: {}

    };


    // ========================================================
    // NIVEL 1
    // CODIGO DE PROVEEDOR
    // ========================================================

    const clasificacionCodigo =
        clasificarPorCodigo(codigo);


    if (clasificacionCodigo) {

        resultado.categoria =
            clasificacionCodigo.categoria;

        resultado.familia =
            clasificacionCodigo.familia;

        resultado.subfamilia =
            clasificacionCodigo.subfamilia;

    }


    // ========================================================
    // NIVEL 2
    // DESCRIPCION
    // ========================================================

    const clasificacionDescripcion =
        clasificarPorDescripcion(texto);


    if (clasificacionDescripcion) {





        // ====================================================
        // SI EL CODIGO NO CLASIFICO
        // ====================================================

        if (!resultado.categoria) {

            resultado.categoria =
                clasificacionDescripcion.categoria;

            resultado.familia =
                clasificacionDescripcion.familia;

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE MOTORES
        // ====================================================

        if (
            resultado.familia === "Motores electricos" &&
            clasificacionDescripcion.familia === "Motores electricos"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE EVAPORADORES
        // ====================================================

        if (
            resultado.familia === "Evaporadores" &&
            clasificacionDescripcion.familia === "Evaporadores"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE VALVULAS
        // ====================================================

        if (
            resultado.familia === "Valvulas" &&
            clasificacionDescripcion.familia === "Valvulas"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE FILTRACION
        // ====================================================

        if (
            resultado.familia === "Filtracion" &&
            clasificacionDescripcion.familia === "Filtracion"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }




        // ====================================================
        // REFINAMIENTO DE COMPRESORES
        // ====================================================

        if (
            resultado.familia === "Compresores" &&
            clasificacionDescripcion.familia === "Compresores"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE CONTROLADORES
        // ====================================================

        if (
            resultado.familia === "Controladores electronicos" &&
            clasificacionDescripcion.familia === "Controladores electronicos"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE CONTROLES DE PRESION
        // ====================================================

        if (
            resultado.familia === "Controles de presion" &&
            clasificacionDescripcion.familia === "Controles de presion"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE SENSORES Y SONDAS
        // ====================================================

        if (
            resultado.familia === "Sensores y sondas" &&
            clasificacionDescripcion.familia === "Sensores y sondas"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE BOMBAS
        // ====================================================

        if (
            resultado.familia === "Bombas" &&
            clasificacionDescripcion.familia === "Bombas"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE VENTILACION
        // ====================================================

        if (
            resultado.familia === "Ventilacion" &&
            clasificacionDescripcion.familia === "Ventilacion"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE TEMPORIZADORES
        // ====================================================

        if (
            resultado.familia === "Temporizadores y programadores" &&
            clasificacionDescripcion.familia === "Temporizadores y programadores"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
// REFINAMIENTO DE PROTECCION ELECTRICA
// ====================================================

if (
    resultado.familia === "Proteccion electrica" &&
    clasificacionDescripcion.familia === "Proteccion electrica"
) {

    resultado.subfamilia =
        clasificacionDescripcion.subfamilia;

}


// ========================================================
// V3.2.10 - REFINAMIENTO DE CONTROLADORES HONEYWELL
// ========================================================

        if (resultado.familia === "Accesorios de control") {

            const esSensor =
                texto.includes("SENSOR") ||
                texto.includes("SONDA");

            const esActuador =
                texto.includes("ACTUADOR");

            const esTermostato =
                texto.includes("TERMOSTATO");

            const esSoftware =
                texto.includes("SOFTWARE");

            const esControladorFuerte =
                texto.includes("CONTROLADOR") ||
                texto.includes("CONTROLLER") ||
                texto.includes("SPYDER");

            if (
                esControladorFuerte &&
                !esSensor &&
                !esActuador &&
                !esTermostato &&
                !esSoftware
            ) {

                resultado.familia =
                    "Controladores electronicos";

                resultado.subfamilia =
                    "Controladores de refrigeracion";

            }

        }


    // ========================================================
    // ========================================================
    // CIRUGIA V3 - OBJETO PRINCIPAL
    // El objeto principal tiene prioridad sobre atributos
    // ========================================================

    const objetoPrincipal = texto;
    console.log("[TRACE V3 ENTRA]", JSON.stringify(objetoPrincipal), JSON.stringify(resultado));

    // 1. MINISPLIT / AIRE ACONDICIONADO
    // Corrige falsos COMPRESORES provocados por descripciones tecnicas.
    if (
        /MINI[- ]?SPLIT/.test(objetoPrincipal) ||
        /FAN\s*&\s*COIL/.test(objetoPrincipal) ||
        /AIRE\s+ACONDICIONADO/.test(objetoPrincipal)
    ) {
        resultado.categoria = 'Climatizacion';
        resultado.familia = 'Equipos tipo minisplit';
        resultado.subfamilia = 'Minisplit';
    }

    // 2. UNIDAD CONDENSADORA
    // Evita que la palabra COMPRESOR dentro de la ficha
    // convierta una unidad condensadora en COMPRESORES.
    else if (
        /UNIDAD\s+CONDENSADORA/.test(objetoPrincipal) ||
        /UNIDAD\s+CONDESADORA/.test(objetoPrincipal) ||
        /UNIDAD\s+COND\.?/.test(objetoPrincipal) ||
        /U\.?\s*CONDENSADORA/.test(objetoPrincipal) ||
        /U\s+CONDENSDORA/.test(objetoPrincipal) ||
        /\bCONDENSADORA\b/.test(objetoPrincipal)
    ) {
        resultado.categoria = 'Refrigeracion';
        resultado.familia = 'Unidades condensadoras';
        resultado.subfamilia = 'Unidades condensadoras';
    }

    // 3. COMPRESOR EXPLICITO
    // El compresor es el objeto principal aunque la ficha
    // mencione protector termico, refrigerante, aceite, etc.
    else if (
        /\bCOMPRESOR\b/.test(objetoPrincipal) ||
        /\bCOMP\.?\s+(?:HERMETICO|SEMIHERMETICO|SCROLL)\b/.test(objetoPrincipal)
    ) {
        resultado.categoria = 'Refrigeracion';
        resultado.familia = 'Compresores';

        if (/SCROLL/.test(objetoPrincipal)) {
            resultado.subfamilia = 'Compresores scroll';
        } else {
            resultado.subfamilia = 'Compresores hermeticos y semihermeticos';
        }
    }

    // 4. GAS REFRIGERANTE COMO OBJETO PRINCIPAL
    // NO usa REFRIGERANTES: porque eso puede ser solamente
    // un atributo dentro de otro producto.
    else if (
        /^GEFRIEREN\s+REFRIGERANTE\b/.test(objetoPrincipal) ||
        /^FREON\s+(?:REFRIGERANTE\s+)?R?[- ]?\d/.test(objetoPrincipal) ||
        /^GAS\s+REFRIGERANTE\b/.test(objetoPrincipal) ||
        /^REFRIGERANTE\s+R?[- ]?\d/.test(objetoPrincipal)
    ) {
        resultado.categoria = 'Refrigeracion';
        resultado.familia = 'Refrigerantes';
        resultado.subfamilia = 'Gases refrigerantes';
    }

    // DETECCION DE MARCA
    // ========================================================

    resultado.marca =
        detectarMarca(texto);


    return resultado;

}


// ============================================================
// EXPORTACION
// ============================================================

module.exports = {

    clasificarProducto,
    clasificarPorCodigo,
    clasificarPorDescripcion,
    normalizarTexto,
    detectarMarca

};




        // ====================================================

        if (
            resultado.familia === "Controles de presion" &&
            clasificacionDescripcion.familia === "Controles de presion"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE SENSORES Y SONDAS
        // ====================================================

        if (
            resultado.familia === "Sensores y sondas" &&
            clasificacionDescripcion.familia === "Sensores y sondas"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE BOMBAS
        // ====================================================

        if (
            resultado.familia === "Bombas" &&
            clasificacionDescripcion.familia === "Bombas"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE VENTILACION
        // ====================================================

        if (
            resultado.familia === "Ventilacion" &&
            clasificacionDescripcion.familia === "Ventilacion"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE TEMPORIZADORES
        // ====================================================

        if (
            resultado.familia === "Temporizadores y programadores" &&
            clasificacionDescripcion.familia === "Temporizadores y programadores"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }


        // ====================================================
        // REFINAMIENTO DE PROTECCION ELECTRICA
        // ====================================================

        if (
            resultado.familia === "Proteccion electrica" &&
            clasificacionDescripcion.familia === "Proteccion electrica"
        ) {

            resultado.subfamilia =
                clasificacionDescripcion.subfamilia;

        }



        // ========================================================
        // V3.2.10 - REFINAMIENTO DE CONTROLADORES HONEYWELL
        // ========================================================

        if (resultado.familia === "Accesorios de control") {

            const esSensor =
                texto.includes("SENSOR") ||
                texto.includes("SONDA");

            const esActuador =
                texto.includes("ACTUADOR");

            const esTermostato =
                texto.includes("TERMOSTATO");

            const esSoftware =
                texto.includes("SOFTWARE");

            const esControladorFuerte =
                texto.includes("CONTROLADOR") ||
                texto.includes("CONTROLLER") ||
                texto.includes("SPYDER");

            if (
                esControladorFuerte &&
                !esSensor &&
                !esActuador &&
                !esTermostato &&
                !esSoftware
            ) {

                resultado.familia =
                    "Controladores electronicos";

                resultado.subfamilia =
                    "Controladores de refrigeracion";

            }

        }


    // ========================================================
    // DETECCION DE MARCA
    // ========================================================

    resultado.marca =
        detectarMarca(texto);


    return resultado;

}


// ============================================================
// EXPORTACION
// ============================================================

module.exports = {

    clasificarProducto,
    clasificarPorCodigo,
    clasificarPorDescripcion,
    normalizarTexto,
    detectarMarca

};
