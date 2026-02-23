// ==================== CONFIGURACIÓN INICIAL ====================
const STORAGE_KEY = 'incidencias_data';
let incidenciasActuales = [];
let incidenciasFiltered = [];
let editingId = null;
let statusChart = null;
let priorityChart = null;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar buscador dinámico
    initDynamicSearch();

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
    if (form) form.addEventListener('submit', handleCrearIncidencia);

    // Buscador
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', aplicarFiltros);

    // Filtros
    const filterStatus = document.getElementById('filterStatus');
    const filterPriority = document.getElementById('filterPriority');
    if (filterStatus) filterStatus.addEventListener('change', aplicarFiltros);
    if (filterPriority) filterPriority.addEventListener('change', aplicarFiltros);

    // Botón Exportar PDF
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportarPDF);
    }

    // Modales
    const editModal = document.getElementById('editModal');
    const viewModal = document.getElementById('viewModal');
    const editForm = document.getElementById('editForm');
    
    // Cerrar modal de edición
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', cerrarModales);
    });

    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', cerrarModales);
    if (editForm) editForm.addEventListener('submit', handleActualizarIncidencia);

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === editModal || e.target === viewModal) {
            cerrarModales();
        }
    });

    // Manejo de archivo de foto
    const fotoInput = document.getElementById('foto');
    if (fotoInput) fotoInput.addEventListener('change', manejarFoto);
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
        mostrarNotificacion('El título es obligatorio', 'danger');
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
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const priorityFilter = document.getElementById('filterPriority').value;

    incidenciasFiltered = incidenciasActuales.filter(incidencia => {
        const coincideTexto = incidencia.titulo.toLowerCase().includes(searchTerm) ||
                            incidencia.descripcion.toLowerCase().includes(searchTerm) ||
                            (incidencia.asignada && incidencia.asignada.toLowerCase().includes(searchTerm));

        const coincideEstado = !statusFilter || incidencia.estado === statusFilter;
        const coincidePrioridad = !priorityFilter || incidencia.prioridad === priorityFilter;

        return coincideTexto && coincideEstado && coincidePrioridad;
    });

    renderizarIncidencias();
}

// ==================== RENDERIZAR ====================

function renderizarIncidencias() {
    const lista = document.getElementById('incidenciasList');
    if (!lista) return;

    const totalBadge = document.getElementById('totalIncidencias');
    const incidenciasAMostrar = (incidenciasFiltered && incidenciasFiltered.length > 0) ? incidenciasFiltered : incidenciasActuales;

    // Mostrar cantidad total
    const cantidadTotal = incidenciasAMostrar.length;
    if (totalBadge) totalBadge.textContent = cantidadTotal;
    
    renderizarEstadisticas();

    if (cantidadTotal === 0 && incidenciasActuales.length === 0) {
        lista.innerHTML = '<p class="empty-message">No hay incidencias. ¡Crea una nueva!</p>';
        return;
    } else if (cantidadTotal === 0 && incidenciasActuales.length > 0) {
        lista.innerHTML = '<p class="empty-message">No se encontraron incidencias con los filtros aplicados.</p>';
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
        <div class="incidencia-card prioridad-${incidencia.prioridad}" onclick="abrirModalVista(${incidencia.id})">
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

    const editId = document.getElementById('editId');
    if (editId) {
        editId.value = id;
        document.getElementById('editTitulo').value = incidencia.titulo;
        document.getElementById('editDescripcion').value = incidencia.descripcion;
        document.getElementById('editTipo').value = incidencia.tipo;
        document.getElementById('editAsignada').value = incidencia.asignada;
        document.getElementById('editEstado').value = incidencia.estado;
        document.getElementById('editPrioridad').value = incidencia.prioridad;

        document.getElementById('editModal').classList.add('show');
    }
    editingId = id;
}

function abrirModalVista(id) {
    const incidencia = incidenciasActuales.find(i => i.id === id);
    if (!incidencia) {
        // Si no está en incidenciasActuales, podría ser una búsqueda del backend
        // En un caso real, aquí harías fetch(`/api/incidencias/${id}`)
        console.log('Incidencia no encontrada localmente para vista rápida.');
        return;
    }

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
                ${emojisEstado[incidencia.estado] || ''} ${incidencia.estado}
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
                <span class="view-label">📁 Tipo:</span>
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

    const viewContent = document.getElementById('viewContent');
    if (viewContent) {
        viewContent.innerHTML = html;
        document.getElementById('viewModal').classList.add('show');
    } else {
        // Si no hay modal de vista (como en index.html actual), mostrar en consola o alert
        alert(`Detalle: ${incidencia.titulo}\n${incidencia.descripcion}`);
    }
}

function cerrarModales() {
    const editModal = document.getElementById('editModal');
    const viewModal = document.getElementById('viewModal');
    if (editModal) editModal.classList.remove('show');
    if (viewModal) viewModal.classList.remove('show');
    editingId = null;
}

// ==================== MANEJO DE FOTOS ====================

function manejarFoto(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const tiposValidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!tiposValidos.includes(archivo.type)) {
        alert('Solo se permiten imágenes (JPEG, PNG, GIF, WebP)');
        e.target.value = '';
        return;
    }

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
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    const notif = document.createElement('div');
    notif.classList.add('notification');
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
        animation: slideInRight 0.3s ease forwards;
        font-weight: 500;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ==================== ESTADÍSTICAS Y GRÁFICOS ====================

function obtenerEstadisticas() {
    const total = incidenciasActuales.length;
    const stats = {
        total: total,
        estados: { pendiente: 0, 'en-progreso': 0, completada: 0 },
        prioridades: { baja: 0, media: 0, alta: 0, urgente: 0 },
    };

    for (const inc of incidenciasActuales) {
        if (stats.estados[inc.estado] !== undefined) stats.estados[inc.estado]++;
        if (stats.prioridades[inc.prioridad] !== undefined) stats.prioridades[inc.prioridad]++;
    }
    return stats;
}

function renderizarEstadisticas() {
    const stats = obtenerEstadisticas();
    const statusCanvas = document.getElementById('statusChart');
    const priorityCanvas = document.getElementById('priorityChart');

    if (!statusCanvas || !priorityCanvas || typeof Chart === 'undefined') return;
    
    const statusCtx = statusCanvas.getContext('2d');
    if (statusChart) statusChart.destroy();
    statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pendiente', 'En Progreso', 'Completada'],
            datasets: [{
                data: [stats.estados.pendiente, stats.estados['en-progreso'], stats.estados.completada],
                backgroundColor: ['#e74c3c', '#f39c12', '#27ae60'],
                borderColor: '#ffffff',
                borderWidth: 3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    const priorityCtx = priorityCanvas.getContext('2d');
    if (priorityChart) priorityChart.destroy();
    priorityChart = new Chart(priorityCtx, {
        type: 'bar',
        data: {
            labels: ['Baja', 'Media', 'Alta', 'Urgente'],
            datasets: [{
                label: 'Prioridad',
                data: [stats.prioridades.baja, stats.prioridades.media, stats.prioridades.alta, stats.prioridades.urgente],
                backgroundColor: ['#2ecc71', '#f1c40f', '#e67e22', '#c0392b']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// ==================== BUSCADOR DINÁMICO (NUEVO) ====================

let lastSearchResults = [];

function initDynamicSearch() {
    const searchInput = document.getElementById('dynamicSearch');
    const suggestionsContainer = document.getElementById('suggestions');

    if (!searchInput || !suggestionsContainer) return;

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(debounceTimer);
        
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        debounceTimer = setTimeout(() => {
            fetch(`/api/incidencias/search?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    lastSearchResults = data;
                    renderSuggestions(data, query);
                })
                .catch(err => console.error('Error en búsqueda:', err));
        }, 300);
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

function renderSuggestions(results, query) {
    const suggestionsContainer = document.getElementById('suggestions');
    if (results.length === 0) {
        suggestionsContainer.innerHTML = '<div class="suggestion-item">No se encontraron resultados</div>';
    } else {
        suggestionsContainer.innerHTML = results.map((item, index) => {
            const titleText = item.titulo || item.descripcion || '';
            const title = highlightMatch(titleText, query);
            const codeText = item.codigo || '';
            const code = codeText ? `<span class="code">${highlightMatch(codeText, query)}</span>` : '';
            return `
                <div class="suggestion-item" onclick="selectSuggestion(${index})">
                    ${code}
                    <div>${title}</div>
                </div>
            `;
        }).join('');
    }
    suggestionsContainer.style.display = 'block';
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="match">$1</span>');
}

function selectSuggestion(index) {
    const item = lastSearchResults[index];
    if (!item) return;

    console.log('Seleccionado:', item);

    // Rellenar campos
    const descText = document.getElementById('descText');
    const techDetails = document.getElementById('techDetails');
    const photoSection = document.getElementById('photoSection');

    if (descText) descText.textContent = item.titulo || 'Sin título';
    if (techDetails) techDetails.textContent = item.descripcion || 'Sin descripción adicional';

    // Mostrar foto
    if (photoSection) {
        if (item.foto) {
            photoSection.innerHTML = `<img src="${item.foto}" alt="${item.titulo}" style="width: 100%; height: 100%; object-fit: contain;">`;
        } else {
            photoSection.innerHTML = `
                <div class="photo-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p>Sin Foto</p>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem;">Esta incidencia no tiene imagen asociada</p>
                </div>
            `;
        }
    }

    document.getElementById('suggestions').style.display = 'none';
    document.getElementById('dynamicSearch').value = item.codigo || item.titulo || '';
}

// ==================== EXPORTAR PDF (SIMPLIFICADO) ====================
function exportarPDF() {
    alert('Función de exportación PDF activada');
}
