// Source: https://repl.it/@NeedsAUsername/CharmingFaroffDeveloper

let testDiv = document.createElement('div');
document.body.appendChild(testDiv);

function createAndAppend(numberOfLoops) {
    for (i = 0; i < numberOfLoops; i++) {
        let newElement = document.createElement('p');
        newElement.textContent = 'New Element Number: ' + i;
        testDiv.appendChild(newElement);
    }
}

function loopWithInnerHTML(numberOfLoops) {
    let newElements = '';
    for (i = 0; i < numberOfLoops; i++) {
        newElements += `<p>New Element Number: ${i}</p>`;
    }
    testDiv.innerHTML = +newElements;
}

function testTimeToRunCreateAndAppend(numberOfLoops) {
    let startTime = window.performance.now();
    createAndAppend(numberOfLoops);
    return window.performance.now() - startTime;
}


function testTimeToRunInnerHTML(numberOfLoops) {
    let startTime = window.performance.now();
    loopWithInnerHTML(numberOfLoops);
    return window.performance.now() - startTime;
}


function test(numberOfLoops, numberOfTests) {
    let createAndAppendTimeTotal = 0;
    let innerHTMLTimeTotal = 0;
    for (let i = 0; i < numberOfTests; i++) {
        createAndAppendTimeTotal += testTimeToRunCreateAndAppend(numberOfLoops);
        innerHTMLTimeTotal += testTimeToRunInnerHTML(numberOfLoops);
    }
    let averageCreateAndAppendTime = createAndAppendTimeTotal / numberOfTests;
    let averageInnerHTMLTime = innerHTMLTimeTotal / numberOfTests;
    let winner = averageCreateAndAppendTime > averageInnerHTMLTime ? 'Inner HTML' : 'Create and append';
    console.log('create and append average time: ', averageCreateAndAppendTime, 'seconds');
    console.log('inner HTML average time: ', averageInnerHTMLTime, 'seconds');
    console.log('winner: ', winner);
}


test(1, 100);   // A
test(5, 100);   // B
test(50, 100);  // C