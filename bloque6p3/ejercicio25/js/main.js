let dataJSON1 = {
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
};

let dataJSON2 = {
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": {
        "GlossEntry": {
          "ID": "SGML",
          "SortAs": "SGML",
          "GlossTerm": "Standard Generalized Markup Language",
          "Acronym": "SGML",
          "Abbrev": "ISO 8879:1986",
          "GlossDef": {
            "para": "A meta-markup language, used to create markup languages such as DocBook.",
            "GlossSeeAlso": ["GML", "XML"]
          },
          "GlossSee": "markup"
        }
      }
    }
  }
};

let dataJSON3 = {
  "web-app": {
    "servlet": [
      {
        "servlet-name": "cofaxCDS",
        "servlet-class": "org.cofax.cds.CDSServlet",
        "init-param": {
          "configGlossary:installationAt": "Philadelphia, PA",
          "configGlossary:adminEmail": "ksm@pobox.com",
          "configGlossary:poweredBy": "Cofax",
          "configGlossary:poweredByIcon": "/images/cofax.gif",
          "configGlossary:staticPath": "/content/static",
          "templateProcessorClass": "org.cofax.WysiwygTemplate",
          "templateLoaderClass": "org.cofax.FilesTemplateLoader",
          "templatePath": "templates",
          "templateOverridePath": "",
          "defaultListTemplate": "listTemplate.htm",
          "defaultFileTemplate": "articleTemplate.htm",
          "useJSP": false,
          "jspListTemplate": "listTemplate.jsp",
          "jspFileTemplate": "articleTemplate.jsp",
          "cachePackageTagsTrack": 200,
          "cachePackageTagsStore": 200,
          "cachePackageTagsRefresh": 60,
          "cacheTemplatesTrack": 100,
          "cacheTemplatesStore": 50,
          "cacheTemplatesRefresh": 15,
          "cachePagesTrack": 200,
          "cachePagesStore": 100,
          "cachePagesRefresh": 10,
          "cachePagesDirtyRead": 10,
          "searchEngineListTemplate": "forSearchEnginesList.htm",
          "searchEngineFileTemplate": "forSearchEngines.htm",
          "searchEngineRobotsDb": "WEB-INF/robots.db",
          "useDataStore": true,
          "dataStoreClass": "org.cofax.SqlDataStore",
          "redirectionClass": "org.cofax.SqlRedirection",
          "dataStoreName": "cofax",
          "dataStoreDriver": "com.microsoft.jdbc.sqlserver.SQLServerDriver",
          "dataStoreUrl": "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",
          "dataStoreUser": "sa",
          "dataStorePassword": "dataStoreTestQuery",
          "dataStoreTestQuery": "SET NOCOUNT ON;select test='test';",
          "dataStoreLogFile": "/usr/local/tomcat/logs/datastore.log",
          "dataStoreInitConns": 10,
          "dataStoreMaxConns": 100,
          "dataStoreConnUsageLimit": 100,
          "dataStoreLogLevel": "debug",
          "maxUrlLength": 500
        }
      },
      {
        "servlet-name": "cofaxEmail",
        "servlet-class": "org.cofax.cds.EmailServlet",
        "init-param": {
          "mailHost": "mail1",
          "mailHostOverride": "mail2"
        }
      },
      {
        "servlet-name": "cofaxAdmin",
        "servlet-class": "org.cofax.cds.AdminServlet"
      },
      {
        "servlet-name": "fileServlet",
        "servlet-class": "org.cofax.cds.FileServlet"
      },
      {
        "servlet-name": "cofaxTools",
        "servlet-class": "org.cofax.cms.CofaxToolsServlet",
        "init-param": {
          "templatePath": "toolstemplates/",
          "log": 1,
          "logLocation": "/usr/local/tomcat/logs/CofaxTools.log",
          "logMaxSize": "",
          "dataLog": 1,
          "dataLogLocation": "/usr/local/tomcat/logs/dataLog.log",
          "dataLogMaxSize": "",
          "removePageCache": "/content/admin/remove?cache=pages&id=",
          "removeTemplateCache": "/content/admin/remove?cache=templates&id=",
          "fileTransferFolder": "/usr/local/tomcat/webapps/content/fileTransferFolder",
          "lookInContext": 1,
          "adminGroupID": 4,
          "betaServer": true
        }
      }
    ],
    "servlet-mapping": {
      "cofaxCDS": "/",
      "cofaxEmail": "/cofaxutil/aemail/*",
      "cofaxAdmin": "/admin/*",
      "fileServlet": "/static/*",
      "cofaxTools": "/tools/*"
    },
    "taglib": {
      "taglib-uri": "cofax.tld",
      "taglib-location": "/WEB-INF/tlds/cofax.tld"
    }
  }
};

let dataJSON4 = {
  "lines": {
    "intensities": [
      [
        "Lorem",
        [
          10,
          20,
          30
        ],
        "Ipsum"
      ],
      [
        1,
        2,
        3,
        {
          "uno": "one",
          "dos": "two",
          "tres": "three"
        }
      ]
    ],
    "points": [
      [
        [
          483.3474497412421,
          287.48116291799363
        ]
      ]
    ]
  }
};


// JSON to Table V1: Credits to https://stackoverflow.com/a/10460119

let table = document.createElement('table');
let tbody = document.createElement('tbody');

function scan(key, val) {
    if (val instanceof Object) { // an array is always an instance of Object
        if (key) {
            tbody.insertAdjacentHTML('beforeend', `
                <tr>
                    <th scope="col" colspan="2">${key}</th>
                </tr>
            `);
        }
        if (val instanceof Array) { // but an object is not always an instance of Array
            val.forEach( (element, index) => {
                scan(`${key}[${index}]`, element);
            });
        } else {
            for (let k in val){
//                console.log(k);
                if (val.hasOwnProperty(k)){ // returns boolean indicating whether property belongs to object or not (it could be inherited, like toString or hasOwnProperty)
                    scan(k, val[k]); //recursive call to scan property
                }                
            }
        }
    } else { // val is not an instance of Object so val here is a value
        console.log(key + ':\t' + val);
        tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <th col="row">${key}</th>
                <td>${val}</td>
            </tr>
        `);
    };
};

//scan('', dataJSON1);

//table.appendChild(tbody);
//document.body.appendChild(table);



// JSON to Table V2: All credits to http://json2table.com/

function buildTable(obj) {
    let table = document.createElement('table'), row, cell;
    if (Array.isArray(obj)) {
        return buildArray(obj);
    }
    let i = 0;
    for (let k in obj) {
        row = table.insertRow(); // insertRow(-1) appends row as last one (if index is omitted it defaults to -1)
        cell = row.insertCell(); // insertCell() inserts a td cell (not th) directly into the row
        if ( Array.isArray(obj[k]) ) { // si variable es array
            cell.colSpan = 2;
//            cell.innerHTML = `<div class="td_head">${encodeText(k)}</div><table>${buildArray( obj[k] ).innerHTML}</table>`;
            cell.innerHTML = `<div class="td_head">${k}</div><table>${buildArray( obj[k] ).innerHTML}</table>`;
        } else if (typeof obj[k] === 'object') { // si variable es objeto (pero no array)
            cell.colSpan = 2;
//            cell.innerHTML = `<div class="td_head">${encodeText(k)}</div><table>${buildTable( obj[k] ).innerHTML}</table>`;
            cell.innerHTML = `<div class="td_head">${k}</div><table>${buildTable( obj[k] ).innerHTML}</table>`;
        } else { // si variable es literal
            
//            cell.textContent = encodeText(k);
//            cell.classList.add('td_head');
//            cell = row.insertCell();
            
            cell.textContent = obj[k];
            cell.classList.add((i % 2 === 0) ? "td_row_even" : "td_row_odd");
            cell.insertAdjacentHTML('beforebegin', `<th scope="row">${k}</th>`);
        }
        i++;
    }
    return table;
}

function buildArray(arr) {
    let table = document.createElement('table'), row, cell, td_class,
        keys = {},
        key = '',
        a = false, 
        b = false, 
        c = -1, 
        d = 0;

    if (arr.length === 0) { // controla caso de array vacío
        return '<div></div>';
    }
    
    row = table.insertRow();
    
    // 1ª iteración: gestión de elementos array (recursión) y construcción de objeto keys
    for (let i = 0; i < arr.length; i++) {
        if ( Array.isArray(arr[i]) ) { // si variable es array
            cell = row.insertCell(c);
            cell.colSpan = 2;
            cell.innerHTML = `<table>${buildArray(arr[i]).innerHTML}</table>`;
            a = true;
        } else if (typeof arr[i] === 'object') { // si variable es objeto (pero no array)
            /*
                Por cada elemento del array que sea un objeto, se itera sobre sus propiedades y se guardan estas en un objeto (keys)
                (propiedad se almacena en una variable aparte key precedida de guión para separarla de variable iteradora).
                Cada propiedad del objeto keys lleva asociado un valor (d) que representa el índice que ocupará en la futura fila.
                La condición 'key in keys' es falsa si la propiedad k no se ha añadido todavía al objeto keys (en cuyo caso se ejecuta el código
                de la derecha del operador OR lógico) y verdadera en caso contrario. De esta meanera, al llegar al final de la iteración sobre
                el array tendremos un objeto con todas y cada una de las propiedades de todos los elementos objeto del array, sin contar duplicados 
                (lo normal sería que en un array de objetos, todos ellos tuviesen las mismas propiedades, pero podría no ser así).
            */
            for (let k in arr[i]) { 
                key = "-" + k;
//                key in keys || ( c++, keys[key] = c, cell = row.insertCell(c), cell.innerHTML = `<div class='td_head'>${encodeText(k)}</div>`, a = true );
                key in keys || ( c++, keys[key] = c, row.insertAdjacentHTML('beforeend', `<th scope="col">${k}</th>`), a = true );
            }
//            console.log(keys);
        } else { // si variable es literal
            /*
                El bloque de código a derecha del operador OR lógico solo se ejecuta si b es false, 
                como mucho una vez en iteración aunque haya más de una propiedad, porque b pasa a ser true.
                Al ejecutarse se establece propiedad '.empty' a objeto keys que guarda el valor actual de c.
            */
            b || ( c++, keys.empty = c, cell = row.insertCell(c), b = true );
//            b || ( c++, keys.empty = c, cell = row.insertCell(c), cell.innerHTML = '<div class="td_head">&nbsp;</div>', b = true );
        }
    }
    
    a || table.deleteRow(0); // borra fila creada anteriormente (row) solo si variable a es false (si ningún elemento de array es objeto o array)
    /*
        Variable d representa el número de propiedades del objeto keys: puede ser 0 si todos los elementos del array 
        son array (no se llega a inicializar keys), 1 si no hay ningún elemento objeto o array en el array 
        (en concordancia con única propiedad '.empty') o igual al número total de propiedades de todos los elementos
        objeto del array (sin repetir) más propiedad '.empty' si hay algún elemento simple
    */
    d = c + 1;
    
    // 2ª iteración: generación de filas y celdas, conocida ya la estructura de los elementos del array
    for (let i = 0; i < arr.length; i++) {
        td_class = (i % 2 === 0) ? "td_row_even" : "td_row_odd";
        if ( Array.isArray(arr[i]) ) { // si variable es array
            
            /*
                En este bloque se puede llevar a cabo la gestión particular de elementos del array que a su vez son array,
                pero es preferible dejarlo en blanco porque esos casos ya se resuelven con la recursión inicial, 
                dividiedo cada array en sus elementos hasta llegar a una estructura indivisible (objeto o clave).
                Por lo tanto, si se vuelve a aplicar aquí recursión a los elementos array, se estaría duplicando la información.
                Se usa como ejemplo el objeto dataJSON4 que contiene arrays anidados y se comprueba cómo
                luce la tabla resultante (estas estructuras son poco comunes)
            */
           
//            for (let j = 0; j < d; j++) {
//                cell = row.insertCell(j);
//                cell.className = td_class;
//                if (j === keys.empty) {
//                    cell.innerHTML = `<div class="${td_class}"><table>${buildArray(arr[i]).innerHTML}</table></div>`;
//                }
//            }
            
        } else if (typeof arr[i] === 'object') { // si variable es objeto (pero no array)
            row = table.insertRow();
            for (let j = 0; j < d; j++) { // itera desde 0 hasta (d - 1) (número de propiedades de objeto keys)
                cell = row.insertCell(j);
                /*
                    "classList", allow to add or remove a class without affecting any others the element may have. 
                    "className" will wipe out any existing classes while adding the new one (an empty string assignment will wipe out all of them).
                */
                cell.className = td_class;
                cell.innerHTML = `<div class="${td_class}">&nbsp;</div>`;
            }
            let obj, index;
            for (k in arr[i]) { // itera por cada propiedad de objeto actual (propiedades de arr[i] están todas en objeto keys, aunque este puede contener otras más)
                obj = arr[i];
                key = "-" + k;
                index = keys[key]; // índice de celda en fila
                cell = row.cells[index]; // recoge celda de row correspondiente a índice actual
                cell.className = td_class;
                if ( Array.isArray(obj[k]) ) {
                    cell.innerHTML = `<table>${buildArray(obj[k]).innerHTML}</table>`;
                } else if (typeof obj[k] === 'object') {
                    cell.innerHTML = `<table>${buildTable(obj[k]).innerHTML}</table>`;
                } else {
//                    cell.innerHTML = `<div class="${td_class}">${encodeText(obj[k])}</div>`;
                    cell.innerHTML = `<div class="${td_class}">${obj[k]}</div>`;
                }
            }
        } else { // si variable es literal
            row = table.insertRow();
            for (let j = 0, c = keys.empty; j < d; j++) {
                cell = row.insertCell(j);
                cell.className = td_class;
                if (j === keys.empty) {
//                    cell.innerHTML = `<div class="${td_class}">${encodeText(arr[i])}</div>`;
                    cell.innerHTML = `<div class="${td_class}">${arr[i]}</div>`;
                }
            }
        }
    }
    
    return table;
}


/*
    Esta función se invoca en el código fuente de http://json2table.com/ cade vez que se establece 
    contenido a una celda: recibe el nodo de texto como parámetro, lo inserta como contenido de 
    un div creado ad hoc y retorna el HTML interno de dicho div (en definitiva, retorna el mismo
    parámetro de entrada). Se supone que esta operación sirve para codificar o formatear (encode)
    texto, pero no tengo muy claro cómo y por qué.
*/
function encodeText(textNode) {
    let div = document.createElement('div');
    div.textContent = textNode;
    return div.innerHTML;
    
//    return $("<div />").text(a).html(); // código análogo a bloque anterior usando jQuery (crea elemento div, establece contenido y recoge código HTML interno)

    /*
        NOTE: $('<div></div>') or $("<div />") (same code) will 'create' a div element 
        (or more specifically a DIV DOM element) but won't add it to the HTML document.
    */
}

document.body.appendChild( buildTable(dataJSON1) );
document.body.appendChild( buildTable(dataJSON2) );
document.body.appendChild( buildTable(dataJSON3) );
document.body.appendChild( buildTable(dataJSON4) );
