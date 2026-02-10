// ==================== CONFIGURACIÓN INICIAL ====================
const STORAGE_KEY = 'incidencias_data';
let incidenciasActuales = [];
let incidenciasFiltered = [];
let editingId = null;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    // Intentar cargar datos del archivo JSON
    fetch('incidencias_combined.json')
        .then(response => {
            if (!response.ok) throw new Error('JSON no encontrado');
            return response.json();
        })
        .then(data => {
            // Si el JSON es un array, usarlo directamente
            if (Array.isArray(data)) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                console.log('✅ Datos cargados desde incidencias_combined.json');
            }
            cargarIncidencias();
            configurarEventos();
            renderizarIncidencias();
        })
        .catch(error => {
            // Si no hay JSON, cargar del localStorage
            console.log('ℹ️ Usando datos del localStorage');
            cargarIncidencias();
            configurarEventos();
            renderizarIncidencias();
        });
});

// ==================== CONFIGURAR EVENTOS ====================
function configurarEventos() {
    // Formulario principal
    const form = document.getElementById('incidenciaForm');
    form.addEventListener('submit', handleCrearIncidencia);

    // Buscador
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', aplicarFiltros);

    // Filtros
    const filterStatus = document.getElementById('filterStatus');
    const filterPriority = document.getElementById('filterPriority');
    filterStatus.addEventListener('change', aplicarFiltros);
    filterPriority.addEventListener('change', aplicarFiltros);

    // Modales
    const editModal = document.getElementById('editModal');
    const viewModal = document.getElementById('viewModal');
    const editForm = document.getElementById('editForm');
    
    // Cerrar modal de edición
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', cerrarModales);
    });

    document.getElementById('closeModal').addEventListener('click', cerrarModales);
    editForm.addEventListener('submit', handleActualizarIncidencia);

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === editModal || e.target === viewModal) {
            cerrarModales();
        }
    });

    // Manejo de archivo de foto
    document.getElementById('foto').addEventListener('change', manejarFoto);
}

// ==================== CRUD OPERATIONS ====================

// Crear nueva incidencia
function handleCrearIncidencia(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const tipo = document.getElementById('tipo').value;
    const asignada = document.getElementById('asignada').value.trim();
    const estado = document.getElementById('estado').value;
    const prioridad = document.getElementById('prioridad').value;
    const fotoInput = document.getElementById('foto');

    if (!titulo) {
        alert('El título es obligatorio');
        return;
    }

    const nuevaIncidencia = {
        id: Date.now(),
        titulo,
        descripcion,
        tipo,
        asignada,
        estado,
        prioridad,
        foto: fotoInput.dataset.fotoBase64 || null,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
    };

    incidenciasActuales.push(nuevaIncidencia);
    guardarIncidencias();
    renderizarIncidencias();

    // Limpiar formulario
    document.getElementById('incidenciaForm').reset();
    fotoInput.dataset.fotoBase64 = null;
    
    // Mostrar notificación
    mostrarNotificacion('Incidencia creada exitosamente', 'success');
}

// Actualizar incidencia
function handleActualizarIncidencia(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const titulo = document.getElementById('editTitulo').value.trim();
    const descripcion = document.getElementById('editDescripcion').value.trim();
    const tipo = document.getElementById('editTipo').value;
    const asignada = document.getElementById('editAsignada').value.trim();
    const estado = document.getElementById('editEstado').value;
    const prioridad = document.getElementById('editPrioridad').value;

    const indice = incidenciasActuales.findIndex(i => i.id === id);
    if (indice >= 0) {
        incidenciasActuales[indice] = {
            ...incidenciasActuales[indice],
            titulo,
            descripcion,
            tipo,
            asignada,
            estado,
            prioridad,
            fechaActualizacion: new Date().toISOString()
        };

        guardarIncidencias();
        renderizarIncidencias();
        cerrarModales();
        mostrarNotificacion('Incidencia actualizada exitosamente', 'success');
    }
}

// Eliminar incidencia
function eliminarIncidencia(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta incidencia?')) {
        incidenciasActuales = incidenciasActuales.filter(i => i.id !== id);
        guardarIncidencias();
        renderizarIncidencias();
        mostrarNotificacion('Incidencia eliminada', 'info');
    }
}

// ==================== LOCALSTORAGE ====================

function guardarIncidencias() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(incidenciasActuales));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        alert('Error al guardar los datos. El almacenamiento local podría estar lleno.');
    }
}

function cargarIncidencias() {
    try {
        const datos = localStorage.getItem(STORAGE_KEY);
        incidenciasActuales = datos ? JSON.parse(datos) : [];
    } catch (error) {
        console.error('Error al cargar de localStorage:', error);
        incidenciasActuales = [];
    }
}

// ==================== BÚSQUEDA Y FILTROS ====================

function aplicarFiltros() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const priorityFilter = document.getElementById('filterPriority').value;

    incidenciasFiltered = incidenciasActuales.filter(incidencia => {
        const coincideTexto = incidencia.titulo.toLowerCase().includes(searchTerm) ||
                            incidencia.descripcion.toLowerCase().includes(searchTerm) ||
                            incidencia.asignada.toLowerCase().includes(searchTerm);

        const coincideEstado = !statusFilter || incidencia.estado === statusFilter;
        const coincidePrioridad = !priorityFilter || incidencia.prioridad === priorityFilter;

        return coincideTexto && coincideEstado && coincidePrioridad;
    });

    renderizarIncidencias();
}

// ==================== RENDERIZAR ====================

function renderizarIncidencias() {
    const lista = document.getElementById('incidenciasList');
    const totalBadge = document.getElementById('totalIncidencias');
    const incidenciasAMostrar = incidenciasFiltered.length > 0 ? incidenciasFiltered : incidenciasActuales;

    // Mostrar cantidad total
    const cantidadTotal = incidenciasAMostrar.length;
    totalBadge.textContent = cantidadTotal;

    if (cantidadTotal === 0) {
        lista.innerHTML = '<p class="empty-message">No hay incidencias. ¡Crea una nueva!</p>';
        return;
    }

    // Ordenar por fecha de actualización (más recientes primero)
    const incidenciasOrdenadas = [...incidenciasAMostrar].sort((a, b) => 
        new Date(b.fechaActualizacion) - new Date(a.fechaActualizacion)
    );

    lista.innerHTML = incidenciasOrdenadas.map(incidencia => crearTarjetaIncidencia(incidencia)).join('');

    // Agregar event listeners a los botones
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            abrirModalVista(id);
        });
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            abrirModalEdicion(id);
        });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            eliminarIncidencia(id);
        });
    });
}

function crearTarjetaIncidencia(incidencia) {
    const fechaCreacion = new Date(incidencia.fechaCreacion).toLocaleDateString('es-ES');
    const emojisEstado = {
        'pendiente': '🔴',
        'en-progreso': '🟡',
        'completada': '🟢'
    };
    const emojiEstado = emojisEstado[incidencia.estado] || '•';

    return `
        <div class="incidencia-card">
            <div class="incidencia-header">
                <div class="incidencia-title">${escapeHtml(incidencia.titulo)}</div>
                <span class="incidencia-status status-${incidencia.estado}">
                    ${emojiEstado} ${incidencia.estado.charAt(0).toUpperCase() + incidencia.estado.slice(1).replace('-', ' ')}
                </span>
            </div>

            ${incidencia.foto ? `<img src="${incidencia.foto}" alt="Foto de incidencia" class="incidencia-foto">` : ''}

            ${incidencia.descripcion ? `<p class="incidencia-description">${escapeHtml(incidencia.descripcion)}</p>` : ''}

            <div class="incidencia-meta">
                ${incidencia.tipo ? `<div class="meta-item"><span class="meta-label">📁 Tipo:</span> ${escapeHtml(incidencia.tipo)}</div>` : ''}
                ${incidencia.asignada ? `<div class="meta-item"><span class="meta-label">👤 Asignada:</span> ${escapeHtml(incidencia.asignada)}</div>` : ''}
                <div class="meta-item"><span class="meta-label">📅 Fecha:</span> ${fechaCreacion}</div>
                <span class="prioridad-badge prioridad-${incidencia.prioridad}">
                    ${incidencia.prioridad.charAt(0).toUpperCase() + incidencia.prioridad.slice(1)}
                </span>
            </div>

            <div class="incidencia-actions">
                <button class="btn btn-view btn-small" data-id="${incidencia.id}">👁️ Ver</button>
                <button class="btn btn-edit btn-small" data-id="${incidencia.id}">✏️ Editar</button>
                <button class="btn btn-delete btn-small" data-id="${incidencia.id}">🗑️ Eliminar</button>
            </div>
        </div>
    `;
}

// ==================== MODALES ====================

function abrirModalEdicion(id) {
    const incidencia = incidenciasActuales.find(i => i.id === id);
    if (!incidencia) return;

    document.getElementById('editId').value = id;
    document.getElementById('editTitulo').value = incidencia.titulo;
    document.getElementById('editDescripcion').value = incidencia.descripcion;
    document.getElementById('editTipo').value = incidencia.tipo;
    document.getElementById('editAsignada').value = incidencia.asignada;
    document.getElementById('editEstado').value = incidencia.estado;
    document.getElementById('editPrioridad').value = incidencia.prioridad;

    document.getElementById('editModal').classList.add('show');
    editingId = id;
}

function abrirModalVista(id) {
    const incidencia = incidenciasActuales.find(i => i.id === id);
    if (!incidencia) return;

    const fechaCreacion = new Date(incidencia.fechaCreacion).toLocaleString('es-ES');
    const fechaActualizacion = new Date(incidencia.fechaActualizacion).toLocaleString('es-ES');

    const emojisEstado = {
        'pendiente': '🔴',
        'en-progreso': '🟡',
        'completada': '🟢'
    };

    let html = `
        <div class="view-content-header">
            <h2>${escapeHtml(incidencia.titulo)}</h2>
            <span class="incidencia-status status-${incidencia.estado}">
                ${emojisEstado[incidencia.estado]} ${incidencia.estado}
            </span>
        </div>
    `;

    if (incidencia.foto) {
        html += `<img src="${incidencia.foto}" alt="Foto" class="incidencia-foto">`;
    }

    html += `
        ${incidencia.descripcion ? `
            <div class="view-item">
                <span class="view-label">📝 Descripción:</span>
                <span class="view-value">${escapeHtml(incidencia.descripcion)}</span>
            </div>
        ` : ''}

        ${incidencia.tipo ? `
            <div class="view-item">
                <span class="view-label">📁 Tipo de Ingeniería:</span>
                <span class="view-value">${escapeHtml(incidencia.tipo)}</span>
            </div>
        ` : ''}

        ${incidencia.asignada ? `
            <div class="view-item">
                <span class="view-label">👤 Asignada a:</span>
                <span class="view-value">${escapeHtml(incidencia.asignada)}</span>
            </div>
        ` : ''}

        <div class="view-item">
            <span class="view-label">🎯 Prioridad:</span>
            <span class="view-value">
                <span class="prioridad-badge prioridad-${incidencia.prioridad}">
                    ${incidencia.prioridad}
                </span>
            </span>
        </div>

        <div class="view-item">
            <span class="view-label">📅 Creada:</span>
            <span class="view-value">${fechaCreacion}</span>
        </div>

        <div class="view-item">
            <span class="view-label">🔄 Actualizada:</span>
            <span class="view-value">${fechaActualizacion}</span>
        </div>

        <button class="btn btn-primary modal-close-btn" onclick="cerrarModales()">Cerrar</button>
    `;

    document.getElementById('viewContent').innerHTML = html;
    document.getElementById('viewModal').classList.add('show');
}

function cerrarModales() {
    document.getElementById('editModal').classList.remove('show');
    document.getElementById('viewModal').classList.remove('show');
    editingId = null;
}

// ==================== MANEJO DE FOTOS ====================

function manejarFoto(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    // Validar tipo MIME
    const tiposValidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!tiposValidos.includes(archivo.type)) {
        alert('Solo se permiten imágenes (JPEG, PNG, GIF, WebP)');
        e.target.value = '';
        return;
    }

    // Validar tamaño (máximo 5MB)
    const tamanioMax = 5 * 1024 * 1024;
    if (archivo.size > tamanioMax) {
        alert('La imagen no debe superar 5MB');
        e.target.value = '';
        return;
    }

    const lector = new FileReader();
    lector.onload = (evento) => {
        e.target.dataset.fotoBase64 = evento.target.result;
    };
    lector.readAsDataURL(archivo);
}

// ==================== UTILIDADES ====================

function escapeHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${tipo === 'success' ? '#27ae60' : tipo === 'danger' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    // Remover después de 3 segundos
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ==================== EXPORTAR E IMPORTAR DATOS ====================

// Exportar datos como JSON
function exportarDatos() {
    const datos = JSON.stringify(incidenciasActuales, null, 2);
    const blob = new Blob([datos], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incidencias-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    mostrarNotificacion('Datos exportados exitosamente', 'success');
}

// Importar datos desde JSON
function importarDatos(archivo) {
    const lector = new FileReader();
    lector.onload = (evento) => {
        try {
            const datos = JSON.parse(evento.target.result);
            if (Array.isArray(datos) && confirm('¿Deseas reemplazar todos los datos?')) {
                incidenciasActuales = datos;
                guardarIncidencias();
                renderizarIncidencias();
                mostrarNotificacion('Datos importados exitosamente', 'success');
            }
        } catch (error) {
            alert('Error al importar: formato inválido');
        }
    };
    lector.readAsText(archivo);
}

// Limpiar todo (para desarrollo)
function limpiarTodo() {
    if (confirm('⚠️ ¿Deseas eliminar TODAS las incidencias? Esta acción no se puede deshacer.')) {
        incidenciasActuales = [];
        guardarIncidencias();
        renderizarIncidencias();
        mostrarNotificacion('Todos los datos han sido eliminados', 'info');
    }
}

// ==================== ANIMACIÓN CSS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== ESTADÍSTICAS (Opcional) ====================

function obtenerEstadisticas() {
    return {
        total: incidenciasActuales.length,
        pendientes: incidenciasActuales.filter(i => i.estado === 'pendiente').length,
        enProgreso: incidenciasActuales.filter(i => i.estado === 'en-progreso').length,
        completadas: incidenciasActuales.filter(i => i.estado === 'completada').length,
        urgentes: incidenciasActuales.filter(i => i.prioridad === 'urgente').length
    };
}

// Mostrar estadísticas en consola
function mostrarEstadisticas() {
    const stats = obtenerEstadisticas();
    console.log('📊 Estadísticas de Incidencias:', stats);
}

// ==================== ATAJOS DE TECLADO ====================
document.addEventListener('keydown', (e) => {
    // Ctrl + / para abrir/cerrar search
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }

    // Escape para cerrar modales
    if (e.key === 'Escape') {
        cerrarModales();
    }
});
