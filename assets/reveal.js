(function(){
  // Sombra de la cabecera al hacer scroll + botón "subir arriba"
  var header=document.querySelector('.header');
  var toTop=document.getElementById('toTop');
  function onScroll(){
    var y=window.scrollY;
    if(header) header.classList.toggle('scrolled', y>8);
    if(toTop) toTop.classList.toggle('show', y>500);
  }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  if(toTop) toTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Contador animado
  function countUp(el){
    var target=parseInt(el.getAttribute('data-count'),10)||0;
    var suf=el.getAttribute('data-suffix')||'';
    var pre=el.getAttribute('data-prefix')||'';
    var fin=el.getAttribute('data-final'); // remate cómico opcional
    function finish(){
      if(fin){ el.textContent=fin; el.classList.add('is-final','count-pop'); }
      else el.textContent=pre+target+suf;
    }
    if(reduce){ finish(); return; }
    var t0=null, dur=fin?1900:1400;
    function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1);
      el.textContent=pre+Math.round(target*(0.2+0.8*p*(2-p)))+suf; // ease-out
      if(p<1) requestAnimationFrame(step); else finish(); }
    requestAnimationFrame(step);
  }

  // Carrusel de localidades: van pasando una a una cada 2 s
  var rot=document.getElementById('townRotator');
  if(rot){
    var towns=[].slice.call(rot.querySelectorAll('.tc-town'));
    if(towns.length>1 && !reduce){
      var ti=0;
      setInterval(function(){
        towns[ti].classList.remove('is-active');
        ti=(ti+1)%towns.length;
        towns[ti].classList.add('is-active');
      }, 2000);
    } else if(reduce){
      rot.classList.add('static');
      towns.forEach(function(t){ t.classList.add('is-active'); });
    }
  }

  if(!('IntersectionObserver' in window)) return;

  // Contadores
  var counters=[].slice.call(document.querySelectorAll('[data-count]'));
  if(counters.length){
    var cio=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); } }); }, {threshold:.4});
    counters.forEach(function(c){ cio.observe(c); });
  }

  // Aparición al hacer scroll
  if(reduce) return;
  var sel=['.sec-center','.poster','.ag-row','.member2','.content-sec','.clm-band',
           '.rrss-item','.taller-img','.infocard','.page-banner','.g-cell','.show-ficha','.video-wrap','.stat','.hist-chapter'];
  var els=[];
  sel.forEach(function(s){ [].forEach.call(document.querySelectorAll(s), function(e){ if(els.indexOf(e)<0) els.push(e); }); });
  els.forEach(function(e){ e.classList.add('reveal'); });
  els.forEach(function(e){
    var sibs=[].filter.call(e.parentNode.children, function(c){ return c.classList.contains('reveal'); });
    var idx=sibs.indexOf(e);
    if(idx>0) e.style.transitionDelay=Math.min(idx*60,400)+'ms';
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
  els.forEach(function(e){ io.observe(e); });
})();
