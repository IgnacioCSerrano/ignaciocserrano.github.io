document.querySelector('div').addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'span') {
        /*
            nextSibling would return text (carriage return + line feed ↵) because whitespace between two elements is also a node
                https://stackoverflow.com/questions/30001482/previoussibling-and-nextsibling-returns-text/30001502
        */
        let parrafo = e.target.closest('h1').nextElementSibling;
        document.querySelectorAll('section > p').forEach(p => {
            if (p !== parrafo) {
                p.classList.remove('abierto');
            }
        });
        parrafo.classList.toggle('abierto');
    }
});