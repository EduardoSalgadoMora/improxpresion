(function(){
  var KEY='ix_cookie_consent'; // valores: "all" | "necessary"
  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }

  // Carga los recursos que sólo se activan con consentimiento (p. ej. Instagram)
  function loadOptional(){
    var nodes=[].slice.call(document.querySelectorAll('script[data-cookie-src]'));
    nodes.forEach(function(n){
      if(n.dataset.loaded) return;
      var s=document.createElement('script');
      s.src=n.dataset.cookieSrc; s.async=true;
      document.body.appendChild(s);
      n.dataset.loaded='1';
    });
  }

  function removeBanner(){
    var b=document.getElementById('cookieBanner');
    if(b) b.parentNode.removeChild(b);
  }

  function accept(v){
    set(v);
    removeBanner();
    if(v==='all') loadOptional();
  }

  function buildBanner(){
    if(document.getElementById('cookieBanner')) return;
    var wrap=document.createElement('div');
    wrap.id='cookieBanner';
    wrap.setAttribute('role','dialog');
    wrap.setAttribute('aria-live','polite');
    wrap.setAttribute('aria-label','Aviso de cookies');
    wrap.innerHTML=
      '<div class="ck-inner">'+
        '<div class="ck-text">'+
          '<strong>🍪 Usamos cookies</strong>'+
          '<p>Utilizamos cookies propias para el funcionamiento del sitio y de terceros '+
          '(Instagram, Vimeo, YouTube) para mostrar vídeos y publicaciones. '+
          'Puedes aceptarlas o rechazarlas. Más info en nuestra '+
          '<a href="cookies.html">política de cookies</a>.</p>'+
        '</div>'+
        '<div class="ck-btns">'+
          '<button type="button" class="btn ck-reject" id="ckReject">Rechazar</button>'+
          '<button type="button" class="btn btn-orange ck-accept" id="ckAccept">Aceptar todo</button>'+
        '</div>'+
      '</div>';
    document.body.appendChild(wrap);
    document.getElementById('ckAccept').addEventListener('click',function(){accept('all');});
    document.getElementById('ckReject').addEventListener('click',function(){accept('necessary');});
  }

  // Enlace "Configurar cookies" (en el pie u otros sitios) reabre el banner
  document.addEventListener('click',function(e){
    var t=e.target.closest && e.target.closest('[data-cookie-settings]');
    if(t){ e.preventDefault(); buildBanner(); }
  });

  function init(){
    var c=get();
    if(c==='all'){ loadOptional(); return; }
    if(c==='necessary'){ return; }
    buildBanner();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
