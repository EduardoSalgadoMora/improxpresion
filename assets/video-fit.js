(function(){
  // Ajusta la caja de cada vídeo de Vimeo a la proporción real del vídeo
  // (16:9, cuadrado, vertical…) para que no queden bandas negras a los lados.
  var frames=[].slice.call(document.querySelectorAll('.video-wrap iframe[src*="player.vimeo.com"]'));
  if(!frames.length) return;

  function apply(fr){
    var st=fr._vf; if(!st||!st.w||!st.h) return;
    var wrap=fr.parentNode, r=st.w/st.h;
    wrap.classList.remove('square','portrait','vertical');
    if(r<0.7) wrap.classList.add('vertical');
    else if(r<0.9) wrap.classList.add('portrait');
    else if(r<1.25) wrap.classList.add('square');
    wrap.style.aspectRatio=st.w+' / '+st.h;
    st.done=true;
  }

  window.addEventListener('message',function(e){
    if(e.origin!=='https://player.vimeo.com') return;
    var d=e.data; if(typeof d==='string'){ try{ d=JSON.parse(d); }catch(x){ return; } }
    if(!d||!d.method) return;
    frames.forEach(function(fr){
      if(fr.contentWindow!==e.source) return;
      var st=fr._vf||(fr._vf={});
      if(d.method==='getVideoWidth') st.w=d.value;
      if(d.method==='getVideoHeight') st.h=d.value;
      apply(fr);
    });
  });

  frames.forEach(function(fr){
    function ask(){
      if(fr._vf&&fr._vf.done) return;
      ['getVideoWidth','getVideoHeight'].forEach(function(m){
        try{ fr.contentWindow.postMessage(JSON.stringify({method:m}),'https://player.vimeo.com'); }catch(x){}
      });
    }
    fr.addEventListener('load',ask);
    var n=0, t=setInterval(function(){ ask(); if(++n>12||(fr._vf&&fr._vf.done)) clearInterval(t); },700);
  });
})();
