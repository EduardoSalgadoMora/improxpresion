// Constructor de fichas - Libera tu arte
(function(){
  const $ = s => document.querySelector(s);
  const lista = $('#listaFicha');
  let ficha = LTA.carrito();

  // meta
  $('#fTitulo').value = ficha.titulo || '';
  $('#fFecha').value = ficha.fecha || '';
  $('#fGrupo').value = ficha.grupo || '';
  ['fTitulo','fFecha','fGrupo'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      ficha.titulo = $('#fTitulo').value;
      ficha.fecha = $('#fFecha').value;
      ficha.grupo = $('#fGrupo').value;
      LTA.guardarCarrito(ficha);
    });
  });

  function total(){
    return ficha.items.reduce((s,i)=>s+(parseInt(i.min)||0),0);
  }

  function pintar(){
    lista.innerHTML = '';
    $('#vacio').style.display = ficha.items.length ? 'none' : '';
    ficha.items.forEach((item, idx) => {
      const j = LTA.porId(item.id);
      if(!j){ return; }
      const div = document.createElement('div');
      div.className = 'item-ficha';
      div.draggable = true;
      div.dataset.idx = idx;
      div.innerHTML = `
        <div class="item-num">${idx+1}</div>
        <div class="item-cuerpo">
          <h3>${LTA.esConcepto(j.id)?'📖 ':''}${j.t} <span class="cat-tag">${LTA.esConcepto(j.id)?'Concepto teórico':((j.c||[])[0]||'')}</span></h3>
          <p class="desc">${j.d}</p>
          ${j.v ? `<p class="desc"><em>Variantes: ${j.v}</em></p>` : ''}
          <textarea placeholder="Notas para esta sesión (consignas, adaptaciones al grupo...)" data-nota="${idx}">${item.nota||''}</textarea>
        </div>
        <div class="item-controles">
          <input type="number" class="minutos" min="1" max="120" value="${item.min}" data-min="${idx}" title="Minutos">
          <div class="flechas">
            <button class="btn btn-secundario btn-mini" data-sube="${idx}" ${idx===0?'disabled':''}>▲</button>
            <button class="btn btn-secundario btn-mini" data-baja="${idx}" ${idx===ficha.items.length-1?'disabled':''}>▼</button>
          </div>
          <button class="btn btn-rojo btn-mini" data-quita="${idx}">✕</button>
        </div>`;
      lista.appendChild(div);
    });
    const t = total();
    $('#totalMin').textContent = t + ' min';
    const h = Math.floor(t/60), m = t%60;
    $('#avisoMin').textContent = t ? `(${h}h ${m}') · ${ficha.items.length} juegos` : '';
    LTA.actualizarBadge();
  }

  lista.addEventListener('input', e => {
    if(e.target.dataset.min !== undefined){
      ficha.items[+e.target.dataset.min].min = parseInt(e.target.value)||0;
      LTA.guardarCarrito(ficha);
      const t = total();
      $('#totalMin').textContent = t + ' min';
      $('#avisoMin').textContent = `(${Math.floor(t/60)}h ${t%60}') · ${ficha.items.length} juegos`;
    }
    if(e.target.dataset.nota !== undefined){
      ficha.items[+e.target.dataset.nota].nota = e.target.value;
      LTA.guardarCarrito(ficha);
    }
  });
  lista.addEventListener('click', e => {
    const sube = e.target.closest('[data-sube]');
    const baja = e.target.closest('[data-baja]');
    const quita = e.target.closest('[data-quita]');
    if(sube){ const i=+sube.dataset.sube; [ficha.items[i-1],ficha.items[i]]=[ficha.items[i],ficha.items[i-1]]; }
    else if(baja){ const i=+baja.dataset.baja; [ficha.items[i+1],ficha.items[i]]=[ficha.items[i],ficha.items[i+1]]; }
    else if(quita){ ficha.items.splice(+quita.dataset.quita,1); }
    else return;
    LTA.guardarCarrito(ficha); pintar();
  });

  // drag & drop
  let dragIdx = null;
  lista.addEventListener('dragstart', e => {
    const it = e.target.closest('.item-ficha'); if(!it) return;
    dragIdx = +it.dataset.idx; it.classList.add('arrastrando');
  });
  lista.addEventListener('dragend', e => {
    const it = e.target.closest('.item-ficha'); if(it) it.classList.remove('arrastrando');
  });
  lista.addEventListener('dragover', e => e.preventDefault());
  lista.addEventListener('drop', e => {
    e.preventDefault();
    const it = e.target.closest('.item-ficha'); if(!it || dragIdx===null) return;
    const destino = +it.dataset.idx;
    const [mov] = ficha.items.splice(dragIdx,1);
    ficha.items.splice(destino,0,mov);
    dragIdx = null;
    LTA.guardarCarrito(ficha); pintar();
  });

  // exportar markdown
  function generarMd(){
    const t = total();
    let md = `# ${ficha.titulo || 'Ficha de clase'}\n`;
    if(ficha.fecha || ficha.grupo) md += `**${[ficha.fecha, ficha.grupo].filter(Boolean).join(' · ')}** — Total: ${t} min (${Math.floor(t/60)}h ${t%60}')\n`;
    md += '\n---\n';
    ficha.items.forEach((item,i) => {
      const j = LTA.porId(item.id); if(!j) return;
      const esConc = LTA.esConcepto(j.id);
      md += `\n## ${i+1}. ${esConc?'📖 ':''}${j.t} (${item.min}')\n`;
      md += `*${esConc?'Concepto teórico — ':''}${(j.c||[]).join(', ')}*\n\n${j.d}\n`;
      if(j.v) md += `\n**${esConc?'Cómo aplicarlo':'Variantes'}:** ${j.v}\n`;
      if(item.nota) md += `\n> 📝 ${item.nota}\n`;
    });
    md += `\n---\n*Generada con Libera tu arte · ${new Date().toLocaleDateString('es-ES')}*\n`;
    return md;
  }
  $('#btnExportarMd').onclick = () => {
    if(!ficha.items.length){ alert('La ficha está vacía.'); return; }
    const blob = new Blob([generarMd()], {type:'text/markdown;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (ficha.titulo ? LTA.slug(ficha.titulo) : 'ficha') + '.md';
    a.click();
  };
  $('#btnImprimir').onclick = () => {
    if(!ficha.items.length){ alert('La ficha está vacía.'); return; }
    document.title = ficha.titulo || 'Ficha de clase';
    window.print();
  };
  $('#btnVaciar').onclick = () => {
    if(!confirm('¿Vaciar la ficha actual?')) return;
    ficha = {titulo:'', fecha:'', grupo:'', items:[]};
    LTA.guardarCarrito(ficha);
    $('#fTitulo').value=''; $('#fFecha').value=''; $('#fGrupo').value='';
    pintar();
  };

  // fichas guardadas
  function pintarGuardadas(){
    const guardadas = LTA.leer(LTA.KEY_FICHAS, []);
    const cont = $('#listaGuardadas');
    cont.innerHTML = guardadas.length ? '' : '<p style="color:#6b6478;font-size:.9rem">Aún no has guardado ninguna ficha.</p>';
    guardadas.forEach((f,i) => {
      const min = f.items.reduce((s,x)=>s+(x.min||0),0);
      const div = document.createElement('div');
      div.className = 'ficha-guardada';
      div.innerHTML = `
        <span class="nombre">${f.titulo || 'Sin título'}</span>
        <span class="datos">${f.fecha || ''} · ${f.items.length} juegos · ${min}'</span>
        <button class="btn btn-secundario btn-mini" data-carga="${i}">Cargar</button>
        <button class="btn btn-rojo btn-mini" data-borra="${i}">✕</button>`;
      cont.appendChild(div);
    });
  }
  $('#btnGuardarFicha').onclick = () => {
    if(!ficha.items.length){ alert('La ficha está vacía.'); return; }
    if(!ficha.titulo){ ficha.titulo = prompt('Título de la ficha:','Ficha ' + new Date().toLocaleDateString('es-ES')) || 'Ficha'; $('#fTitulo').value = ficha.titulo; }
    const guardadas = LTA.leer(LTA.KEY_FICHAS, []);
    const idx = guardadas.findIndex(f => f.titulo === ficha.titulo);
    const copia = JSON.parse(JSON.stringify(ficha));
    if(idx >= 0){ if(confirm('Ya existe una ficha con ese título. ¿Sobreescribir?')) guardadas[idx] = copia; else return; }
    else guardadas.push(copia);
    LTA.guardar(LTA.KEY_FICHAS, guardadas);
    LTA.guardarCarrito(ficha);
    pintarGuardadas();
    alert('Ficha guardada ✔');
  };
  $('#listaGuardadas').addEventListener('click', e => {
    const carga = e.target.closest('[data-carga]');
    const borra = e.target.closest('[data-borra]');
    const guardadas = LTA.leer(LTA.KEY_FICHAS, []);
    if(carga){
      ficha = JSON.parse(JSON.stringify(guardadas[+carga.dataset.carga]));
      LTA.guardarCarrito(ficha);
      $('#fTitulo').value = ficha.titulo||''; $('#fFecha').value = ficha.fecha||''; $('#fGrupo').value = ficha.grupo||'';
      pintar();
    }
    if(borra){
      if(!confirm('¿Borrar esta ficha guardada?')) return;
      guardadas.splice(+borra.dataset.borra,1);
      LTA.guardar(LTA.KEY_FICHAS, guardadas);
      pintarGuardadas();
    }
  });

  pintar();
  pintarGuardadas();
})();
