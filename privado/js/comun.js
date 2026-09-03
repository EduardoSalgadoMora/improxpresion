// Utilidades compartidas - Libera tu arte
const LTA = {
  KEY_FAVS: 'lta_favoritos',
  KEY_CUSTOM: 'lta_juegos_propios',
  KEY_OVERRIDES: 'lta_juegos_editados',
  KEY_CARRITO: 'lta_ficha_actual',
  KEY_FICHAS: 'lta_fichas_guardadas',
  KEY_SAGRA: 'lta_sagra_datos',

  leer(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch(e){ return def; } },
  guardar(k, v){ localStorage.setItem(k, JSON.stringify(v)); },

  // Todos los juegos: base (con ediciones aplicadas) + propios
  todos(){
    const ov = this.leer(this.KEY_OVERRIDES, {});
    const base = JUEGOS.map(j => ov[j.id] ? {...j, ...ov[j.id], id:j.id, editado:true} : j);
    const propios = this.leer(this.KEY_CUSTOM, []).map(j => ({...j, custom:true}));
    return base.concat(propios);
  },
  guardarOverride(juego){
    const ov = this.leer(this.KEY_OVERRIDES, {});
    ov[juego.id] = juego;
    this.guardar(this.KEY_OVERRIDES, ov);
  },
  quitarOverride(id){
    const ov = this.leer(this.KEY_OVERRIDES, {});
    delete ov[id];
    this.guardar(this.KEY_OVERRIDES, ov);
  },
  esBase(id){ return JUEGOS.some(j => j.id === id); },

  // Copia de seguridad de todos los datos del navegador
  exportarDatos(){
    return JSON.stringify({
      version: 1,
      fecha: new Date().toISOString(),
      juegosPropios: this.leer(this.KEY_CUSTOM, []),
      juegosEditados: this.leer(this.KEY_OVERRIDES, {}),
      favoritos: this.leer(this.KEY_FAVS, []),
      fichaActual: this.leer(this.KEY_CARRITO, null),
      fichasGuardadas: this.leer(this.KEY_FICHAS, []),
      actuaciones: this.leer('lta_actuaciones', []),
      sagra: this.leer(this.KEY_SAGRA, {})
    }, null, 2);
  },
  importarDatos(json){
    const d = JSON.parse(json);
    if(d.juegosPropios) this.guardar(this.KEY_CUSTOM, d.juegosPropios);
    if(d.juegosEditados) this.guardar(this.KEY_OVERRIDES, d.juegosEditados);
    if(d.favoritos) this.guardar(this.KEY_FAVS, d.favoritos);
    if(d.fichaActual) this.guardar(this.KEY_CARRITO, d.fichaActual);
    if(d.fichasGuardadas) this.guardar(this.KEY_FICHAS, d.fichasGuardadas);
    if(d.actuaciones) this.guardar('lta_actuaciones', d.actuaciones);
    if(d.sagra) this.guardar(this.KEY_SAGRA, d.sagra);
  },

  // Datos del mapa de La Sagra editados por el usuario (por municipio)
  sagraTodos(){ return this.leer(this.KEY_SAGRA, {}); },
  sagraDe(id){ return this.sagraTodos()[id] || {}; },
  guardarSagra(id, obj){
    const t = this.sagraTodos();
    t[id] = obj;
    this.guardar(this.KEY_SAGRA, t);
  },
  borrarSagra(id){
    const t = this.sagraTodos();
    delete t[id];
    this.guardar(this.KEY_SAGRA, t);
  },
  conceptos(){ return (typeof CONCEPTOS !== 'undefined') ? CONCEPTOS : []; },
  porId(id){ return this.todos().find(j => j.id === id) || this.conceptos().find(c => c.id === id); },
  esConcepto(id){ return String(id).startsWith('c-'); },

  categorias(){
    const s = new Set();
    this.todos().forEach(j => (j.c||[]).forEach(c => s.add(c)));
    return [...s].sort((a,b)=>a.localeCompare(b,'es'));
  },
  autores(){
    const s = new Set();
    this.todos().forEach(j => j.a && s.add(j.a));
    return [...s].sort((a,b)=>a.localeCompare(b,'es'));
  },

  // Favoritos
  esFav(id){ return this.leer(this.KEY_FAVS, []).includes(id); },
  toggleFav(id){
    let f = this.leer(this.KEY_FAVS, []);
    f = f.includes(id) ? f.filter(x=>x!==id) : f.concat(id);
    this.guardar(this.KEY_FAVS, f);
  },

  // Carrito / ficha actual  [{id, min, nota}]
  carrito(){ return this.leer(this.KEY_CARRITO, {titulo:'', fecha:'', grupo:'', items:[]}); },
  guardarCarrito(c){ this.guardar(this.KEY_CARRITO, c); },
  enCarrito(id){ return this.carrito().items.some(i => i.id === id); },
  anadirCarrito(id){
    const c = this.carrito();
    if(!c.items.some(i => i.id === id)){
      c.items.push({id, min: this.esConcepto(id) ? 5 : 10, nota:''});
      this.guardarCarrito(c);
    }
    return c.items.length;
  },
  quitarCarrito(id){
    const c = this.carrito();
    c.items = c.items.filter(i => i.id !== id);
    this.guardarCarrito(c);
    return c.items.length;
  },

  slug(txt){
    return txt.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
      .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,50) || ('juego-'+Date.now());
  },
  norm(txt){ return (txt||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''); },

  actualizarBadge(){
    const b = document.getElementById('badgeCarrito');
    if(b) b.textContent = this.carrito().items.length;
  }
};
document.addEventListener('DOMContentLoaded', () => LTA.actualizarBadge());
