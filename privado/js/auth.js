/* ============================================================
   Candado de acceso — ImproXpresión
   ------------------------------------------------------------
   Protección SENCILLA por usuario + contraseña para toda la web.
   Aviso: al ser una web estática (sin servidor), esto DISUADE a
   curiosos pero no es seguridad de nivel bancario. No reutilices
   aquí una contraseña importante.

   CÓMO AÑADIR/CAMBIAR USUARIOS Y CONTRASEÑAS
   ------------------------------------------
   Los usuarios están en la lista USUARIOS más abajo. Cada uno tiene
   su "user" y el "hash" (huella) de su contraseña (nunca la clave en claro).
   - Para AÑADIR un usuario: copia una línea de la lista y cambia user y hash.
   - Para GENERAR el hash de una clave nueva:
        Abre esta web, pulsa F12 → pestaña "Consola" y pega:
            ixHash('SU_CLAVE').then(h=>console.log(h))
        Copia el texto largo que salga y pégalo como "hash" de ese usuario.
     (La función ixHash queda disponible en la consola.)
   ============================================================ */
(function () {
  'use strict';

  // ---------- CONFIGURACIÓN (edita aquí) ----------
  // Lista de usuarios permitidos. Cada uno con su usuario y el HASH de su clave.
  // Para añadir/cambiar usuarios: copia una línea y pon su usuario y su hash
  // (genera el hash en la consola con:  ixHash('SU_CLAVE').then(h=>console.log(h))  ).
  var USUARIOS = [
    { user: 'impro',   hash: 'dca45684609079d56ef15fd268bf5f2414e81d746149796620c2b262cef59131' }, // clave: randomBurger
    { user: 'edu',     hash: '79768eb5a58b6e7c814c54c7ac8f55e142fe752a4239ef96fd4e1b927a8bae17' }, // clave: impro2025
    { user: 'abraham', hash: '60d47d7db360765539809b1f95367ffa92105b58184b547951fea484cedf34a6' }  // clave: abraham2025
  ];
  var RECORDAR_DIAS = 30;           // cuánto tiempo se recuerda la sesión
  var CLAVE_STORAGE = 'ix_auth';    // dónde se guarda el "ya he entrado"
  // ------------------------------------------------

  // ¿Ya está autenticado y no ha caducado?
  function estaAutenticado() {
    try {
      var v = localStorage.getItem(CLAVE_STORAGE);
      if (!v) return false;
      var exp = parseInt(v, 10);
      if (!exp || Date.now() > exp) { localStorage.removeItem(CLAVE_STORAGE); return false; }
      return true;
    } catch (e) { return false; }
  }

  function guardarSesion() {
    try {
      localStorage.setItem(CLAVE_STORAGE, String(Date.now() + RECORDAR_DIAS * 864e5));
    } catch (e) {}
  }

  function cerrarSesion() {
    try { localStorage.removeItem(CLAVE_STORAGE); } catch (e) {}
    location.reload();
  }

  // ---------- SHA-256 (con crypto.subtle y respaldo puro JS) ----------
  function hashHex(str) {
    var utf8;
    try { utf8 = new TextEncoder().encode(str); } catch (e) { utf8 = null; }
    if (utf8 && window.crypto && crypto.subtle && crypto.subtle.digest) {
      return crypto.subtle.digest('SHA-256', utf8).then(function (buf) {
        var arr = Array.prototype.slice.call(new Uint8Array(buf));
        return arr.map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
      }).catch(function () { return Promise.resolve(sha256puro(str)); });
    }
    return Promise.resolve(sha256puro(str));
  }
  // Expuesta en consola para generar hashes nuevos con comodidad.
  window.ixHash = hashHex;

  // Implementación compacta de SHA-256 (respaldo para file:// en Firefox, etc.)
  function sha256puro(ascii) {
    ascii = unescape(encodeURIComponent(ascii)); // a bytes UTF-8
    function rr(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
    var mathPow = Math.pow, maxWord = mathPow(2, 32), result = '';
    var words = [], asciiBitLength = ascii.length * 8;
    var hash = sha256puro.h = sha256puro.h || [];
    var k = sha256puro.k = sha256puro.k || [];
    var primeCounter = k.length, isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (var ii = 0; ii < 313; ii += candidate) { isComposite[ii] = candidate; }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (var i = 0; i < ascii.length; i++) {
      var j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;
    for (var jj = 0; jj < words.length;) {
      var w = words.slice(jj, jj += 16);
      var oldHash = hash;
      hash = hash.slice(0, 8);
      for (var t = 0; t < 64; t++) {
        var w15 = w[t - 15], w2 = w[t - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7]
          + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25))
          + ((e & hash[5]) ^ (~e & hash[6]))
          + k[t]
          + (w[t] = t < 16 ? w[t] : (
              w[t - 16]
              + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3))
              + w[t - 7]
              + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))
            ) | 0);
        var temp2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (var m = 0; m < 8; m++) { hash[m] = (hash[m] + oldHash[m]) | 0; }
    }
    for (var n = 0; n < 8; n++) {
      for (var p = 3; p + 1; p--) {
        var b = (hash[n] >> (p * 8)) & 255;
        result += ((b < 16) ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }

  // ---------- Bloqueo visual anti-parpadeo ----------
  // Si NO está autenticado, ocultamos el contenido en cuanto se pinte el body.
  var bloqueado = !estaAutenticado();
  if (bloqueado) {
    document.documentElement.classList.add('ix-lock');
    var st = document.createElement('style');
    st.id = 'ixLockStyle';
    st.textContent =
      'html.ix-lock body{overflow:hidden !important}' +
      'html.ix-lock body>*:not(#ixGate){display:none !important}' +
      '#ixGate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;' +
      'background:#f7f5f0;font-family:"Segoe UI",system-ui,sans-serif}' +
      '#ixGate .ix-card{background:#fff;border:1px solid #e5e1d8;border-radius:16px;box-shadow:0 20px 50px rgba(43,36,55,.18);' +
      'width:100%;max-width:380px;padding:32px 30px;text-align:center}' +
      '#ixGate .ix-logo{font-family:"Alphakind","Segoe UI",sans-serif;font-size:2rem;letter-spacing:1.5px;margin-bottom:4px}' +
      '#ixGate .ix-logo .a{color:#3b7dbf}#ixGate .ix-logo .b{color:#f5991e}' +
      '#ixGate .ix-sub{color:#6b6478;font-size:.9rem;margin-bottom:22px}' +
      '#ixGate label{display:block;text-align:left;font-size:.82rem;color:#6b6478;margin:12px 0 4px}' +
      '#ixGate input{width:100%;padding:11px 13px;border:1px solid #e5e1d8;border-radius:8px;font-size:1rem;font-family:inherit}' +
      '#ixGate input:focus{outline:none;border-color:#7c3aed}' +
      '#ixGate button{width:100%;margin-top:20px;padding:12px;border:none;border-radius:8px;background:#7c3aed;color:#fff;' +
      'font-size:1rem;font-weight:600;cursor:pointer;font-family:inherit;transition:.15s}' +
      '#ixGate button:hover{background:#6d28d9}#ixGate button:disabled{opacity:.6;cursor:default}' +
      '#ixGate .ix-error{color:#dc2626;font-size:.85rem;min-height:1.2em;margin-top:12px}' +
      '#ixSalir{position:fixed;bottom:12px;right:12px;z-index:40;background:#fff;border:1px solid #e5e1d8;color:#6b6478;' +
      'border-radius:999px;padding:6px 12px;font-size:.78rem;cursor:pointer;box-shadow:0 2px 8px rgba(43,36,55,.1);' +
      'font-family:"Segoe UI",system-ui,sans-serif}#ixSalir:hover{background:#f3f0ff}';
    document.head.appendChild(st);
  }

  function construirGate() {
    var gate = document.createElement('div');
    gate.id = 'ixGate';
    gate.innerHTML =
      '<form class="ix-card" autocomplete="off">' +
        '<div class="ix-logo"><span class="a">IMPRO</span><span class="b">XPRESIÓN</span></div>' +
        '<div class="ix-sub">🔒 Acceso privado</div>' +
        '<label for="ixUser">Usuario</label>' +
        '<input id="ixUser" type="text" autocomplete="username" autocapitalize="none" spellcheck="false">' +
        '<label for="ixPass">Contraseña</label>' +
        '<input id="ixPass" type="password" autocomplete="current-password">' +
        '<button type="submit" id="ixBtn">Entrar</button>' +
        '<div class="ix-error" id="ixErr"></div>' +
      '</form>';
    document.body.appendChild(gate);

    var form = gate.querySelector('form');
    var elUser = gate.querySelector('#ixUser');
    var elPass = gate.querySelector('#ixPass');
    var elBtn  = gate.querySelector('#ixBtn');
    var elErr  = gate.querySelector('#ixErr');
    elUser.focus();

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      elErr.textContent = '';
      elBtn.disabled = true;
      elBtn.textContent = 'Comprobando…';
      var user = (elUser.value || '').trim().toLowerCase();
      hashHex(elPass.value || '').then(function (h) {
        var ok = USUARIOS.some(function (u) {
          return user === u.user.trim().toLowerCase() && h === u.hash.toLowerCase();
        });
        if (ok) {
          guardarSesion();
          desbloquear();
        } else {
          elBtn.disabled = false;
          elBtn.textContent = 'Entrar';
          elErr.textContent = 'Usuario o contraseña incorrectos';
          elPass.value = '';
          elPass.focus();
        }
      });
    });
  }

  function desbloquear() {
    document.documentElement.classList.remove('ix-lock');
    var st = document.getElementById('ixLockStyle'); if (st) st.remove();
    var gate = document.getElementById('ixGate'); if (gate) gate.remove();
    ponerBotonSalir();
  }

  function ponerBotonSalir() {
    if (document.getElementById('ixSalir')) return;
    var b = document.createElement('button');
    b.id = 'ixSalir';
    b.type = 'button';
    b.textContent = '🔒 Salir';
    b.title = 'Cerrar sesión en este dispositivo';
    b.addEventListener('click', cerrarSesion);
    document.body.appendChild(b);
  }

  function iniciar() {
    if (bloqueado) construirGate();
    else ponerBotonSalir();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
