let datosJSON = JSON.parse('{"aliceblue":[240,248,255,1],"antiquewhite":[250,235,215,1],"aqua":[0,255,255,1],"aquamarine":[127,255,212,1],"azure":[240,255,255,1],"beige":[245,245,220,1],"bisque":[255,228,196,1],"black":[0,0,0,1],"blanchedalmond":[255,235,205,1],"blue":[0,0,255,1],"blueviolet":[138,43,226,1],"brown":[165,42,42,1],"burlywood":[222,184,135,1],"cadetblue":[95,158,160,1],"chartreuse":[127,255,0,1],"chocolate":[210,105,30,1],"coral":[255,127,80,1]}');

let propiedades = Object.keys(datosJSON);
let valores = Object.values(datosJSON);
console.log(valores[0][0]);

//let getRGBA = color => {
//    if (datosJSON[color] === undefined) {
//        return null;
//    }
//    return `rgba(${datosJSON[color]})`;              
//};

let getRGBA = color => datosJSON[color] === undefined ? null : `rgba(${datosJSON[color]})`;

console.log(getRGBA("blue"));
console.log(getRGBA("red"));
