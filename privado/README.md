# 🎭 Libera tu arte — Web de juegos de teatro e impro

Web local (sin servidor, sin internet) con dos apartados **independientes** que viven en el mismo sitio para tenerlo todo a mano desde una tablet en clase, pero sin mezclar los juegos entre sí:

- **ImproXpresión** (`index.html`) — jamming, intensivos (Toto Curcio, Edu Ferrés), taller de teatro para adultos y la biblioteca general de improwiki.com.
- **Menudos Artistas** (`menudos.html`) — guiones de las clases infantiles de teatro en Ugena (y grupos de Cubas/Serranillos), cursos 2024-2025 y 2025-2026, más las dinámicas de las Jornadas de teatro de La Consti.

Cada apartado tiene su propio buscador, su propio creador de fichas y su propio almacenamiento en el navegador (favoritos, juegos propios, fichas guardadas), así que lo que edites o añadas en uno no afecta al otro. Un puñado de juegos que Edu ha usado tanto en clase de peques como en jamming de adultos aparecen en los dos catálogos a la vez (están una sola vez en el disco, pero se listan en ambos buscadores).

## Cómo abrirla
Doble clic en **index.html** (ImproXpresión) o **menudos.html** (Menudos Artistas). Cada cabecera tiene un enlace al otro apartado. Funciona en cualquier navegador, directamente desde el disco.

## Estructura
```
web_juegos_impro/   (en el repo de la web: carpeta privado/)
├── index.html          → Buscador de ImproXpresión
├── conceptos.html      → Glosario de conceptos teóricos (ImproXpresión)
├── ficha.html          → Creador de fichas de clase (ImproXpresión)
├── actuaciones.html    → Calendario de actuaciones (ImproXpresión)
├── mapa.html           → Mapa de La Sagra (municipios, contactos y notas)
├── menudos.html        → Buscador de Menudos Artistas
├── ficha-menudos.html  → Creador de fichas de clase (Menudos Artistas)
├── css/estilos.css     → compartido por los dos apartados
├── fonts/Alphakind.ttf → fuente del logo
├── img/logo-improxpresion.png → logo ImproXpresión (si no existe se usa img/logo.svg)
├── img/logo-menudos.png → logo Menudos Artistas (opcional; si no existe se oculta sin romper la página)
├── js/
│   ├── auth.js            → candado de acceso (usuario + contraseña) de toda el área privada
│   ├── comun.js           → utilidades y almacenamiento (localStorage) — ImproXpresión (namespace LTA, claves lta_*)
│   ├── app.js             → lógica del buscador — ImproXpresión
│   ├── conceptos.js       → lógica del glosario
│   ├── ficha.js           → lógica del creador de fichas — ImproXpresión
│   ├── actuaciones.js     → lógica del calendario
│   ├── mapa.js            → lógica del mapa de La Sagra
│   ├── comun-menudos.js   → utilidades y almacenamiento — Menudos Artistas (namespace MA, claves ma_*)
│   ├── app-menudos.js     → lógica del buscador — Menudos Artistas
│   └── ficha-menudos.js   → lógica del creador de fichas — Menudos Artistas
└── data/
    ├── juegos.js          → base de datos de ImproXpresión (582 juegos)
    ├── juegos_menudos.js  → base de datos de Menudos Artistas (176 juegos)
    ├── fichas.js          → fichas de clase predefinidas (FICHAS_BASE y FICHAS_BASE_MENUDOS)
    ├── sagra.js           → datos del mapa de La Sagra
    └── conceptos.js       → glosario (96 conceptos, solo ImproXpresión)
```

## Menudos Artistas (menudos.html)
- Mismo buscador, mismo creador de fichas que ImproXpresión, pero apuntando a `data/juegos_menudos.js` y con su propio almacenamiento (`ma_*` en vez de `lta_*`), así que favoritos, juegos propios y fichas guardadas no se mezclan entre apartados.
- Base construida a partir de los guiones de clase de `ClasesMenudosArtistas2025` (todo lo de la carpeta `2024-2025`, y del nivel superior solo los archivos con la palabra "guion" en el nombre) y de las dinámicas de las Jornadas de teatro de La Consti.
- El 15/09/2026 se separó de la base de ImproXpresión (antes todo vivía junto en `juegos.js`) y se completó con ~9 juegos de guiones que nunca se habían extraído (acción exagerada, caminar como personajes, 1-2-3, cadena de gestos por grupos, volcán de palabras, diploma de palabras bonitas, historia a una frase, acciones encadenadas con flashback físico...).
- **No incluye** los guiones que en realidad son textos teatrales completos y no juegos: `Guión_1`, `Isla_desierta`, `Texto_Teatro_Ugena`, `cuentosv2` y `Los cuentos` (borrador de "El Gran Viaje de los Cuentos/Personajes Perdidos"). Si algún día quieres un apartado de "textos y guiones de obra" aparte de los juegos, dilo y se monta exactamente igual que este.

## Calendario de actuaciones (actuaciones.html)
- Alta manual de actuaciones: título, fecha, horas, lugar y notas. Se separan automáticamente en **próximas** y **pasadas**.
- Cada actuación tiene botón **📆 Google Calendar** (abre Google con el evento precargado: solo hay que darle a Guardar) y **⬇ .ics** (para Outlook, iPhone o cualquier calendario).
- Se pueden editar y borrar; entran en la copia de seguridad.

## Glosario de conceptos (conceptos.html)
96 conceptos teóricos organizados en 9 bloques: Pilares de la impro, Escena y estructura, Personaje, Emoción y verdad (Stanislavski, Grotowski, Boleslavski), Cuerpo y voz (Lecoq), Comedia, Errores y anti-patrones, Formatos y match, y Pedagogía y dirección.
- Fuentes: apuntes propios (Edu, Toto Curcio, Sara Párbole, Raúl Marcos, Isaac), The Improv Handbook (Salinsky & Frances-White, incl. su glosario), Keith Johnstone, Stanislavski (*El trabajo del actor sobre sí mismo*), Thomas Richards/Grotowski (*Las acciones físicas*), Boleslavski, Lecoq, Holovatuck & Astrosky y Javier Vecino (*El Match de Improvisación*).
- Buscador por texto, chips de bloque y filtro por fuente. Clic en un concepto lo expande (definición completa + 💡 cómo aplicarlo + fuente).
- Cada concepto se puede **añadir a la ficha** como bloque teórico (sale con 📖 y minutos propios): ideal para el apartado "Conceptos" de tus clases.

## Buscador (index.html)
- **Texto libre**: busca en título, descripción, variantes, categorías, autor y fuente (varias palabras = todas deben aparecer).
- **Filtros combinables**: categorías (chips, multiselección), autor, edad (niños/adultos/ambos), solo favoritos ⭐, solo mis juegos, con variantes.
- **Orden**: alfabético, por categoría o por fuente.
- Clic en el título de una tarjeta → ficha detallada del juego.
- **➕ Crear juego**: añade juegos propios (se guardan en el navegador, editables y borrables; salen con etiqueta verde "Mío").

## Creador de fichas (ficha.html)
- Añade juegos desde el buscador con el botón **+ Ficha**.
- Ordena los bloques (flechas o arrastrando), asigna **minutos** a cada uno y escribe **notas de sesión**.
- El total de tiempo se calcula solo.
- **Guardar**: archiva la ficha (recuperable desde "Fichas guardadas").
- **Descargar .md**: exporta la ficha en Markdown.
- **Imprimir / PDF**: resumen a una cara (título + ~3 líneas por juego) listo para llevar a clase.
- **🎭 Fichas de clase**: fichas predefinidas en `data/fichas.js` (Jamming 28/09/2026, Intensivo Escenia Griñón Día 2 PROL; y en Menudos, la clase de reencuentro de Ugena y "Personajes con secreto"). Botón **Cargar** para abrirlas.
- Para reordenar se arrastra desde el **número** del bloque; así el resto del texto se puede seleccionar y copiar.

## Dónde se guardan tus datos
- La base de 582 juegos de ImproXpresión, los 176 de Menudos Artistas y los 96 conceptos viven en `data/juegos.js`, `data/juegos_menudos.js` y `data/conceptos.js` (archivos del disco).
- **Todo lo demás vive en el `localStorage` del navegador**, por separado en cada apartado: juegos que creas, ediciones de juegos existentes, favoritos, la ficha en curso y las fichas guardadas. Si cambias de navegador o borras los datos de navegación, se pierde.
- Por eso existe el botón **⬇ Copia de seguridad** (en cada buscador): descarga un JSON con todos tus datos de ese apartado. Con **⬆ Restaurar copia** los recuperas en cualquier navegador u ordenador.
- Si quieres consolidar tus juegos/ediciones en la base permanente, pásale la copia de seguridad a Claude y que los integre en `data/juegos.js` o `data/juegos_menudos.js` según toque.

## Editar juegos
- **Cualquier juego se puede editar**, también los de la base: tu versión editada se guarda aparte y el juego aparece con la etiqueta "Editado". Desde su ficha puedes **↺ Restaurar original** en cualquier momento.
- Los juegos creados por ti llevan la etiqueta "Mío" y sí se pueden eliminar del todo.
- El filtro "🟢 Nuevos o editados por mí" muestra ambos.

## Notas
- Los libros de la carpeta `intensivos` (Stanislavski, Boleslavski, Grotowski, The Improv Handbook, manuales de Holovatuck/Astrosky, Frias Rafa, Zack Vázquez, match de Javier Vecino) no están indexados juego a juego: son bibliografía de consulta.
- Para añadir juegos de forma masiva, edita `data/juegos.js` siguiendo el formato de cualquier entrada.
