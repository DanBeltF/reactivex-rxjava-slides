// Add event listener to reveal.js slide changes
Reveal.addEventListener('slidechanged', function(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
});

// Add event listener to reveal.js fragments
Reveal.addEventListener('fragmentshown', function(event) {
    // event.fragment = the fragment DOM element
});

function runCode(element) {
    var container = $(element).closest('section');
    var codeToExecute = $(container.find('.code').get(0)).text();
    var outputContainer = $(container.find('.output').get(0));

    outputContainer.text('');

    console.log('runCode', codeToExecute);

    try {
        var transpiled = Babel.transform(codeToExecute, { presets: ['es2015'] });

        eval(transpiled.code);
    } catch (error) {
        print('Error: ' + error);
    }

    function print(value) {
        console.log('print', value);
        outputContainer.append(value + "\n");
    }
}

function searchWikipedia(term) {
    console.log('searchWikipedia', term);

    var promise = $.ajax({
        url: 'http://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'opensearch',
            format: 'json',
            search: encodeURI(term)
        }
    }).promise();

    return Rx.Observable.fromPromise(promise);
}
