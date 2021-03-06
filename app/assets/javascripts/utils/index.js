Number.prototype.between = function (start, finish) {
  return this >= start && this < finish
};

function hexToRgbA(hex, alpha = 1){
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
    if(c.length== 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return `rgba(${(c>>16)&255},${(c>>8)&255},${c&255},${alpha})`;
  }
  throw new Error('Bad Hex');
}

String.prototype.underscore = function() {
  return this
    .replace(/([A-Z]+)([A-Z][a-z])/g,'\$1_\$2')
    .replace(/([a-z\d])([A-Z])/g,'\$1_\$2')
    .replace('-', '_')
    .toLowerCase()
};
