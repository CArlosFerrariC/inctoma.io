# 📋 Incidencias TODO - Gestor de Incidencias

Una aplicación web responsive para gestionar incidencias, tareas y reportes de problemas. Construida con **HTML5, CSS3 y JavaScript vanilla** usando **localStorage** para almacenamiento local.

## ✨ Características

- ✅ **Responsive Design** - Funciona perfectamente en móvil, tablet y desktop
- 📱 **Mobile First** - Optimizado para dispositivos móviles
- 💾 **LocalStorage** - Base de datos local en el navegador (sin servidor necesario)
- 🔍 **Búsqueda Avanzada** - Busca por título, descripción o persona asignada
- 🎯 **Filtros** - Filtra por estado y prioridad
- 📸 **Gestión de Fotos** - Carga y visualiza imágenes (guardadas en Base64)
- ✏️ **CRUD Completo** - Crear, leer, actualizar y eliminar incidencias
- 🎨 **Interfaz Moderna** - Diseño limpio y atractivo
- ⌨️ **Atajos de Teclado** - Ctrl+/ para buscar, Esc para cerrar modales
- 📊 **Estadísticas** - Información sobre el estado de incidencias
- 🌐 **Accesible** - Soporte para navegación por teclado

## 🚀 Cómo Usar

### Instalación
No requiere instalación. Solo necesitas:
1. Descargar los archivos
2. Abrir `index.html` en un navegador web moderno
3. ¡Listo! La aplicación está lista para usar

### Navegadores Soportados
- Chrome/Edge (versión 60+)
- Firefox (versión 55+)
- Safari (versión 11+)
- Opera (versión 47+)

## 📖 Funcionalidades Principales

### Crear Incidencia
1. Rellena el formulario en la sección izquierda
2. **Campos obligatorios**: Título
3. **Campos opcionales**: 
   - Descripción
   - Tipo de Ingeniería
   - Asignada a (nombre)
   - Estado
   - Prioridad
   - Foto
4. Haz clic en "➕ Crear Incidencia"

### Buscar y Filtrar
- **Buscador**: Escribe para buscar por título, descripción o persona asignada
- **Filtro de Estado**: Pendiente, En Progreso, Completada
- **Filtro de Prioridad**: Baja, Media, Alta, Urgente
- Los filtros se pueden combinar

### Ver Detalles
- Haz clic en "👁️ Ver" en cualquier tarjeta para ver todos los detalles
- Se abrirá un modal con la información completa

### Editar Incidencia
- Haz clic en "✏️ Editar" en cualquier tarjeta
- Se abrirá un formulario con los datos actuales
- Realiza los cambios necesarios
- Haz clic en "💾 Guardar Cambios"

### Eliminar Incidencia
- Haz clic en "🗑️ Eliminar"
- Confirma la eliminación en el diálogo
- La incidencia se eliminará permanentemente

## 💾 Almacenamiento de Datos

### LocalStorage
- Los datos se guardan automáticamente en el navegador
- No se envía información a servidores externos
- Los datos persisten entre sesiones
- Capacidad típica: 5-10 MB

### Exportar Datos
Abre la consola del navegador (F12) y ejecuta:
```javascript
exportarDatos();
```
Descargará un archivo JSON con todas tus incidencias.

### Importar Datos
Abre la consola del navegador (F12) y ejecuta:
```javascript
// Primero selecciona el archivo
// Luego puedes importarlo con esta función
importarDatos(archivo);
```

### Ver Estadísticas
Abre la consola del navegador (F12) y ejecuta:
```javascript
mostrarEstadisticas();
```

### Limpiar Todo (⚠️ Precaución)
Abre la consola del navegador (F12) y ejecuta:
```javascript
limpiarTodo();
```

## 📊 Estados de Incidencia

- 🔴 **Pendiente** - No ha comenzado
- 🟡 **En Progreso** - Se está trabajando en ello
- 🟢 **Completada** - Finalizada

## 🎯 Niveles de Prioridad

- **Baja** - Puede esperar
- **Media** - Prioridad normal (por defecto)
- **Alta** - Importante
- **Urgente** - Crítico

## 📱 Diseño Responsivo

La aplicación se adapta automáticamente a:
- 📱 Móviles (pantallas < 480px)
- 📱 Tablets (480px - 768px)
- 💻 Desktops (768px - 1024px)
- 🖥️ Pantallas grandes (> 1024px)

## ⌨️ Atajos de Teclado

| Atajo | Función |
|-------|---------|
| Ctrl + / | Enfoca la barra de búsqueda |
| Escape | Cierra modales abiertos |
| Tab | Navega entre elementos |

## 🔒 Privacidad y Seguridad

- 🔐 Los datos nunca salen de tu navegador
- 📱 No hay conectividad a internet
- 🚫 El navegador no guarda copias de seguridad automáticas
- 💡 **Consejo**: Exporta regularmente tus datos como copia de seguridad

## 📁 Estructura de Carpetas

```
inctoma.io/
├── index.html              # Archivo principal HTML
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos CSS (responsivo)
│   ├── js/
│   │   └── app.js          # Lógica JavaScript
│   └── img/                # Carpeta para imágenes
├── README.md               # Este archivo
└── LICENSE
```

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos responsivos y animaciones
- **JavaScript ES6+** - Lógica de la aplicación
- **LocalStorage API** - Persistencia de datos
- **File API** - Manejo de imágenes

## 🐛 Solución de Problemas

### "Los datos no se guardan"
- Asegúrate de que tu navegador permite LocalStorage
- Algunos navegadores en modo incógnito no lo permiten
- Intenta en modo no incógnito

### "Las imágenes son muy grandes"
- Las imágenes se codifican en Base64, lo que aumenta su tamaño
- Intenta comprimir las imágenes antes de cargarlas
- Máximo recomendado: 2-3 MB

### "No puedo abrir la aplicación"
- Asegúrate de abrir `index.html` en un navegador
- No uses rutas UNC (\\server\file)
- Usa una ruta local o un servidor web

## 📝 Historial de Cambios

### Versión 1.0
- ✅ Sistema CRUD completo
- ✅ Búsqueda y filtros
- ✅ Diseño responsivo
- ✅ Gestión de fotos
- ✅ Almacenamiento en LocalStorage
- ✅ Modales para ver y editar
- ✅ Atajos de teclado

## 🎯 Mejoras Futuras

- [ ] Sincronización en la nube (Firebase, Supabase)
- [ ] Exportar a PDF
- [ ] Impresión de reportes
- [ ] Colaboración en tiempo real
- [ ] Notificaciones
- [ ] Categorías personalizadas
- [ ] Sistema de comentarios
- [ ] Historial de cambios

## 📞 Contacto y Soporte

Para reportar bugs o sugerencias, creá un issue en el repositorio.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Hecho con ❤️ para gestionar incidencias de manera eficiente**

*Última actualización: Febrero 2026*
