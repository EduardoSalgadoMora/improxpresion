// ============================================================
//  Datos del mapa de La Sagra — GENERADO por scripts/build_sagra.mjs
//  NO editar a mano: reejecuta  node scripts/build_sagra.mjs
//  Poblaciones aproximadas (INE). Mapa esquemático (Voronoi sobre
//  centroides aprox.): sirve para localizar y consultar, no para lindes.
// ============================================================
window.SAGRA = {
  viewBox: "0 0 960 1102",
  bordePath: "M26,1049.3L114.1,637.3L229.7,213.7L264.1,112.5L314.5,40L420,26L529.5,47.4L599.5,58.7L659.6,102.8L809.8,274L934,461.4L843.7,693.1L724.7,908.8L540.7,1002.6L351.3,1056.6L177.3,1075.7Z",
  // Escala de color por magnitud (población). Índice bajo = claro.
  rampa: ["#ffffd4","#fee9a8","#fdc976","#fca63f","#f0821f","#cc5710","#8c2d04"],
  umbrales: [1500,3000,5000,7500,12000,25000],
  municipios: [
  {
    "id": "illescas",
    "nombre": "Illescas",
    "prov": "Toledo",
    "pob": 30500,
    "espacios": [
      "Centro Cultural El Colegio",
      "Casa de la Cultura",
      "Auditorio Municipal",
      "Plaza del Mercado"
    ],
    "festivales": [
      "Festival dCALLE — artes de calle (teatro, circo, danza y música), finales de agosto"
    ],
    "path": "M590.2,336.7L537.1,446L441.7,441.5L433.8,379.4L584.1,321.9Z",
    "lx": 509.6,
    "ly": 391.6
  },
  {
    "id": "yuncos",
    "nombre": "Yuncos",
    "prov": "Toledo",
    "pob": 12000,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M441.7,441.5L537.1,446L592.7,524.7L587.6,551.2L397.9,537.2L399.4,513.5Z",
    "lx": 494.3,
    "ly": 499.9
  },
  {
    "id": "numancia-de-la-sagra",
    "nombre": "Numancia de la Sagra",
    "prov": "Toledo",
    "pob": 5300,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M592.7,524.7L537.1,446L590.2,336.7L619.4,360.3L606.2,512.5Z",
    "lx": 585.3,
    "ly": 430.2
  },
  {
    "id": "yeles",
    "nombre": "Yeles",
    "prov": "Toledo",
    "pob": 4300,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M713.8,405.2L648,489L606.2,512.5L619.4,360.3Z",
    "lx": 647.6,
    "ly": 431
  },
  {
    "id": "esquivias",
    "nombre": "Esquivias",
    "prov": "Toledo",
    "pob": 5800,
    "espacios": [
      "Casa de la Cultura",
      "Museo Casa de Cervantes"
    ],
    "festivales": [],
    "path": "M798.3,565.6L648,489L713.8,405.2L769.2,399.8Z",
    "lx": 734,
    "ly": 476.3
  },
  {
    "id": "borox",
    "nombre": "Borox",
    "prov": "Toledo",
    "pob": 3900,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M767.3,686.8L635.6,640.6L611.2,620.7L587.6,551.2L592.7,524.7L606.2,512.5L648,489L798.3,565.6L842.4,686.3Z",
    "lx": 708.1,
    "ly": 594.8
  },
  {
    "id": "sesena",
    "nombre": "Seseña",
    "prov": "Toledo",
    "pob": 28000,
    "espacios": [
      "Casa de la Cultura",
      "Centro Cívico El Quiñón"
    ],
    "festivales": [],
    "path": "M837.5,315.7L934,461.4L845.7,687.8L842.4,686.3L798.3,565.6L769.2,399.8Z",
    "lx": 845.8,
    "ly": 485
  },
  {
    "id": "cedillo-del-condado",
    "nombre": "Cedillo del Condado",
    "prov": "Toledo",
    "pob": 3200,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M317,334.9L403.3,340.5L433.8,379.4L441.7,441.5L399.4,513.5L295.9,417.1Z",
    "lx": 373.2,
    "ly": 411.1
  },
  {
    "id": "ugena",
    "nombre": "Ugena",
    "prov": "Toledo",
    "pob": 6300,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M584.1,321.9L433.8,379.4L403.3,340.5L456.5,230.3L463.4,229.4L584.4,299.5Z",
    "lx": 485.6,
    "ly": 308
  },
  {
    "id": "carranque",
    "nombre": "Carranque",
    "prov": "Toledo",
    "pob": 5000,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M456.5,230.3L403.3,340.5L317,334.9L313,330.3L325.2,192.6L385.1,179.8Z",
    "lx": 375.7,
    "ly": 261.6
  },
  {
    "id": "el-viso-de-san-juan",
    "nombre": "El Viso de San Juan",
    "prov": "Toledo",
    "pob": 5000,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M204.1,307.4L229.7,213.7L249.5,155.6L325.2,192.6L313,330.3Z",
    "lx": 270.4,
    "ly": 249.5
  },
  {
    "id": "palomeque",
    "nombre": "Palomeque",
    "prov": "Toledo",
    "pob": 900,
    "espacios": [],
    "festivales": [],
    "path": "M157.4,478.6L204.1,307.4L313,330.3L317,334.9L295.9,417.1L178.7,479.6Z",
    "lx": 235.6,
    "ly": 388.1
  },
  {
    "id": "lominchar",
    "nombre": "Lominchar",
    "prov": "Toledo",
    "pob": 2400,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M178.7,479.6L295.9,417.1L399.4,513.5L397.9,537.2L372,585.4L359,596Z",
    "lx": 304.8,
    "ly": 503
  },
  {
    "id": "yuncler",
    "nombre": "Yuncler",
    "prov": "Toledo",
    "pob": 4000,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M397.9,537.2L587.6,551.2L611.2,620.7L511,653.8L372,585.4Z",
    "lx": 497.2,
    "ly": 589.2
  },
  {
    "id": "villaluenga-de-la-sagra",
    "nombre": "Villaluenga de la Sagra",
    "prov": "Toledo",
    "pob": 3400,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M359,596L372,585.4L511,653.8L487.7,721.2L414,750.3L391.4,739L339.7,640.9Z",
    "lx": 421,
    "ly": 669.6
  },
  {
    "id": "cobeja",
    "nombre": "Cobeja",
    "prov": "Toledo",
    "pob": 2100,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M511,653.8L611.2,620.7L635.6,640.6L548.3,765.2L487.7,721.2Z",
    "lx": 556.3,
    "ly": 686.6
  },
  {
    "id": "alameda-de-la-sagra",
    "nombre": "Alameda de la Sagra",
    "prov": "Toledo",
    "pob": 3600,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M414,750.3L487.7,721.2L548.3,765.2L563.7,876L540.4,938.7L492.3,908.9Z",
    "lx": 500.6,
    "ly": 819.1
  },
  {
    "id": "pantoja",
    "nombre": "Pantoja",
    "prov": "Toledo",
    "pob": 3200,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M635.6,640.6L767.3,686.8L563.7,876L548.3,765.2Z",
    "lx": 637.1,
    "ly": 741.1
  },
  {
    "id": "anover-de-tajo",
    "nombre": "Añover de Tajo",
    "prov": "Toledo",
    "pob": 5500,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M767.3,686.8L842.4,686.3L845.7,687.8L843.7,693.1L724.7,908.8L561.5,992L540.4,938.7L563.7,876Z",
    "lx": 686,
    "ly": 837.9
  },
  {
    "id": "cabanas-de-la-sagra",
    "nombre": "Cabañas de la Sagra",
    "prov": "Toledo",
    "pob": 1900,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M246.5,681.6L339.7,640.9L391.4,739L302.2,843L222.8,776.7Z",
    "lx": 304.2,
    "ly": 738.7
  },
  {
    "id": "recas",
    "nombre": "Recas",
    "prov": "Toledo",
    "pob": 4300,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M120.5,613.7L157.4,478.6L178.7,479.6L359,596L339.7,640.9L246.5,681.6Z",
    "lx": 229.2,
    "ly": 588
  },
  {
    "id": "yunclillos",
    "nombre": "Yunclillos",
    "prov": "Toledo",
    "pob": 900,
    "espacios": [],
    "festivales": [],
    "path": "M78.7,802.8L114.1,637.3L120.5,613.7L246.5,681.6L222.8,776.7L140.1,814.7Z",
    "lx": 158.5,
    "ly": 723.3
  },
  {
    "id": "villaseca-de-la-sagra",
    "nombre": "Villaseca de la Sagra",
    "prov": "Toledo",
    "pob": 2200,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M391.4,739L414,750.3L492.3,908.9L313.3,891L302.2,843Z",
    "lx": 392.1,
    "ly": 839.6
  },
  {
    "id": "magan",
    "nombre": "Magán",
    "prov": "Toledo",
    "pob": 4200,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M140.1,814.7L222.8,776.7L302.2,843L313.3,891L230.8,1006.1L214.3,985.1Z",
    "lx": 229.9,
    "ly": 877.4
  },
  {
    "id": "mocejon",
    "nombre": "Mocejón",
    "prov": "Toledo",
    "pob": 4700,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M313.3,891L492.3,908.9L540.4,938.7L561.5,992L540.7,1002.6L351.3,1056.6L229.4,1070L230.8,1006.1Z",
    "lx": 382.1,
    "ly": 978.4
  },
  {
    "id": "bargas",
    "nombre": "Bargas",
    "prov": "Toledo",
    "pob": 10600,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M26,1049.3L55.6,910.9L214.3,985.1L230.8,1006.1L229.4,1070L177.3,1075.7Z",
    "lx": 126.1,
    "ly": 1007.1
  },
  {
    "id": "olias-del-rey",
    "nombre": "Olías del Rey",
    "prov": "Toledo",
    "pob": 7300,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M55.6,910.9L78.7,802.8L140.1,814.7L214.3,985.1Z",
    "lx": 125.7,
    "ly": 888.8
  },
  {
    "id": "grinon",
    "nombre": "Griñón",
    "prov": "Madrid",
    "pob": 10500,
    "espacios": [
      "Casa de la Cultura",
      "Espacio Escenia (privado, cercano)"
    ],
    "festivales": [],
    "path": "M451.1,32.1L529.5,47.4L599.5,58.7L607,64.2L587.3,110.4L499.1,146.8Z",
    "lx": 527.6,
    "ly": 84.8
  },
  {
    "id": "cubas-de-la-sagra",
    "nombre": "Cubas de la Sagra",
    "prov": "Madrid",
    "pob": 5800,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M583.4,168.1L489.8,192L499.1,146.8L587.3,110.4Z",
    "lx": 542.1,
    "ly": 154
  },
  {
    "id": "casarrubuelos",
    "nombre": "Casarrubuelos",
    "prov": "Madrid",
    "pob": 4200,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M584.4,299.5L463.4,229.4L489.8,192L583.4,168.1L625.5,252.4Z",
    "lx": 552.2,
    "ly": 229.8
  },
  {
    "id": "serranillos-del-valle",
    "nombre": "Serranillos del Valle",
    "prov": "Madrid",
    "pob": 4600,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M424.3,26.8L451.1,32.1L499.1,146.8L489.8,192L463.4,229.4L456.5,230.3L385.1,179.8Z",
    "lx": 443.5,
    "ly": 136
  },
  {
    "id": "torrejon-de-la-calzada",
    "nombre": "Torrejón de la Calzada",
    "prov": "Madrid",
    "pob": 9200,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M607,64.2L659.6,102.8L752.4,208.6L625.5,252.4L583.4,168.1L587.3,110.4Z",
    "lx": 649.8,
    "ly": 167.9
  },
  {
    "id": "torrejon-de-velasco",
    "nombre": "Torrejón de Velasco",
    "prov": "Madrid",
    "pob": 4400,
    "espacios": [
      "Casa de la Cultura"
    ],
    "festivales": [],
    "path": "M752.4,208.6L809.8,274L837.5,315.7L769.2,399.8L713.8,405.2L619.4,360.3L590.2,336.7L584.1,321.9L584.4,299.5L625.5,252.4Z",
    "lx": 711.5,
    "ly": 310.8
  },
  {
    "id": "batres",
    "nombre": "Batres",
    "prov": "Madrid",
    "pob": 1700,
    "espacios": [
      "Casa de la Cultura",
      "Castillo de Batres"
    ],
    "festivales": [],
    "path": "M249.5,155.6L264.1,112.5L314.5,40L420,26L424.3,26.8L385.1,179.8L325.2,192.6Z",
    "lx": 340.7,
    "ly": 110
  }
]
};
