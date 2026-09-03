// ============================================================
//  Generador del mapa corocromático de La Sagra
//  ------------------------------------------------------------
//  Fuente de la verdad de los municipios (coordenadas aprox.,
//  población aprox. INE y datos culturales) + cálculo de las
//  celdas de Voronoi que dibujan el mapa.
//
//  Uso:   node scripts/build_sagra.mjs
//  Salida: data/sagra.js  (se carga desde mapa.html)
//
//  El mapa es ESQUEMÁTICO: cada municipio se coloca en su
//  posición geográfica aproximada y se teselan con Voronoi para
//  obtener regiones contiguas tipo coropleta. No es un mapa
//  catastral: sirve para localizar y consultar, no para lindes.
// ============================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(__dirname, '..');

// ---------- Municipios ----------
// lng/lat: centroide aproximado. poblacion: aprox. (INE, redondeada).
// espacios/festivales/contacto: datos de partida (editables en la web;
//   se completan con el conocimiento local de cada usuario).
const MUNICIPIOS = [
  // --- La Sagra toledana ---
  { id:'illescas', nombre:'Illescas', prov:'Toledo', lng:-3.847, lat:40.122, pob:30500,
    espacios:['Centro Cultural El Colegio','Casa de la Cultura','Auditorio Municipal','Plaza del Mercado'],
    festivales:['Festival dCALLE — artes de calle (teatro, circo, danza y música), finales de agosto'] },
  { id:'yuncos', nombre:'Yuncos', prov:'Toledo', lng:-3.849, lat:40.089, pob:12000,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'numancia-de-la-sagra', nombre:'Numancia de la Sagra', prov:'Toledo', lng:-3.812, lat:40.109, pob:5300,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'yeles', nombre:'Yeles', prov:'Toledo', lng:-3.797, lat:40.108, pob:4300,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'esquivias', nombre:'Esquivias', prov:'Toledo', lng:-3.767, lat:40.090, pob:5800,
    espacios:['Casa de la Cultura','Museo Casa de Cervantes'], festivales:[] },
  { id:'borox', nombre:'Borox', prov:'Toledo', lng:-3.775, lat:40.078, pob:3900,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'sesena', nombre:'Seseña', prov:'Toledo', lng:-3.700, lat:40.099, pob:28000,
    espacios:['Casa de la Cultura','Centro Cívico El Quiñón'], festivales:[] },
  { id:'cedillo-del-condado', nombre:'Cedillo del Condado', prov:'Toledo', lng:-3.909, lat:40.116, pob:3200,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'ugena', nombre:'Ugena', prov:'Toledo', lng:-3.859, lat:40.146, pob:6300,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'carranque', nombre:'Carranque', prov:'Toledo', lng:-3.905, lat:40.163, pob:5000,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'el-viso-de-san-juan', nombre:'El Viso de San Juan', prov:'Toledo', lng:-3.949, lat:40.166, pob:5000,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'palomeque', nombre:'Palomeque', prov:'Toledo', lng:-3.960, lat:40.126, pob:900,
    espacios:[], festivales:[] },
  { id:'lominchar', nombre:'Lominchar', prov:'Toledo', lng:-3.937, lat:40.093, pob:2400,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'yuncler', nombre:'Yuncler', prov:'Toledo', lng:-3.852, lat:40.058, pob:4000,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'villaluenga-de-la-sagra', nombre:'Villaluenga de la Sagra', prov:'Toledo', lng:-3.870, lat:40.030, pob:3400,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'cobeja', nombre:'Cobeja', prov:'Toledo', lng:-3.836, lat:40.021, pob:2100,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'alameda-de-la-sagra', nombre:'Alameda de la Sagra', prov:'Toledo', lng:-3.855, lat:40.001, pob:3600,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'pantoja', nombre:'Pantoja', prov:'Toledo', lng:-3.808, lat:40.006, pob:3200,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'anover-de-tajo', nombre:'Añover de Tajo', prov:'Toledo', lng:-3.774, lat:39.978, pob:5500,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'cabanas-de-la-sagra', nombre:'Cabañas de la Sagra', prov:'Toledo', lng:-3.932, lat:40.005, pob:1900,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'recas', nombre:'Recas', prov:'Toledo', lng:-3.964, lat:40.061, pob:4300,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'yunclillos', nombre:'Yunclillos', prov:'Toledo', lng:-3.995, lat:40.017, pob:900,
    espacios:[], festivales:[] },
  { id:'villaseca-de-la-sagra', nombre:'Villaseca de la Sagra', prov:'Toledo', lng:-3.900, lat:39.984, pob:2200,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'magan', nombre:'Magán', prov:'Toledo', lng:-3.968, lat:39.972, pob:4200,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'mocejon', nombre:'Mocejón', prov:'Toledo', lng:-3.906, lat:39.938, pob:4700,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'bargas', nombre:'Bargas', prov:'Toledo', lng:-4.021, lat:39.940, pob:10600,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'olias-del-rey', nombre:'Olías del Rey', prov:'Toledo', lng:-4.010, lat:39.958, pob:7300,
    espacios:['Casa de la Cultura'], festivales:[] },
  // --- La Sagra madrileña ---
  { id:'grinon', nombre:'Griñón', prov:'Madrid', lng:-3.843, lat:40.211, pob:10500,
    espacios:['Casa de la Cultura','Espacio Escenia (privado, cercano)'], festivales:[] },
  { id:'cubas-de-la-sagra', nombre:'Cubas de la Sagra', prov:'Madrid', lng:-3.836, lat:40.198, pob:5800,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'casarrubuelos', nombre:'Casarrubuelos', prov:'Madrid', lng:-3.831, lat:40.183, pob:4200,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'serranillos-del-valle', nombre:'Serranillos del Valle', prov:'Madrid', lng:-3.868, lat:40.203, pob:4600,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'torrejon-de-la-calzada', nombre:'Torrejón de la Calzada', prov:'Madrid', lng:-3.797, lat:40.196, pob:9200,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'torrejon-de-velasco', nombre:'Torrejón de Velasco', prov:'Madrid', lng:-3.774, lat:40.145, pob:4400,
    espacios:['Casa de la Cultura'], festivales:[] },
  { id:'batres', nombre:'Batres', prov:'Madrid', lng:-3.919, lat:40.213, pob:1700,
    espacios:['Casa de la Cultura','Castillo de Batres'], festivales:[] },
];

// ---------- Proyección (equirectangular local) ----------
const lat0 = MUNICIPIOS.reduce((s,m)=>s+m.lat,0)/MUNICIPIOS.length;
const lng0 = MUNICIPIOS.reduce((s,m)=>s+m.lng,0)/MUNICIPIOS.length;
const kx = Math.cos(lat0 * Math.PI/180);
const proj = (lng,lat)=>({ x:(lng-lng0)*kx, y:-(lat-lat0) });
const sites = MUNICIPIOS.map(m=>proj(m.lng,m.lat));

// ---------- Casco convexo (para el borde) ----------
function convexHull(pts){
  const p = pts.map((q,i)=>({...q,i})).sort((a,b)=> a.x-b.x || a.y-b.y);
  const cross=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x);
  const lower=[]; for(const q of p){ while(lower.length>=2 && cross(lower[lower.length-2],lower[lower.length-1],q)<=0) lower.pop(); lower.push(q); }
  const upper=[]; for(let i=p.length-1;i>=0;i--){ const q=p[i]; while(upper.length>=2 && cross(upper[upper.length-2],upper[upper.length-1],q)<=0) upper.pop(); upper.push(q); }
  lower.pop(); upper.pop();
  return lower.concat(upper);
}
// Borde = casco convexo dilatado hacia fuera desde el centroide, con
// subdivisión para un contorno más orgánico (aspecto de comarca).
function bordeComarca(pts){
  const hull = convexHull(pts);
  const cx = hull.reduce((s,p)=>s+p.x,0)/hull.length;
  const cy = hull.reduce((s,p)=>s+p.y,0)/hull.length;
  const expand = 1.18;
  const grande = hull.map(p=>({ x:cx+(p.x-cx)*expand, y:cy+(p.y-cy)*expand }));
  // subdividir cada arista con un punto medio ligeramente empujado hacia fuera
  const out=[];
  for(let i=0;i<grande.length;i++){
    const a=grande[i], b=grande[(i+1)%grande.length];
    out.push(a);
    const mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
    out.push({ x:cx+(mx-cx)*1.04, y:cy+(my-cy)*1.04 });
  }
  return out;
}
const borde = bordeComarca(sites);

// ---------- Voronoi por recorte de semiplanos (Sutherland–Hodgman) ----------
function clipHalfPlane(poly, pi, pj){
  // conservar los puntos más cerca de pi que de pj
  const mx=(pi.x+pj.x)/2, my=(pi.y+pj.y)/2;
  const nx=pj.x-pi.x, ny=pj.y-pi.y;              // normal hacia pj
  const dentro = p => (p.x-mx)*nx + (p.y-my)*ny <= 0;
  const out=[];
  for(let i=0;i<poly.length;i++){
    const A=poly[i], B=poly[(i+1)%poly.length];
    const dA=dentro(A), dB=dentro(B);
    if(dA) out.push(A);
    if(dA!==dB){
      const fa=(A.x-mx)*nx+(A.y-my)*ny;
      const fb=(B.x-mx)*nx+(B.y-my)*ny;
      const t=fa/(fa-fb);
      out.push({ x:A.x+t*(B.x-A.x), y:A.y+t*(B.y-A.y) });
    }
  }
  return out;
}
function celda(i){
  let poly = borde.slice();
  for(let j=0;j<sites.length;j++){
    if(j===i) continue;
    poly = clipHalfPlane(poly, sites[i], sites[j]);
    if(poly.length===0) break;
  }
  return poly;
}
const celdas = sites.map((_,i)=>celda(i));

// ---------- Encaje en el viewBox ----------
const VBW = 960, PAD = 26;
let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
for(const p of borde){ minX=Math.min(minX,p.x); minY=Math.min(minY,p.y); maxX=Math.max(maxX,p.x); maxY=Math.max(maxY,p.y); }
const w=maxX-minX, h=maxY-minY;
const scale=(VBW-2*PAD)/w;
const VBH=Math.round(h*scale+2*PAD);
const tx = p => +( (p.x-minX)*scale + PAD ).toFixed(1);
const ty = p => +( (p.y-minY)*scale + PAD ).toFixed(1);
const toPath = poly => poly.length ? 'M'+poly.map(p=>`${tx(p)},${ty(p)}`).join('L')+'Z' : '';
function centroide(poly){
  let a=0,cx=0,cy=0;
  for(let i=0;i<poly.length;i++){
    const p=poly[i], q=poly[(i+1)%poly.length];
    const f=p.x*q.y-q.x*p.y; a+=f; cx+=(p.x+q.x)*f; cy+=(p.y+q.y)*f;
  }
  a*=0.5;
  if(Math.abs(a)<1e-9){ const m=poly.reduce((s,p)=>({x:s.x+p.x,y:s.y+p.y}),{x:0,y:0}); return {x:m.x/poly.length,y:m.y/poly.length}; }
  return { x:cx/(6*a), y:cy/(6*a) };
}

// ---------- Ensamblar salida ----------
const municipiosOut = MUNICIPIOS.map((m,i)=>{
  const poly=celdas[i];
  const c=centroide(poly);
  return {
    id:m.id, nombre:m.nombre, prov:m.prov, pob:m.pob,
    espacios:m.espacios, festivales:m.festivales,
    path: toPath(poly),
    lx: +tx(c).toFixed ? tx(c) : tx(c),
    ly: ty(c),
  };
});

const salida =
`// ============================================================
//  Datos del mapa de La Sagra — GENERADO por scripts/build_sagra.mjs
//  NO editar a mano: reejecuta  node scripts/build_sagra.mjs
//  Poblaciones aproximadas (INE). Mapa esquemático (Voronoi sobre
//  centroides aprox.): sirve para localizar y consultar, no para lindes.
// ============================================================
window.SAGRA = {
  viewBox: "0 0 ${VBW} ${VBH}",
  bordePath: ${JSON.stringify(toPath(borde))},
  // Escala de color por magnitud (población). Índice bajo = claro.
  rampa: ["#ffffd4","#fee9a8","#fdc976","#fca63f","#f0821f","#cc5710","#8c2d04"],
  umbrales: [1500,3000,5000,7500,12000,25000],
  municipios: ${JSON.stringify(municipiosOut, null, 2)}
};
`;

mkdirSync(join(RAIZ,'data'),{recursive:true});
writeFileSync(join(RAIZ,'data','sagra.js'), salida, 'utf8');
console.log(`OK · ${municipiosOut.length} municipios · viewBox 0 0 ${VBW} ${VBH}`);
const vacias = municipiosOut.filter(m=>!m.path).map(m=>m.nombre);
if(vacias.length) console.log('AVISO celdas vacías:', vacias.join(', '));
