// Glosario de conceptos - Libera tu arte
(function(){
  const $ = s => document.querySelector(s);
  const listado = $('#listado');
  let catsActivas = new Set();

  const ORDEN_CATS = [
    'Pilares de la impro',
    'Escena y estructura',
    'Personaje',
    'Emoción y verdad',
    'Cuerpo y voz',
    'Comedia',
    'Errores y anti-patrones',
    'Formatos y match',
    'Pedagogía y dirección'
  ];

  function categorias(){
    const s = new Set();
    CONCEPTOS.forEach(c => (c.c||[]).forEach(x => s.add(x)));
    return ORDEN_CATS.filter(c => s.has(c)).concat([...s].filter(c => !ORDEN_CATS.includes(c)));
  }
  function fuentes(){
    const s = new Set();
    CONCEPTOS.forEach(c => (c.fuente||'').split('/').forEach(f => { f = f.trim(); if(f) s.add(f); }));
    return [...s].sort((a,b)=>a.localeCompare(b,'es'));
  }

  function montarFiltros(){
    const cont = $('#chipsCategorias');
    cont.innerHTML = '';
    categorias().forEach(c => {
      const ch = document.createElement('span');
      ch.className = 'chip' + (catsActivas.has(c) ? ' activa' : '');
      ch.textContent = c;
      ch.onclick = () => { catsActivas.has(c) ? catsActivas.delete(c) : catsActivas.add(c); montarFiltros(); pintar(); };
      cont.appendChild(ch);
    });
    const sel = $('#selFuente');
    const val = sel.value;
    sel.innerHTML = '<option value="">Todas las fuentes</option>';
    fuentes().forEach(f => { const o = document.createElement('option'); o.value = f; o.textContent = f; sel.appendChild(o); });
    sel.value = val;
  }

  function filtrar(){
    const q = LTA.norm($('#txtBuscar').value.trim());
    const fuente = $('#selFuente').value;
    return CONCEPTOS.filter(c => {
      if(q){
        const blob = LTA.norm(c.t + ' ' + c.d + ' ' + (c.v||'') + ' ' + (c.fuente||'') + ' ' + (c.c||[]).join(' '));
        if(!q.split(/\s+/).every(p => blob.includes(p))) return false;
      }
      if(catsActivas.size && !(c.c||[]).some(x => catsActivas.has(x))) return false;
      if(fuente && !LTA.norm(c.fuente||'').includes(LTA.norm(fuente))) return false;
      return true;
    });
  }

  function pintar(){
    const lista = filtrar();
    const abrirTodo = $('#chkAbrirTodo').checked;
    $('#contador').textContent = lista.length + ' de ' + CONCEPTOS.length + ' conceptos';
    listado.innerHTML = '';
    if(!lista.length){
      listado.innerHTML = '<div class="sin-resultados" style="max-width:1000px;margin:0 auto"><h3>Ningún concepto con esos filtros 🤷</h3></div>';
      return;
    }
    // agrupar por categoría principal (la primera)
    const grupos = new Map();
    lista.forEach(c => {
      const cat = (c.c||['Otros'])[0];
      if(!grupos.has(cat)) grupos.set(cat, []);
      grupos.get(cat).push(c);
    });
    const ordenadas = categorias().filter(c => grupos.has(c));
    ordenadas.forEach(cat => {
      const h = document.createElement('div');
      h.className = 'titulo-cat';
      h.textContent = cat;
      listado.appendChild(h);
      const grid = document.createElement('div');
      grid.className = 'grid-conceptos';
      grupos.get(cat).sort((a,b)=>a.t.localeCompare(b.t,'es')).forEach(c => {
        const div = document.createElement('article');
        div.className = 'concepto' + (abrirTodo ? ' abierto' : '');
        const enFicha = LTA.enCarrito(c.id);
        div.innerHTML = `
          <h3>${c.t} ${(c.c||[]).slice(1).map(x=>`<span class="cat-tag">${x}</span>`).join('')}</h3>
          <p class="def ${abrirTodo?'':'recortada'}">${c.d}</p>
          ${c.v ? `<p class="aplicar">💡 ${c.v}</p>` : ''}
          <p class="fuente-c">Fuente: ${c.fuente||''}</p>
          <div class="acciones-c">
            <button class="btn ${enFicha?'btn-secundario':'btn-verde'} btn-mini" data-add="${c.id}">${enFicha?'✓ En la ficha':'+ Añadir a ficha (como bloque teórico)'}</button>
            <a class="btn btn-secundario btn-mini" href="index.html" onclick="event.stopPropagation()">Ver juegos relacionados →</a>
          </div>`;
        div.addEventListener('click', e => {
          if(e.target.closest('[data-add]')){
            const id = e.target.closest('[data-add]').dataset.add;
            LTA.enCarrito(id) ? LTA.quitarCarrito(id) : LTA.anadirCarrito(id);
            LTA.actualizarBadge(); pintar();
            return;
          }
          if(e.target.closest('a')) return;
          div.classList.toggle('abierto');
          div.querySelector('.def').classList.toggle('recortada', !div.classList.contains('abierto') && !abrirTodo);
        });
        grid.appendChild(div);
      });
      listado.appendChild(grid);
    });
  }

  ['#txtBuscar','#selFuente','#chkAbrirTodo'].forEach(s => $(s).addEventListener('input', pintar));
  $('#btnReset').onclick = () => {
    $('#txtBuscar').value=''; $('#selFuente').value=''; $('#chkAbrirTodo').checked=false;
    catsActivas.clear(); montarFiltros(); pintar();
  };

  montarFiltros();
  pintar();
})();
