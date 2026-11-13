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
- Flujo: se hace commit aquí y el usuario le pide a Aurbox que se actualice desde la URL del repositorio.
  Un push a GitHub **no** publica nada por sí solo; los cambios no están en la web hasta que Aurbox actualiza.
- Problema conocido (noviembre 2026): Aurbox metió el repositorio dentro de una carpeta `improxpresion`
  (el nombre del repo), así que las páginas quedaron en `www.improxpresion.com/improxpresion/...` y solo la
  portada en la raíz. Se le ha pedido a Aurbox que suba todo a la raíz y que en cada actualización copie la
  raíz del repositorio en la raíz de la web.
- **No des por buena ninguna URL pública sin que el usuario la haya comprobado**: desde la sesión no se puede
  abrir improxpresion.com (el proxy lo bloquea). Dilo explícitamente al dar enlaces.
