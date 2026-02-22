# 🚀 INICIO RÁPIDO

## ¡Comienza en 30 segundos!

### 1️⃣ Abre la Aplicación
1. Haz doble clic en **`index.html`**
2. Se abrirá en tu navegador predeterminado
3. ¡La aplicación está lista!

### 2️⃣ Prueba con Datos de Ejemplo (Opcional)
Si quieres ver la app funcionar inmediatamente con datos:

1. Abre la **Consola del Navegador** (presiona `F12`)
2. Copia y pega esto:

```javascript
// Copiar TODO lo de abajo
fetch('datos-ejemplo.js').then(r=>r.text()).then(eval).then(()=>cargarDatosEjemplo());
```

O más simple, en la consola escribe:
```javascript
cargarDatosEjemplo();
```

3. Haz clic en **Recargar** (F5) la página

### 3️⃣ Crea tu Primera Incidencia
En el formulario a la izquierda:
1. Escribe un título (ej: "Mi primer incidente")
2. Agrega descripción (opcional)
3. Selecciona estado y prioridad
4. Haz clic en **➕ Crear Incidencia**

**¡Listo!** Tu incidencia aparecerá en la lista de la derecha.

---

## 💡 Funciones Principales

| Función | Cómo Hacerlo |
|---------|------------|
| **Crear** | Completa el formulario y haz clic en "➕ Crear" |
| **Buscar** | Escribe en la barra 🔍 |
| **Filtrar** | Usa los selectores de Estado y Prioridad |
| **Ver Detalles** | Haz clic en **👁️ Ver** en la tarjeta |
| **Editar** | Haz clic en **✏️ Editar** y guarda cambios |
| **Eliminar** | Haz clic en **🗑️ Eliminar** y confirma |

---

## 📱 ¿Funciona en Móvil?

**¡SÍ!** La app es completamente responsive:
- 📱 Perfecto en celulares
- 📱 Optimizado para tablets
- 💻 Funciona en desktop

Solo abre el archivo en tu navegador del móvil.

---

## 💾 ¿Dónde Se Guardan los Datos?

En el **navegador** (localStorage):
- ✅ No necesita internet
- ✅ Los datos persisten
- ✅ Privado y seguro
- ⚠️ Si limpias el navegador, se pierden (¡guarda copias!)

---

## 🆘 ¿Algo no Funciona?

### Problema: "La página no se abre"
- ✅ Haz doble clic en `index.html`
- ✅ O arrastra el archivo al navegador

### Problema: "Los datos no se guardan"
- ✅ Abre el navegador en modo normal (no incógnito)
- ✅ Permite cookies y almacenamiento local

### Problema: "No veo las imágenes"
- ✅ Sube imágenes menores a 5MB
- ✅ En los formatosPNG, JPG, GIF

### Problema: "Quiero importar/exportar datos"
1. Abre la **Consola** (F12)
2. Para exportar: `exportarDatos()`
3. Para importar: Arrastra el archivo JSON

---

## 🌍 Atajos Útiles

| Atajo | Efecto |
|-------|--------|
| **Ctrl + /** | Enfoca la búsqueda |
| **Escape** | Cierra modales/diálogos |
| **F12** | Abre consola del navegador |
| **F5** | Recarga la página |

---

## 📚 Aprende Más

- **Manual Completo**: Lee [GUIA_USO.md](GUIA_USO.md)
- **Desarrollo**: Lee [DEVELOPMENT.md](DEVELOPMENT.md)
- **README**: Lee [README.md](README.md)

---

## ✨ Características Principales

✅ Crear, editar, eliminar incidencias  
✅ Buscar por texto  
✅ Filtrar por estado y prioridad  
✅ Subir fotos (guardadas como Base64)  
✅ Vista detallada de cada incidencia  
✅ 100% responsive (móvil, tablet, desktop)  
✅ Datos guardados localmente  
✅ Sin necesidad de servidor  
✅ Sin dependencias externas  
✅ Interfaz moderna y amigable

---

## 🎯 Próximos Pasos

1. **Crea algunas incidencias** de prueba
2. **Experimenta con búsqueda y filtros**
3. **Prueba en tu teléfono**
4. **Lee la guía completa** si necesitas funciones avanzadas

---

**¡Disfruta usandoIncidencias TODO!** 🎉

Para soporte o sugerencias, revisa [DEVELOPMENT.md](DEVELOPMENT.md)
