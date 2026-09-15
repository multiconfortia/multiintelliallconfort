const fs=require('fs');
const path=require('path');
const ORIGEN=path.join(__dirname,'..','database','catalog_ia_v2.1_operator_v14.json');
const SALIDA=path.join(__dirname,'..','database','catalog_ia_v2.1_operator_v14_TEST_PROVEEDOR_150.json');
const d=JSON.parse(fs.readFileSync(ORIGEN,'utf8'));
if(!Array.isArray(d)) throw new Error('CATALOGO NO ES ARRAY');
if(d.length!==3356) throw new Error('TOTAL INESPERADO: '+d.length);
let afectados=0;
for(let i=0;i<150;i++){
  if(d[i].proveedor===undefined||d[i].proveedor===null||String(d[i].proveedor).trim()===''){
    d[i].proveedor='AGOSLICONA';
    afectados++;
  }else if(String(d[i].proveedor).trim()!=='AGOSLICONA'){
    throw new Error('PROVEEDOR INESPERADO EN POSICION '+(i+1)+': '+d[i].proveedor);
  }
}
if(afectados!==150) throw new Error('SE ESPERABAN 150 AFECTADOS, SE OBTUVIERON '+afectados);
fs.writeFileSync(SALIDA,JSON.stringify(d,null,2),'utf8');
console.log('CIRUGIA COMPLETADA');
console.log('ORIGINAL:',ORIGEN);
console.log('SALIDA TEST:',SALIDA);
console.log('TOTAL:',d.length);
console.log('PROVEEDOR AGOSLICONA AGREGADO:',afectados);
