# Guía de actualización — La Piedra Esmeraldas

> Esta guía es para Sebastian. No necesitas saber programar para las tareas del día a día.

---

## 1. Cómo agregar fotos de lotes nuevos

### ¿Dónde van las fotos?
Carpeta: `public/images/lotes/`

### Formato recomendado
- **Tamaño:** 1200 × 1200 píxeles (cuadradas)
- **Peso máximo:** 300 KB por imagen
- **Formato:** JPG o WebP
- **Herramienta gratuita para comprimir:** [squoosh.app](https://squoosh.app)

### Cómo nombrar las fotos
Usa este formato exacto:
```
lote-001-a.jpg   → Primera foto del lote 001
lote-001-b.jpg   → Segunda foto del lote 001
lote-002-a.jpg   → Primera foto del lote 002
```
El número debe coincidir con el `id` del lote en `lotes.json`.

---

## 2. Cómo agregar un lote nuevo al catálogo

Abre el archivo `data/lotes.json` con cualquier editor de texto (Bloc de notas, VS Code, etc.).

El archivo tiene una lista de lotes. Cada lote se ve así:

```json
{
  "id": "lote-001",
  "nombre": "Muzo Verde Intenso",
  "rango": "75000",
  "precioMostrado": "$75.000 COP",
  "descripcion": "Descripción del lote...",
  "imagenes": ["/images/lotes/lote-001-a.jpg"],
  "disponible": true,
  "destacado": false,
  "quilates": "1.2 ct",
  "color": "Verde intenso",
  "origen": "Muzo, Boyacá",
  "categoria": "Bruta"
}
```

### Pasos:
1. Copia todo el bloque de un lote existente (desde `{` hasta `}`)
2. Pégalo al final de la lista (antes del `]` final)
3. Agrega una coma `,` después del lote anterior
4. Cambia todos los datos del nuevo lote:
   - `id`: siguiente número (ej: `"lote-007"`)
   - `nombre`: nombre del lote
   - `rango`: precio en números sin puntos (ej: `"150000"`)
   - `precioMostrado`: precio con formato (ej: `"$150.000 COP"`)
   - `descripcion`: descripción del lote
   - `imagenes`: rutas de las fotos que subiste
   - `disponible`: `true` si está disponible
   - `destacado`: `true` si quieres que aparezca en el home

### Ejemplo de archivo correcto:
```json
[
  {
    "id": "lote-001",
    ...
  },
  {
    "id": "lote-002",
    ...
  }
]
```

---

## 3. Cómo marcar un lote como vendido

En `data/lotes.json`, encuentra el lote y cambia:
```json
"disponible": true
```
a:
```json
"disponible": false
```

El lote aparecerá automáticamente con el badge "Vendido" y el botón de WhatsApp desactivado.

---

## 4. Cómo publicar los cambios

Una vez que guardaste los cambios en los archivos, abre la terminal y ejecuta:

```bash
git add .
git commit -m "Actualizar catálogo"
git push
```

Vercel detecta el push automáticamente y redeploya el sitio en ~1 minuto.
Podrás ver los cambios en tu URL de Vercel.

---

## 5. Cómo cambiar WhatsApp, Pixel o Analytics

Abre `data/config.json`:

```json
{
  "whatsapp": "573216362443",      ← Cambia este número
  "email": "tu@email.com",
  "phase": 1,
  "pixelId": "",                   ← Agrega tu Meta Pixel ID aquí
  "gaId": "",                      ← Agrega tu GA4 ID aquí (G-XXXXXXXX)
  "sheetsUrl": "",                 ← URL del Apps Script (ver sección 7)
  ...
}
```

Guarda y haz push. Los cambios se aplican automáticamente.

---

## 6. Cómo activar la Fase 2 (carrito + checkout)

Cuando la empresa esté constituida legalmente y tengas pasarela de pago (Wompi o MercadoPago), solo cambia en `data/config.json`:

```json
"phase": 1
```
→
```json
"phase": 2
```

Esto activa:
- El carrito de compras
- La página de checkout
- Las páginas de Términos y Política de privacidad

Haz push y Vercel lo publica solo.

---

## 7. Cómo configurar Google Sheets para el formulario

### Paso 1: Crea un Google Sheet
1. Ve a [sheets.google.com](https://sheets.google.com)
2. Crea una hoja nueva llamada "Contactos La Piedra"
3. Nómbrala como quieras

### Paso 2: Abre el Editor de Scripts
1. En el Sheet, ve a **Extensiones → Apps Script**
2. Borra el código que aparece
3. Pega este código:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Contactos') || ss.insertSheet('Contactos');
  var data = JSON.parse(e.postData.contents);
  
  // Agregar encabezados si el sheet está vacío
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'Email', 'Teléfono', 'Mensaje']);
  }
  
  // Agregar la fila con los datos del formulario
  sheet.appendRow([
    data.fecha,
    data.nombre,
    data.email,
    data.telefono || '',
    data.mensaje
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Guarda el script (Ctrl+S)

### Paso 3: Publica como web app
1. Haz clic en **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Quién tiene acceso: **Cualquier persona**
5. Haz clic en **Implementar**
6. Copia la URL que aparece (empieza con `https://script.google.com/...`)

### Paso 4: Agrégala al config
En `data/config.json`, pega la URL en:
```json
"sheetsUrl": "https://script.google.com/macros/s/XXXX/exec"
```

¡Listo! Todos los mensajes del formulario llegarán al Google Sheet.

---

## 8. Cómo conectar un dominio custom a Vercel

Cuando compres un dominio (ej: `lapiedraesmeraldas.com.co`):

1. Ve a tu proyecto en [vercel.com/dashboard](https://vercel.com/dashboard)
2. Haz clic en **Settings → Domains**
3. Agrega tu dominio
4. Vercel te dará unos registros DNS (tipo CNAME o A)
5. Ve al panel de tu registrador (GoDaddy, Namecheap, etc.)
6. Agrega los registros DNS que te dio Vercel
7. Espera 5-30 minutos y el dominio estará activo

**Dónde comprar un dominio:**
- [Namecheap.com](https://www.namecheap.com) — recomendado, precios buenos
- [GoDaddy.com](https://www.godaddy.com)
- [puntoco.com.co](https://www.puntoco.com.co) — para dominios `.co` y `.com.co` colombianos

---

## Resumen rápido de operaciones diarias

| Tarea | Archivo | Tiempo |
|-------|---------|--------|
| Agregar lote | `data/lotes.json` | 2 min |
| Marcar como vendido | `data/lotes.json` | 30 seg |
| Subir fotos | `public/images/lotes/` | 1 min |
| Cambiar WhatsApp | `data/config.json` | 30 seg |
| Publicar cambios | Terminal: `git add . && git commit -m "" && git push` | 1 min |

---

*¿Tienes dudas? Escríbele al equipo de desarrollo.*
