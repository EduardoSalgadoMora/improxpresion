// Calendario de actuaciones - ImproXpresión
(function(){
  const $ = s => document.querySelector(s);
  const KEY = 'lta_actuaciones';
  let editandoId = null;

  const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

  function leer(){ return LTA.leer(KEY, []); }
  function guardar(lista){ LTA.guardar(KEY, lista); }

  // ---- Google Calendar / ICS ----
  function compacta(fecha, hora){ // '2026-07-15','19:00' -> '20260715T190000'
    return fecha.replace(/-/g,'') + 'T' + (hora||'19:00').replace(':','') + '00';
  }
  function urlGoogle(a){
    const ini = compacta(a.fecha, a.horaIni);
    const fin = compacta(a.fecha, a.horaFin || sumaHora(a.horaIni));
    const p = new URLSearchParams({
      action: 'TEMPLATE',
      text: a.titulo,
      dates: ini + '/' + fin,
      location: a.lugar || '',
      details: (a.notas || '') + '\n\n(Añadido desde la web de ImproXpresión)'
    });
    return 'https://calendar.google.com/calendar/render?' + p.toString();
  }
  function sumaHora(h){
    const [hh,mm] = (h||'19:00').split(':').map(Number);
    return String((hh+2)%24).padStart(2,'0') + ':' + String(mm).padStart(2,'0');
  }
  function descargarIcs(a){
    const ics = [
      'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ImproXpresion//ES','BEGIN:VEVENT',
      'UID:' + a.id + '@improxpresion',
      'DTSTART:' + compacta(a.fecha, a.horaIni),
      'DTEND:' + compacta(a.fecha, a.horaFin || sumaHora(a.horaIni)),
      'SUMMARY:' + a.titulo.replace(/[,;]/g,' '),
      'LOCATION:' + (a.lugar||'').replace(/[,;]/g,' '),
      'DESCRIPTION:' + (a.notas||'').replace(/\n/g,'\\n').replace(/[,;]/g,' '),
      'END:VEVENT','END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
    const el = document.createElement('a');
    el.href = URL.createObjectURL(blob);
    el.download = LTA.slug(a.titulo) + '.ics';
    el.click();
  }

  // ---- pintar ----
  function tarjeta(a, pasada){
    const d = new Date(a.fecha + 'T00:00:00');
    const div = document.createElement('article');
    div.className = 'actuacion' + (pasada ? ' pasada' : '');
    div.innerHTML = `
      <div class="fecha-badge">
        <div class="dia">${d.getDate()}</div>
        <div class="mes">${MESES[d.getMonth()]}</div>
        <div class="anio">${d.getFullYear()}</div>
      </div>
      <div class="cuerpo">
        <h3>${a.titulo}</h3>
        <p class="detalles">🕐 ${a.horaIni}${a.horaFin ? ' - ' + a.horaFin : ''}${a.lugar ? ' · 📍 ' + a.lugar : ''}</p>
        ${a.notas ? `<p class="notas">${a.notas}</p>` : ''}
      </div>
      <div class="botones">
        <a class="btn btn-google btn-mini" href="${urlGoogle(a)}" target="_blank" title="Añadir a Google Calendar">📆 Google Calendar</a>
        <button class="btn btn-secundario btn-mini" data-ics="${a.id}" title="Descargar .ics (Outlook, iPhone...)">⬇ .ics</button>
        <div style="display:flex;gap:6px">
          <button class="btn btn-secundario btn-mini" data-edita="${a.id}">✏</button>
          <button class="btn btn-rojo btn-mini" data-borra="${a.id}">✕</button>
        </div>
      </div>`;
    return div;
  }

  function pintar(){
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    const lista = leer().slice().sort((x,y) => (x.fecha + x.horaIni).localeCompare(y.fecha + y.horaIni));
    const prox = $('#listaProximas'), pas = $('#listaPasadas');
    prox.innerHTML = ''; pas.innerHTML = '';
    let nProx = 0, nPas = 0;
    lista.forEach(a => {
      const pasada = new Date(a.fecha + 'T23:59:59') < hoy;
      if(pasada){ pas.appendChild(tarjeta(a, true)); nPas++; }
      else { prox.appendChild(tarjeta(a, false)); nProx++; }
    });
    if(!nProx) prox.innerHTML = '<p style="color:#6b6478;padding:6px 4px">No hay actuaciones programadas. ¡Apunta la próxima arriba! 🎤</p>';
    if(!nPas) pas.innerHTML = '<p style="color:#6b6478;padding:6px 4px">Aún nada por aquí.</p>';
    // las pasadas, las más recientes primero
    [...pas.children].reverse().forEach(el => pas.appendChild(el));
  }

  // ---- guardar / editar / borrar ----
  function limpiarForm(){
    editandoId = null;
    $('#tituloForm').textContent = '➕ Nueva actuación';
    $('#btnCancelarEdicion').style.display = 'none';
    $('#aTitulo').value=''; $('#aFecha').value=''; $('#aLugar').value=''; $('#aNotas').value='';
    $('#aHoraIni').value='19:00'; $('#aHoraFin').value='21:00';
  }
  $('#btnGuardarActuacion').onclick = () => {
    const titulo = $('#aTitulo').value.trim();
    const fecha = $('#aFecha').value;
    const horaIni = $('#aHoraIni').value;
    if(!titulo || !fecha || !horaIni){ alert('Faltan título, fecha u hora de inicio.'); return; }
    const lista = leer();
    const act = {
      id: editandoId || ('act-' + Date.now().toString(36)),
      titulo, fecha, horaIni,
      horaFin: $('#aHoraFin').value || '',
      lugar: $('#aLugar').value.trim(),
      notas: $('#aNotas').value.trim()
    };
    if(editandoId){
      const i = lista.findIndex(x => x.id === editandoId);
      if(i >= 0) lista[i] = act; else lista.push(act);
    } else lista.push(act);
    guardar(lista);
    limpiarForm(); pintar();
  };
  $('#btnCancelarEdicion').onclick = limpiarForm;

  document.body.addEventListener('click', e => {
    const ics = e.target.closest('[data-ics]');
    const edita = e.target.closest('[data-edita]');
    const borra = e.target.closest('[data-borra]');
    if(ics){
      const a = leer().find(x => x.id === ics.dataset.ics);
      if(a) descargarIcs(a);
    }
    if(edita){
      const a = leer().find(x => x.id === edita.dataset.edita);
      if(!a) return;
      editandoId = a.id;
      $('#tituloForm').textContent = '✏ Editando: ' + a.titulo;
      $('#btnCancelarEdicion').style.display = '';
      $('#aTitulo').value = a.titulo; $('#aFecha').value = a.fecha;
      $('#aHoraIni').value = a.horaIni; $('#aHoraFin').value = a.horaFin || '';
      $('#aLugar').value = a.lugar || ''; $('#aNotas').value = a.notas || '';
      window.scrollTo({top:0, behavior:'smooth'});
    }
    if(borra){
      const a = leer().find(x => x.id === borra.dataset.borra);
      if(a && confirm('¿Borrar "' + a.titulo + '"?')){
        guardar(leer().filter(x => x.id !== a.id));
        pintar();
      }
    }
  });

  pintar();
})();
