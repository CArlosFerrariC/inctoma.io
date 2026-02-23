const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Cargar datos de incidencias
let incidencias = [];
try {
    const data = fs.readFileSync(path.join(__dirname, 'incidencias_combined.json'), 'utf8');
    incidencias = JSON.parse(data);
} catch (err) {
    console.error('Error al cargar incidencias:', err);
}

// Ruta de búsqueda dinámica (Backend)
app.get('/api/incidencias/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    
    if (!query) {
        return res.json([]);
    }

    // Simulando una consulta LIKE en base de datos
    const results = incidencias.filter(inc => 
        (inc.codigo && inc.codigo.toLowerCase().includes(query)) ||
        (inc.titulo && inc.titulo.toLowerCase().includes(query)) ||
        (inc.descripcion && inc.descripcion.toLowerCase().includes(query))
    );

    // Limitamos a 10 resultados para el autocomplete
    res.json(results.slice(0, 10));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
