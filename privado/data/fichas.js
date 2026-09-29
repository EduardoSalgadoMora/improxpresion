// Fichas de clase predefinidas - Libera tu arte
// Campos: titulo, fecha (AAAA-MM-DD), grupo, items[{id, min, nota}]
const FICHAS_BASE = [
{titulo:"Ficha Jamming 28/09/2026",fecha:"2026-09-28",grupo:"Jamming",items:[
  {id:"relajacion-silla-canciones",min:10,nota:"Cuatro canciones: 1ª ojos cerrados sin interacción · 2ª ojos abiertos alrededor de la silla · 3ª salimos al espacio con contacto visual · 4ª interacción total."},
  {id:"si-vamos",min:10,nota:"Por parejas por toda la sala, alternando las propuestas. Ej.: 'Vamos a jugar al parchís' / '¡Sí, vamos!' → 'Vamos a tirar piedras por la ventana abierta' / '¡Sí, vamos!'."},
  {id:"y-ahora-que-parejas",min:10,nota:"Ej.: cazar caracoles → la lupa espacial de la NASA → cubrirnos de barro para ocultarnos en las sombras. Al 'No, eso no' se cambian los papeles."},
  {id:"clonar-anecdota",min:10,nota:"Anécdota de un minuto; después la otra persona la clona."},
  {id:"anecdota-gibberish",min:10,nota:"Ej.: me fui de ruta a un río, me resbalé y me puse perdido. Gibberish → compi la cuenta hablando → el primero la cuenta hablando y comparamos."}
]},
{titulo:"Intensivo Escenia Griñón · Día 2: El PROL",fecha:"",grupo:"Intensivo Escenia Griñón (adultos, 6 participantes, 2 formadores)",items:[
  {id:"c-prol",min:10,nota:"Presentación: bienvenida y recogida del día 1 (¿qué se os quedó del 'sí, y además'? una frase por persona). Explicar el PROL como antídoto al 'no sé qué decir'. Metáfora: la escena es una esfera aceitosa; cada letra del PROL es un asa."},
  {id:"rueda-palmada",min:5,nota:"Vinculación: dinámica rápida de nombres y energía. Día 2: corto, solo para encender el circuito grupal."},
  {id:"samurai",min:5,nota:"Calentamiento mental. Con 6 va muy rápido: meter cambios de ritmo y celebrar los fallos."},
  {id:"volcan-de-palabras",min:5,nota:"Asociación libre en círculo sin filtrar; si alguien se lo piensa más de un segundo, todos celebran y se sigue."},
  {id:"que-haces",min:10,nota:"Calentamiento físico. Lento y claro: hasta que no se entienda la acción no se pregunta."},
  {id:"4-elementos-lecoq",min:25,nota:"P de PERSONAJE. 1) Exploración por el espacio (10'): cuerpo, luego voz, luego una frase. 2) Personaje híbrido (15'): en 3 parejas, de espaldas, combinan dos elementos (Fuego+Tierra, Agua+Aire, Fuego+Aire, Agua+Tierra); se giran y se encuentran como ese personaje. Devolución: ¿qué elemento dominaba? ¿Se sostuvo el cuerpo con el texto?"},
  {id:"juego-sillas-objetivo",min:8,nota:"O de OBJETIVO. Persuasión, estatus, seducción o engaño; ~90\" por intento y rotación. Todos pasan por ambos roles."},
  {id:"parque-invasivo",min:12,nota:"Tres escenas de ~3' + un minuto de devolución. Cazar la 'charla de ascensor'. Público: ¿en qué momento supimos qué quería B?"},
  {id:"miradas-estatus",min:7,nota:"R de RELACIÓN / ESTATUS. Dos equipos de 3. Segunda ronda: B esquiva el contacto. Comentar qué sintieron: eso ES el estatus."},
  {id:"cartas-estatus",min:13,nota:"Lugar común (boda, sala de espera, cola del paro). Al final se ordenan en fila y se revelan las cartas. Si hay tiempo, segunda ronda. Después: DESCANSO EXPRÉS (5')."},
  {id:"pintar-lugar",min:15,nota:"L de LUGAR. Los 6, sin palabras; segunda ronda con otro lugar cambiando el orden. Premiar al que USA lo del compañero antes de añadir lo propio."},
  {id:"ruleta-prol",min:20,nota:"Impro final: Fase 1 PROL servido (10', dos escenas) + Fase 2 PROL emergente (10'). Rotar para que todos jueguen."},
  {id:"c-subobjetivos",min:0,nota:"Para sembrar durante las devoluciones, no como charla aparte: la mitad de la actuación es la reacción; el público no debe saber qué hará el personaje."},
  {id:"circulo-cierre-reflexion",min:10,nota:"¿Cuál es tu 'letra coja'? Es el deber para el día 3. Recoger feedback para los días 3 y 4."}
]}
];

// Fichas de clase predefinidas - Menudos Artistas (se cargan desde ficha-menudos.html)
const FICHAS_BASE_MENUDOS = [
{titulo:"Clase de reencuentro — Grupo Ugena (curso 2026-2027)",fecha:"",grupo:"Ugena, grupo del curso pasado (7-10 peques)",items:[
  {id:"presentacion-animal-humor",min:5,nota:""},
  {id:"balas-energia",min:5,nota:""},
  {id:"ruiditos",min:5,nota:"Sustituye a \"Oh Palele\": mismo hueco de calentamiento vocal con movimiento por el espacio."},
  {id:"tra-tre-tri",min:5,nota:""},
  {id:"animales-cuerpo",min:10,nota:""},
  {id:"caminar-como-personajes",min:10,nota:""},
  {id:"foto-fija",min:10,nota:""},
  {id:"pintar-lugar",min:15,nota:"Variante Playground: un parque donde todos juegan interactuando con lo creado."},
  {id:"accion-exagerada-simple",min:10,nota:""},
  {id:"ranita",min:5,nota:""},
  {id:"cierre-lo-mejor-de-hoy",min:10,nota:"Reencuentro tras el verano: dar un poco más de tiempo para que cuenten qué tal las vacaciones."}
]},
{titulo:"Personajes con secreto (previa del Cluedo)",fecha:"2026-09-29",grupo:"Menudos Artistas (6 peques)",items:[
  {id:"guino-ladron",min:10,nota:"3-4 rondas."},
  {id:"caminar-misterioso",min:10,nota:""},
  {id:"tres-ingredientes-personaje",min:15,nota:"Es el mismo esquema que usarán en el Cluedo."},
  {id:"objeto-escondido",min:10,nota:""},
  {id:"sospechoso-silla",min:20,nota:"Ejercicio central, ensayo del interrogatorio. Fíjate en quién disfruta mintiendo: será el culpable del Cluedo."},
  {id:"memoria-3-cambios",min:10,nota:"Versión 'fotografía del otro': por parejas se observan 30'', se dan la espalda, cada uno cambia 3 cosas de su aspecto y el otro las descubre. Ojo de detective."},
  {id:"cierre-sobre-misterio",min:5,nota:""}
]}
];
