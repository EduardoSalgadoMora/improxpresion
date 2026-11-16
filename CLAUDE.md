# Instrucciones para Claude

## Git: NO crear ramas nuevas
- Trabaja y sube SIEMPRE a la rama principal del repositorio: `claude/improxpresion-homepage-design-nsg758`
  (es la rama predeterminada en GitHub; si algún día se renombra a `main`, usa `main`).
- No crees ramas nuevas para ningún cambio, aunque el entorno te asigne una rama de trabajo distinta.
  El historial de commits de la rama principal ya sirve para ver y deshacer cambios.
- Antes de empezar: `git fetch origin claude/improxpresion-homepage-design-nsg758` y trabaja encima.
- Al terminar: commit y `git push origin HEAD:claude/improxpresion-homepage-design-nsg758`.

## Publicación: la web la publica Aurbox, NO GitHub Pages
- La web pública (`https://www.improxpresion.com`) está alojada en **Aurbox**. No uses GitHub Pages
  ni propongas conectar el dominio a GitHub Pages: el usuario no lo quiere.
- **Flujo de publicación (desde el 16-11-2026): el usuario sube los archivos a mano.** NO uses al asistente
  de Aurbox: es lento, publica a medias y sus informes no son fiables.
  - Los archivos de la web están en el gestor de archivos de Aurbox: `Drive › Public › websites › improxpresion-1`.
    Esa carpeta es la raíz de la web (`www.improxpresion.com/`) y corresponde a la raíz del repositorio.
  - Tras cada cambio: commit aquí y entrega al usuario un ZIP (con SendUserFile) SOLO con los archivos de la
    web que han cambiado, respetando sus carpetas, más una lista de: archivos a borrar y el peso que debe
    tener cada archivo subido (en KB, como los muestra Aurbox: KiB con 2 decimales).
  - Explícale siempre: borrar primero el archivo antiguo y después subir el nuevo (si no, Aurbox crea copias
    con " (1)" en lugar de sustituir), comprobar el peso y luego Publicar.
  - Un push a GitHub **no** publica nada por sí solo.
- La web solo usa: los archivos sueltos de la raíz (.html, styles.css, favicon.ico, robots.txt, sitemap.xml)
  y las carpetas `assets/`, `privado/` e `improxpresion/`. El resto de carpetas del repositorio (dossieres,
  Fotos de actuaciones, carteles_de_Shows, sliders, logos…) es material de trabajo y no se sube.
- Historia: en noviembre de 2026 Aurbox había metido el repositorio dentro de una carpeta `improxpresion`,
  y las páginas quedaron en `/improxpresion/...`. Se arregló el 16-11-2026: todo está en la raíz y las
  direcciones antiguas reenvían. Hay correos enviados con enlaces `/improxpresion/...`: no quites los reenvíos.
- **No des por buena ninguna URL pública sin que el usuario la haya comprobado**: desde la sesión no se puede
  abrir improxpresion.com (el proxy lo bloquea). Dilo explícitamente al dar enlaces.
- La carpeta `improxpresion/` del repositorio contiene SOLO páginas de reenvío: cada dirección antigua
  `/improxpresion/<página>.html` lleva a `/<página>.html` (y `la-biblioteca.html` a `retales-purpura.html`).
  No pongas contenido real ahí. Si se crea o se renombra una página, añade también su reenvío.
