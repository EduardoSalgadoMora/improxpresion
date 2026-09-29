// Buscador - Menudos Artistas
(function(){
  const $ = s => document.querySelector(s);
  const resultados = $('#resultados');
  const chipsCats = $('#chipsCategorias');
  let catsActivas = new Set();
  let detalleActual = null;
  let editandoId = null;
  let cjCatsSel = new Set();

  const EDAD_TXT = {ninos:'Niños', adultos:'Adultos', ambos:'Ambos'};

  // ---- base de trabajo: Menudos (+ propios) y, si está marcado, también ImproXpresión ----
  function baseLista(){
    return MA.todos().concat($('#chkImpro').checked ? MA.todosImpro() : []);
  }
  function categoriasDe(lista){
    const s = new Set();
    lista.forEach(j => (j.c||[]).forEach(c => s.add(c)));
    return [...s].sort((a,b)=>a.localeCompare(b,'es'));
  }
  function autoresDe(lista){
    const s = new Set();
    lista.forEach(j => j.a && s.add(j.a));
    return [...s].sort((a,b)=>a.localeCompare(b,'es'));
  }

  // ---- montar filtros ----
  function montarFiltros(){
    const base = baseLista();
    chipsCats.innerHTML = '';
    categoriasDe(base).forEach(c => {
      const ch = document.createElement('span');
      ch.className = 'chip' + (catsActivas.has(c) ? ' activa' : '');
      ch.textContent = c;
      ch.onclick = () => { catsActivas.has(c) ? catsActivas.delete(c) : catsActivas.add(c); montarFiltros(); pintar(); };
      chipsCats.appendChild(ch);
    });
    const sel = $('#selAutor');
    const val = sel.value;
    sel.innerHTML = '<option value="">Todos los autores</option>';
    autoresDe(base).forEach(a => {
      const o = document.createElement('option'); o.value = a; o.textContent = a; sel.appendChild(o);
    });
    sel.value = val;
  }

  // ---- filtrar ----
  function filtrar(){
    const q = MA.norm($('#txtBuscar').value.trim());
    const autor = $('#selAutor').value;
    const soloFavs = $('#chkFavs').checked;
    const soloPropios = $('#chkPropios').checked;
    const conVar = $('#chkVariantes').checked;

    let lista = baseLista().filter(j => {
      if(q){
        const blob = MA.norm(j.t + ' ' + j.d + ' ' + (j.v||'') + ' ' + (j.c||[]).join(' ') + ' ' + (j.src||'') + ' ' + (j.a||''));
        if(!q.split(/\s+/).every(p => blob.includes(p))) return false;
      }
      if(catsActivas.size && !(j.c||[]).some(c => catsActivas.has(c))) return false;
      if(autor && j.a !== autor) return false;
      if(soloFavs && !MA.esFav(j.id)) return false;
      if(soloPropios && !j.custom && !j.editado) return false;
      if(conVar && !j.v) return false;
      return true;
    });

    const orden = $('#selOrden').value;
    if(orden === 'alfa') lista.sort((a,b)=>a.t.localeCompare(b.t,'es'));
    if(orden === 'cat') lista.sort((a,b)=>((a.c||[''])[0]).localeCompare((b.c||[''])[0],'es') || a.t.localeCompare(b.t,'es'));
    if(orden === 'fuente') lista.sort((a,b)=>(a.src||'').localeCompare(b.src||'','es') || a.t.localeCompare(b.t,'es'));
    return lista;
  }

  // ---- pintar ----
  function pintar(){
    const lista = filtrar();
    $('#contador').textContent = lista.length + ' de ' + baseLista().length + ' juegos';
    resultados.innerHTML = '';
    if(!lista.length){
      resultados.innerHTML = '<div class="sin-resultados"><h3>No hay juegos con esos filtros 🤷</h3><p>Prueba a quitar alguna categoría o borrar el texto.</p></div>';
      return;
    }
    lista.forEach(j => {
      const card = document.createElement('article');
      card.className = 'tarjeta' + (j.origenImpro ? ' de-impro' : '');
      const enFicha = MA.enCarrito(j.id);
      card.innerHTML = `
        <div class="cats">
          ${j.origenImpro?'<span class="cat-tag origen-impro">🎭 ImproXpresión</span>':''}
          ${(j.c||[]).map(c=>`<span class="cat-tag">${c}</span>`).join('')}
          <span class="cat-tag edad">${EDAD_TXT[j.e]||'Ambos'}</span>
          ${j.custom?'<span class="cat-tag custom">Mío</span>':''}
          ${j.editado?'<span class="cat-tag custom">Editado</span>':''}
        </div>
        <h3 data-abre="${j.id}">${j.t}</h3>
        <p class="desc">${j.d}</p>
        <div class="pie">
          <span class="fuente">${j.a?j.a+' · ':''}${j.src||''}</span>
          <button class="estrella ${MA.esFav(j.id)?'fav':''}" data-fav="${j.id}" title="Favorito">★</button>
          <button class="btn ${enFicha?'btn-secundario':'btn-verde'} btn-mini" data-add="${j.id}">${enFicha?'✓ En ficha':'+ Ficha'}</button>
        </div>`;
      resultados.appendChild(card);
    });
  }

  resultados.addEventListener('click', e => {
    const fav = e.target.closest('[data-fav]');
    const add = e.target.closest('[data-add]');
    const abre = e.target.closest('[data-abre]');
    if(fav){ MA.toggleFav(fav.dataset.fav); pintar(); }
    else if(add){
      const id = add.dataset.add;
      MA.enCarrito(id) ? MA.quitarCarrito(id) : MA.anadirCarrito(id);
      MA.actualizarBadge(); pintar();
    }
    else if(abre){ abrirDetalle(abre.dataset.abre); }
  });

  // ---- detalle ----
  function abrirDetalle(id){
    const j = MA.porId(id); if(!j) return;
    detalleActual = j;
    $('#detTitulo').textContent = j.t;
    $('#detCats').innerHTML = (j.origenImpro?'<span class="cat-tag origen-impro">🎭 ImproXpresión</span>':'') +
      (j.c||[]).map(c=>`<span class="cat-tag">${c}</span>`).join('') +
      `<span class="cat-tag edad">${EDAD_TXT[j.e]||'Ambos'}</span>` +
      (j.custom?'<span class="cat-tag custom">Mío</span>':'') +
      (j.editado?'<span class="cat-tag custom">Editado</span>':'');
    $('#detDesc').textContent = j.d;
    $('#detVarWrap').style.display = j.v ? '' : 'none';
    $('#detVar').textContent = j.v || '';
    $('#detFuente').textContent = (j.a ? j.a + ' — ' : '') + (j.src || 'Sin fuente');
    $('#detFav').textContent = MA.esFav(id) ? '★ Quitar favorito' : '☆ Favorito';
    $('#detAnadir').textContent = MA.enCarrito(id) ? '✓ Quitar de la ficha' : '➕ Añadir a la ficha';
    $('#detEliminar').style.display = j.custom ? '' : 'none';
    $('#detRestaurar').style.display = j.editado ? '' : 'none';
    // Los juegos de ImproXpresión son de solo lectura desde Menudos Artistas: se editan desde su propia sección.
    $('#detEditar').style.display = j.origenImpro ? 'none' : '';
    $('#modalDetalle').classList.add('abierto');
  }
  $('#detFav').onclick = () => { MA.toggleFav(detalleActual.id); abrirDetalle(detalleActual.id); pintar(); };
  $('#detAnadir').onclick = () => {
    MA.enCarrito(detalleActual.id) ? MA.quitarCarrito(detalleActual.id) : MA.anadirCarrito(detalleActual.id);
    MA.actualizarBadge(); abrirDetalle(detalleActual.id); pintar();
  };
  $('#detEliminar').onclick = () => {
    if(!confirm('¿Eliminar "' + detalleActual.t + '"?')) return;
    MA.guardar(MA.KEY_CUSTOM, MA.leer(MA.KEY_CUSTOM,[]).filter(x=>x.id!==detalleActual.id));
    MA.quitarCarrito(detalleActual.id);
    cerrarModales(); montarFiltros(); pintar(); MA.actualizarBadge();
  };
  $('#detRestaurar').onclick = () => {
    if(!confirm('¿Descartar tus cambios y restaurar la versión original de "' + detalleActual.t + '"?')) return;
    MA.quitarOverride(detalleActual.id);
    montarFiltros(); pintar(); abrirDetalle(detalleActual.id);
  };
  $('#detEditar').onclick = () => { cerrarModales(); abrirCrear(detalleActual); };

  // ---- crear / editar juego ----
  function montarCatsCrear(){
    const cont = $('#cjCats');
    cont.innerHTML = '';
    MA.categorias().forEach(c => {
      const ch = document.createElement('span');
      ch.className = 'chip' + (cjCatsSel.has(c)?' activa':'');
      ch.textContent = c;
      ch.onclick = () => { cjCatsSel.has(c) ? cjCatsSel.delete(c) : cjCatsSel.add(c); montarCatsCrear(); };
      cont.appendChild(ch);
    });
    [...cjCatsSel].filter(c=>!MA.categorias().includes(c)).forEach(c => {
      const ch = document.createElement('span');
      ch.className = 'chip activa';
      ch.textContent = c;
      ch.onclick = () => { cjCatsSel.delete(c); montarCatsCrear(); };
      cont.appendChild(ch);
    });
  }
  function abrirCrear(j){
    editandoId = j ? j.id : null;
    $('#crearTitulo').textContent = j ? 'Editar juego' : 'Crear juego';
    $('#cjTitulo').value = j ? j.t : '';
    $('#cjDesc').value = j ? j.d : '';
    $('#cjVar').value = j ? (j.v||'') : '';
    $('#cjEdad').value = j ? j.e : 'ninos';
    $('#cjAutor').value = j ? (j.a||'Edu') : 'Edu';
    cjCatsSel = new Set(j ? j.c : []);
    montarCatsCrear();
    $('#modalCrear').classList.add('abierto');
  }
  $('#btnCrearJuego').onclick = () => abrirCrear(null);
  $('#cjCatNueva').addEventListener('keydown', e => {
    if(e.key === 'Enter' && e.target.value.trim()){
      cjCatsSel.add(e.target.value.trim());
      e.target.value = '';
      montarCatsCrear();
    }
  });
  $('#cjGuardar').onclick = () => {
    const t = $('#cjTitulo').value.trim();
    const d = $('#cjDesc').value.trim();
    if(!t || !d || !cjCatsSel.size){ alert('Faltan título, descripción o categoría.'); return; }
    const original = editandoId ? MA.porId(editandoId) : null;
    const juego = {
      id: editandoId || MA.slug(t),
      t, d,
      v: $('#cjVar').value.trim() || undefined,
      c: [...cjCatsSel],
      e: $('#cjEdad').value,
      a: $('#cjAutor').value.trim() || 'Edu',
      src: (original && original.src) || 'Juego propio'
    };
    if(editandoId && MA.esBase(editandoId)){
      MA.guardarOverride(juego);
    } else if(editandoId){
      const propios = MA.leer(MA.KEY_CUSTOM, []);
      const i = propios.findIndex(x=>x.id===editandoId);
      if(i>=0) propios[i] = juego; else propios.push(juego);
      MA.guardar(MA.KEY_CUSTOM, propios);
    } else {
      if(MA.porId(juego.id)) juego.id += '-' + Date.now().toString(36);
      const propios = MA.leer(MA.KEY_CUSTOM, []);
      propios.push(juego);
      MA.guardar(MA.KEY_CUSTOM, propios);
    }
    cerrarModales(); montarFiltros(); pintar();
  };

  // ---- copias de seguridad ----
  $('#btnBackup').onclick = () => {
    const blob = new Blob([MA.exportarDatos()], {type:'application/json;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'menudos-artistas-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
  };
  $('#btnRestaurarBackup').onclick = () => $('#fileBackup').click();
  $('#fileBackup').addEventListener('change', e => {
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader();
    r.onload = () => {
      try{
        MA.importarDatos(r.result);
        alert('Copia restaurada ✔');
        montarFiltros(); pintar(); MA.actualizarBadge();
      }catch(err){ alert('Ese archivo no parece una copia de seguridad válida.'); }
      e.target.value = '';
    };
    r.readAsText(f);
  });

  // ---- modales ----
  function cerrarModales(){ document.querySelectorAll('.modal-fondo').forEach(m=>m.classList.remove('abierto')); }
  document.querySelectorAll('[data-cierra]').forEach(b => b.onclick = cerrarModales);
  document.querySelectorAll('.modal-fondo').forEach(m => m.addEventListener('click', e => { if(e.target===m) cerrarModales(); }));
  document.addEventListener('keydown', e => { if(e.key==='Escape') cerrarModales(); });

  // ---- eventos filtros ----
  ['#txtBuscar','#selAutor','#selOrden','#chkFavs','#chkPropios','#chkVariantes'].forEach(s => {
    $(s).addEventListener('input', pintar);
  });
  $('#chkImpro').addEventListener('input', () => { catsActivas.clear(); montarFiltros(); pintar(); });
  $('#btnReset').onclick = () => {
    $('#txtBuscar').value=''; $('#selAutor').value=''; $('#selOrden').value='alfa';
    $('#chkFavs').checked=false; $('#chkPropios').checked=false; $('#chkVariantes').checked=false;
    $('#chkImpro').checked=false;
    catsActivas.clear(); montarFiltros(); pintar();
  };

  montarFiltros();
  pintar();
})();
