document.getElementById("tarjetas").addEventListener('click', e => {
    /*
        closest() method traverses the element and its parents, heading toward the document root until 
        it finds a node that matches the provided selector string (returns null if no such element exists)
    */
    let tarjeta = e.target.closest(".tarjeta");
    if (e.target.classList.contains("fa-edit")) {
        e.target.classList.toggle("activo");
        let descripcion = tarjeta.querySelector(".descripcion");
        let precio = tarjeta.querySelector(".precio");
        /*
            es más seguro evaluar la condición de existencia de clase activo para activación o desactivación de edición en los elementos
            porque ello evita desfase que se produciría si alguno de dichos elementos mostrase atributo contenteditable="true" en el HTML
         */
        descripcion.contentEditable = e.target.classList.contains("activo");
//        descripcion.contentEditable = !descripcion.isContentEditable;
        precio.contentEditable = e.target.classList.contains("activo");
//        precio.contentEditable = !precio.isContentEditable;
        descripcion.focus();
    } else if (e.target.classList.contains("fa-trash-alt")) {
        if (confirm("¿Está seguro de que desea eliminar Hospedería '" + tarjeta.querySelector("h4 > a").textContent + "'?")) {
            tarjeta.remove();
        }
    }
});
