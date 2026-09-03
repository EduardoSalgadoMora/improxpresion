// ============================================================
//  Mapa corocromático de La Sagra — lógica de la página
//  Dibuja las celdas, colorea por población y gestiona la ficha
//  editable de cada municipio (guardada en localStorage).
// ============================================================
(function () {
  'use strict';
  if (typeof SAGRA === 'undefined') { console.error('Falta data/sagra.js'); return; }

  const SVGNS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('mapaSvg');
  const municipios = SAGRA.municipios;
  const porId = {};
  municipios.forEach(m => porId[m.id] = m);

  // ---- Color por magnitud (población) ----
  function claseColor(pob){
    let i = 0;
    for (const u of SAGRA.umbrales) { if (pob >= u) i++; else break; }
    return i; // 0..rampa.length-1
  }
  const colorDe = m => SAGRA.rampa[claseColor(m.pob)];

  // ---- Construcción del SVG ----
  let seleccionado = null;
  const nodos = {}; // id -> <path>

  function construirMapa(){
    svg.setAttribute('viewBox', SAGRA.viewBox);

    // Borde de la comarca (sombra suave por debajo)
    const borde = document.createElementNS(SVGNS, 'path');
    borde.setAttribute('d', SAGRA.bordePath);
    borde.setAttribute('class', 'borde-comarca');
    svg.appendChild(borde);

    const gCeldas = document.createElementNS(SVGNS, 'g');
    const gTextos = document.createElementNS(SVGNS, 'g');
    gTextos.setAttribute('class', 'etiquetas');

    municipios.forEach(m => {
      const p = document.createElementNS(SVGNS, 'path');
      p.setAttribute('d', m.path);
      p.setAttribute('fill', colorDe(m));
      p.setAttribute('class', 'muni');
      p.setAttribute('tabindex', '0');
      p.setAttribute('role', 'button');
      p.setAttribute('aria-label', `${m.nombre}. ${m.pob.toLocaleString('es-ES')} habitantes (aprox.)`);
      p.addEventListener('click', () => seleccionar(m.id));
      p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); seleccionar(m.id); } });
      gCeldas.appendChild(p);
      nodos[m.id] = p;

      const t = document.createElementNS(SVGNS, 'text');
      t.setAttribute('x', m.lx);
      t.setAttribute('y', m.ly);
      t.setAttribute('class', 'etiqueta');
      t.textContent = m.nombre;
      t.addEventListener('click', () => seleccionar(m.id));
      gTextos.appendChild(t);
    });

    svg.appendChild(gCeldas);
    svg.appendChild(gTextos);
  }

  // ---- Leyenda ----
  function construirLeyenda(){
    const barra = document.getElementById('leyendaBarra');
    SAGRA.rampa.forEach(c => {
      const s = document.createElement('span');
      s.style.background = c;
      barra.appendChild(s);
    });
  }

  // ---- Panel / ficha ----
  const $ = id => document.getElementById(id);
  const panelVacio = $('panelVacio'), panelFicha = $('panelFicha'), panel = $('panel');

  function datosActuales(m){
    // datos de partida + lo que el usuario haya guardado encima
    const ov = LTA.sagraDe(m.id);
    return {
      espacios: ov.espacios ?? m.espacios ?? [],
      festivales: ov.festivales ?? m.festivales ?? [],
      web: ov.web ?? '',
      tel: ov.tel ?? '',
      cargo: ov.cargo ?? '',
      cargoTel: ov.cargoTel ?? '',
      email: ov.email ?? '',
      notas: ov.notas ?? '',
    };
  }

  function seleccionar(id){
    const m = porId[id];
    if (!m) return;
    if (seleccionado && nodos[seleccionado]) nodos[seleccionado].classList.remove('sel');
    seleccionado = id;
    nodos[id].classList.add('sel');
    // llevar la celda seleccionada al frente
    nodos[id].parentNode.appendChild(nodos[id]);

    const d = datosActuales(m);
    $('pNombre').textContent = m.nombre;
    $('pProv').textContent = 'Provincia de ' + m.prov;
    $('pPob').textContent = '👥 ' + m.pob.toLocaleString('es-ES') + ' hab. (aprox.)';
    $('pSwatch').style.background = colorDe(m);

    $('pEspacios').value = (d.espacios || []).join('\n');
    $('pFestivales').value = (d.festivales || []).join('\n');
    $('pWeb').value = d.web;
    $('pTel').value = d.tel;
    $('pCargo').value = d.cargo;
    $('pCargoTel').value = d.cargoTel;
    $('pEmail').value = d.email;
    $('pNotas').value = d.notas;

    const q = encodeURIComponent(`Ayuntamiento de ${m.nombre} ${m.prov} cultura`);
    $('pBuscarWeb').href = 'https://www.google.com/search?q=' + q;
    $('pMapaWeb').href = 'https://www.google.com/maps/search/' + encodeURIComponent(`${m.nombre}, ${m.prov}, España`);

    $('pGuardado').textContent = Object.keys(LTA.sagraDe(id)).length ? '✏️ editado por ti' : '';
    $('pRestaurar').style.display = Object.keys(LTA.sagraDe(id)).length ? '' : 'none';

    panelVacio.hidden = true;
    panelFicha.hidden = false;
    panel.classList.add('abierto');
    if (window.matchMedia('(max-width:820px)').matches) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function cerrarPanel(){
    panel.classList.remove('abierto');
    panelFicha.hidden = true;
    panelVacio.hidden = false;
    if (seleccionado && nodos[seleccionado]) nodos[seleccionado].classList.remove('sel');
    seleccionado = null;
  }

  const lineas = txt => txt.split('\n').map(s => s.trim()).filter(Boolean);

  function guardar(){
    if (!seleccionado) return;
    const obj = {
      espacios: lineas($('pEspacios').value),
      festivales: lineas($('pFestivales').value),
      web: $('pWeb').value.trim(),
      tel: $('pTel').value.trim(),
      cargo: $('pCargo').value.trim(),
      cargoTel: $('pCargoTel').value.trim(),
      email: $('pEmail').value.trim(),
      notas: $('pNotas').value.trim(),
    };
    LTA.guardarSagra(seleccionado, obj);
    $('pGuardado').textContent = '✅ guardado';
    $('pRestaurar').style.display = '';
    setTimeout(() => { if ($('pGuardado').textContent === '✅ guardado') $('pGuardado').textContent = '✏️ editado por ti'; }, 1800);
  }

  function restaurar(){
    if (!seleccionado) return;
    if (!confirm('¿Restaurar los datos de partida de este municipio y borrar tus cambios?')) return;
    LTA.borrarSagra(seleccionado);
    seleccionar(seleccionado);
  }

  // ---- Buscador ----
  function initBuscador(){
    const input = $('buscarMuni'), sug = $('sugerencias');
    const cerrar = () => { sug.innerHTML = ''; sug.classList.remove('abierto'); };
    input.addEventListener('input', () => {
      const q = LTA.norm(input.value);
      sug.innerHTML = '';
      if (!q) { cerrar(); return; }
      const res = municipios
        .filter(m => LTA.norm(m.nombre).includes(q))
        .sort((a,b) => a.nombre.localeCompare(b.nombre, 'es'))
        .slice(0, 8);
      if (!res.length) { cerrar(); return; }
      res.forEach(m => {
        const b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = `<span>${m.nombre}</span><small>${m.prov} · ${m.pob.toLocaleString('es-ES')} hab.</small>`;
        b.addEventListener('click', () => { seleccionar(m.id); input.value = m.nombre; cerrar(); });
        sug.appendChild(b);
      });
      sug.classList.add('abierto');
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const first = sug.querySelector('button');
        if (first) first.click();
      } else if (e.key === 'Escape') { cerrar(); }
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.mapa-buscar')) cerrar();
    });
  }

  // ---- Arranque ----
  construirMapa();
  construirLeyenda();
  initBuscador();
  $('pGuardar').addEventListener('click', guardar);
  $('pRestaurar').addEventListener('click', restaurar);
  $('panelCerrar').addEventListener('click', cerrarPanel);
})();
