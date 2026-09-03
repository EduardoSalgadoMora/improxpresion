(function(){
  // Sombra de la cabecera al hacer scroll
  var header=document.querySelector('.header');
  function onScroll(){ if(header) header.classList.toggle('scrolled', window.scrollY>8); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // Aparición al hacer scroll
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(!('IntersectionObserver' in window)) return;
  var sel=['.sec-center','.poster','.ag-row','.member2','.content-sec','.clm-band',
           '.rrss-item','.taller-img','.infocard','.page-banner','.g-cell','.show-ficha','.video-wrap'];
  var els=[];
  sel.forEach(function(s){ [].forEach.call(document.querySelectorAll(s), function(e){ if(els.indexOf(e)<0) els.push(e); }); });
  els.forEach(function(e){ e.classList.add('reveal'); });
  // Escalonado por orden entre hermanos
  els.forEach(function(e){
    var sibs=[].filter.call(e.parentNode.children, function(c){ return c.classList.contains('reveal'); });
    var idx=sibs.indexOf(e);
    if(idx>0) e.style.transitionDelay=Math.min(idx*70,350)+'ms';
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
  els.forEach(function(e){ io.observe(e); });
})();
