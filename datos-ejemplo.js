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

console.log('✅ Datos de ejemplo disponibles. Ejecuta: cargarDatosEjemplo()');