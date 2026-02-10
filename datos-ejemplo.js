// ==================== DATOS DE EJEMPLO ====================
// Este archivo contiene datos de ejemplo para probar la aplicación
// Cópialo en la consola del navegador (F12) para cargar los datos

const datosEjemplo = [
    {
        id: 1707500400000,
        titulo: "Sistema no responde en login",
        descripcion: "El portal de login no carga después de las 2 PM. Usuarios no pueden acceder.",
        tipo: "software",
        asignada: "Carlos Martínez",
        estado: "en-progreso",
        prioridad: "urgente",
        foto: null,
        fechaCreacion: "2026-02-10T08:30:00.000Z",
        fechaActualizacion: "2026-02-10T14:20:00.000Z"
    },
    {
        id: 1707500500000,
        titulo: "Fallo en servidor de base de datos",
        descripcion: "La base de datos se desconecta aleatoriamente cada hora. Necesario reinicio manual.",
        tipo: "base-datos",
        asignada: "Ana López",
        estado: "pendiente",
        prioridad: "alta",
        foto: null,
        fechaCreacion: "2026-02-09T16:45:00.000Z",
        fechaActualizacion: "2026-02-10T09:15:00.000Z"
    },
    {
        id: 1707500600000,
        titulo: "Cable de red dañado en oficina 3",
        descripcion: "El cable ethernet de la oficina 3 está cortado. Interrumpiendo servicio.",
        tipo: "red",
        asignada: "Pedro Sánchez",
        estado: "en-progreso",
        prioridad: "alta",
        foto: null,
        fechaCreacion: "2026-02-10T10:00:00.000Z",
        fechaActualizacion: "2026-02-10T11:30:00.000Z"
    },
    {
        id: 1707500700000,
        titulo: "Monitor defectuoso",
        descripcion: "Monitor del escritorio 5 tiene líneas verticales. Requiere reemplazo.",
        tipo: "hardware",
        asignada: "Juan Rivera",
        estado: "completada",
        prioridad: "media",
        foto: null,
        fechaCreacion: "2026-02-08T13:20:00.000Z",
        fechaActualizacion: "2026-02-09T15:45:00.000Z"
    },
    {
        id: 1707500800000,
        titulo: "Actualización de drivers Windows",
        descripcion: "Computadora portátil necesita actualizar drivers de video para mejorar performance.",
        tipo: "software",
        asignada: "María González",
        estado: "pendiente",
        prioridad: "baja",
        foto: null,
        fechaCreacion: "2026-02-10T12:00:00.000Z",
        fechaActualizacion: "2026-02-10T12:00:00.000Z"
    },
    {
        id: 1707500900000,
        titulo: "Impresora sin conectividad",
        descripcion: "La impresora de piso 2 no se ve en la red. Se necesita reconectar a WiFi.",
        tipo: "red",
        asignada: "Roberto Figueroa",
        estado: "completada",
        prioridad: "media",
        foto: null,
        fechaCreacion: "2026-02-09T09:30:00.000Z",
        fechaActualizacion: "2026-02-09T11:00:00.000Z"
    },
    {
        id: 1707501000000,
        titulo: "Configurar VPN para nuevo empleado",
        descripcion: "Nuevo empleado (Luis Torres) requiere acceso VPN para trabajar desde casa.",
        tipo: "red",
        asignada: "David Rodríguez",
        estado: "completada",
        prioridad: "media",
        foto: null,
        fechaCreacion: "2026-02-07T10:15:00.000Z",
        fechaActualizacion: "2026-02-08T14:30:00.000Z"
    },
    {
        id: 1707501100000,
        titulo: "Restaurar datos de backup",
        descripcion: "Restaurar base de datos de cliente desde backup del 8 de febrero. Corrupción detectada.",
        tipo: "base-datos",
        asignada: "Sandra Cortés",
        estado: "en-progreso",
        prioridad: "urgente",
        foto: null,
        fechaCreacion: "2026-02-10T06:00:00.000Z",
        fechaActualizacion: "2026-02-10T15:00:00.000Z"
    },
    {
        id: 1707501200000,
        titulo: "Revisar permisos de carpetas compartidas",
        descripcion: "Usuarios reportan acceso denegado a carpetas compartidas. Revisar permisos de Active Directory.",
        tipo: "software",
        asignada: "Miguel Ángel Ruiz",
        estado: "pendiente",
        prioridad: "media",
        foto: null,
        fechaCreacion: "2026-02-10T13:45:00.000Z",
        fechaActualizacion: "2026-02-10T13:45:00.000Z"
    },
    {
        id: 1707501300000,
        titulo: "Cambio de contraseña para acceso",
        descripcion: "Empleado requiere cambio de contraseña del sistema. Cambiar a estándar corporativo.",
        tipo: "software",
        asignada: "Elena Torres",
        estado: "completada",
        prioridad: "baja",
        foto: null,
        fechaCreacion: "2026-02-09T14:00:00.000Z",
        fechaActualizacion: "2026-02-09T14:30:00.000Z"
    }
];

// ==================== FUNCIÓN PARA CARGAR DATOS ====================

function cargarDatosEjemplo() {
    if (confirm('¿Cargar datos de ejemplo? Los datos existentes serán reemplazados.')) {
        localStorage.setItem('incidencias_data', JSON.stringify(datosEjemplo));
        location.reload();
        console.log('✅ Datos de ejemplo cargados. Página recargada.');
    }
}

// ==================== CÓMO USAR ====================
/*

Para cargar los datos de ejemplo:

1. Abre la Consola del Navegador (F12 o Ctrl+Shift+I)
2. Copia TODO el contenido de este archivo
3. Pégalo en la consola
4. Ejecuta: cargarDatosEjemplo()
5. Confirma cuando se pida

ALTERNATIVA - Directamente en la consola:

localStorage.setItem('incidencias_data', JSON.stringify(datosEjemplo));
location.reload();

*/

// ==================== DATOS POR EXPORTAR ====================
/*
Si quieres ver el JSON para copiar:

JSON.stringify(datosEjemplo, null, 2)

*/

console.log('✅ Datos de ejemplo disponibles. Ejecuta: cargarDatosEjemplo()');
