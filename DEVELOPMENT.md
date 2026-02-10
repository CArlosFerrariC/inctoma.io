# 🔧 Guía de Desarrollo

Instrucciones para desarrolladores que deseen modificar o mejorar la aplicación.

## 📋 Requisitos

- Editor de código (VS Code, Sublime Text, etc.)
- Navegador moderno con DevTools
- Git (opcional, para versionado)

## 🏗️ Estructura del Proyecto

```
assets/
├── css/
│   └── styles.css          # Estilos CSS (3000+ líneas)
├── js/
│   └── app.js              # Lógica JavaScript (800+ líneas)
└── img/                    # Activos de imagen

index.html                  # Punto de entrada (HTML5)
GUIA_USO.md                 # Manual de usuario
DEVELOPMENT.md              # Este archivo
```

## 🎨 Guía de Estilos CSS

### Variables de Color (definidas en :root)

```css
--primary-color: #3498db;      /* Azul principal */
--secondary-color: #2c3e50;    /* Gris oscuro */
--success-color: #27ae60;      /* Verde */
--warning-color: #f39c12;      /* Naranja */
--danger-color: #e74c3c;       /* Rojo */
--light-bg: #ecf0f1;           /* Fondo gris claro */
--white: #ffffff;              /* Blanco */
--text-primary: #2c3e50;       /* Texto principal */
--text-secondary: #7f8c8d;     /* Texto secundario */
```

### Breakpoints Responsivos

```css
< 480px    → Móviles pequeños
480 - 768px   → Tablets
768 - 1024px  → Desktops medianos
> 1024px   → Desktops grandes
```

### Agregar nuevos estilos

1. Las variables globales están en `:root`
2. Los estilos están organizados por sección (comentarios con `====`)
3. Las media queries están al final del archivo
4. Usa `--variable-name` para mantener consistencia

### Forma correcta de agregar un botón nuevo

```css
.btn-custom {
    background-color: var(--primary-color);
    color: var(--white);
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.btn-custom:hover {
    background-color: #2980b9;
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}
```

## 🧠 Estructura del Código JavaScript

### 1. Estado Global (líneas 1-10)

```javascript
const STORAGE_KEY = 'incidencias_data';
let incidenciasActuales = [];        // Array de todas las incidencias
let incidenciasFiltered = [];        // Array de incidencias filtradas
let editingId = null;                // ID de incidencia siendo editada
```

### 2. Funciones Principales por Categoría

#### CRUD (Crear, Leer, Actualizar, Eliminar)
- `handleCrearIncidencia()` - Crear nueva incidencia
- `handleActualizarIncidencia()` - Actualizar existente
- `eliminarIncidencia(id)` - Eliminar por ID

#### LocalStorage
- `guardarIncidencias()` - Guardar en localStorage
- `cargarIncidencias()` - Cargar de localStorage

#### Búsqueda y Filtros
- `aplicarFiltros()` - Filtrar incidencias
- `renderizarIncidencias()` - Renderizar lista completa
- `crearTarjetaIncidencia(incidencia)` - Crear HTML de una tarjeta

#### Modales
- `abrirModalEdicion(id)` - Abrir modal de edición
- `abrirModalVista(id)` - Abrir modal de vista
- `cerrarModales()` - Cerrar todos los modales

#### Utilidades
- `escapeHtml(texto)` - Prevenir XSS
- `mostrarNotificacion(mensaje, tipo)` - Mostrar notificaciones
- `exportarDatos()` - Exportar a JSON
- `importarDatos(archivo)` - Importar desde JSON

### 3. Pasos Para Agregar Nuevas Características

#### Ejemplo: Agregar campo "Departamento"

**Paso 1: Agregar al HTML**
```html
<div class="form-group">
    <label for="departamento">Departamento</label>
    <input type="text" id="departamento" class="form-control">
</div>
```

**Paso 2: Actualizar handleCrearIncidencia()**
```javascript
const departamento = document.getElementById('departamento').value.trim();

const nuevaIncidencia = {
    // ... otros campos
    departamento,  // AGREGAR AQUÍ
};
```

**Paso 3: Agregar a crearTarjetaIncidencia()**
```javascript
${incidencia.departamento ? `<div class="meta-item"><span class="meta-label">🏢 Depto:</span> ${escapeHtml(incidencia.departamento)}</div>` : ''}
```

**Paso 4: Agregar a modales de edición y vista**

## 📊 Modelo de Datos

### Estructura de Incidencia

```javascript
{
    id: 1644067200000,                      // Timestamp (único)
    titulo: "Software no responde",         // Requerido
    descripcion: "El aplicativo X...",      // Opcional
    tipo: "software",                       // software|hardware|red|base-datos|otro
    asignada: "Juan Pérez",                 // Opcional, nombre persona
    estado: "pendiente",                    // pendiente|en-progreso|completada
    prioridad: "alta",                      // baja|media|alta|urgente
    foto: "data:image/jpeg;base64,...",    // Opcional, Base64
    fechaCreacion: "2026-02-10T...",       // ISO 8601
    fechaActualizacion: "2026-02-10T..."   // ISO 8601
}
```

## 🧪 Depuración

### En la Consola del Navegador (F12)

```javascript
// Ver todas las incidencias
incidenciasActuales

// Ver incidencias filtradas actuales
incidenciasFiltered

// Ver localStorage
JSON.parse(localStorage.getItem('incidencias_data'))

// Exportar datos
exportarDatos()

// Ver estadísticas
mostrarEstadisticas()

// Limpiar todo (⚠️ PELIGRO)
limpiarTodo()
```

## 🎯 Mejoras Sugeridas

### 1. Agregar Categorías Personalizadas
Permitir al usuario crear categorías personalizadas en lugar de tipos fijos.

### 2. Sistema de Etiquetas
Permitir múltiples etiquetas por incidencia para mejor organización.

### 3. Comentarios y Notas
Añadir sistema de comentarios para colaboración.

### 4. Historial de Cambios
Guardar versiones anteriores de cada incidencia.

### 5. Recordatorios
Notificar cuando una incidencia está próxima a vencer o está pendiente hace mucho.

### 6. Integración con APIs
Conectar con servicios como Slack, Teams, Email.

### 7. Gráficas
Mostrar estadísticas con librerías como Chart.js.

## 🔒 Seguridad

### Vulnerabilidades Prevenidas

1. **XSS (Cross-Site Scripting)**
   - Usamos `escapeHtml()` para sanitizar entrada
   - No usamos `innerHTML` directamente con datos de usuario

2. **Inyección de Datos**
   - Validamos tipos y longitudes en JavaScript
   - HTML5 valida automáticamente ciertos inputs

3. **Almacenamiento Seguro**
   - LocalStorage no puede ser interceptado por HTTPS
   - En producción, usar localStorage con HTTPS

### Recomendaciones para Producción

1. Agregar autenticación de usuarios
2. Implementar encriptación para datos sensibles
3. Usar backend para validación
4. Implementar HTTPS obligatorio
5. Agregar logging de auditoría
6. Realizar backups automáticos

## 🚀 Optimización

### Performance

1. **Lazy Loading de Imágenes**
   - Las imágenes en Base64 son pesadas
   - Considera usar URLs en lugar de Base64

2. **Paginación**
   - Para >1000 incidencias, agregar paginación
   - Actualmente renderiza todas a la vez

3. **Indexación de Búsqueda**
   - Implementar búsqueda más rápida con índices

4. **Web Workers**
   - Usar para procesamiento pesado de datos

### Accesibilidad

- ARIA labels están implementados
- Navegación por teclado funcional
- Contraste de colores WCAG AA
- Fuentes legibles

## 📦 Dependencias

**Sin dependencias externas** - Solo HTML5, CSS3 y JavaScript vanilla.

Esto facilita el mantenimiento y evita problemas de compatibilidad.

## 📚 Recursos

- [MDN Web Docs](https://developer.mozilla.org/)
- [HTML5 Spec](https://html.spec.whatwg.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript Info](https://javascript.info/)
- [LocalStorage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🐛 Reporte de Bugs

Formato sugerido:

```
Título: [BREVE DESCRIPCIÓN]
Navegador: Chrome/Firefox/Safari/Edge
Versión: X.X.X
Pasos para reproducir:
1. ...
2. ...
3. ...

Comportamiento esperado:
...

Comportamiento actual:
...

Captura de pantalla:
[adjuntar si es posible]
```

## 🔄 Versionado

Usar [Semantic Versioning](https://semver.org/):
- **MAJOR.MINOR.PATCH** (ej: 1.2.3)
- MAJOR: cambios incompatibles
- MINOR: nuevas características
- PATCH: correcciones de bugs

## 📝 Convenciones de Código

### Nombres de Variables

```javascript
// ✅ Correcto
const incidenciaActual = {...};
let tienePermiso = true;
const STORAGE_KEY = 'incidencias_data';

// ❌ Incorrecto
const i = {...};
const haspermi = true;
const storageKey = 'incidencias_data'; // constantes en MAYÚSCULAS
```

### Comentarios

```javascript
// ✅ Buen comentario
// Validar que el email tenga formato correcto
const esEmailValido = email.includes('@');

// ❌ Malo comentario
// var
const esEmailValido = email.includes('@');
```

### Funciones

```javascript
// ✅ Correcto
function crearTarjetaIncidencia(incidencia) {
    // función pequeña, clara, reutilizable
}

// ❌ Incorrecto
function c(i) {
    // función con nombre no descriptivo
}
```

---

**Última actualización: Febrero 2026**
