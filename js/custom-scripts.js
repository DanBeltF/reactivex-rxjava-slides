// Add event listener to reveal.js slide changes
Reveal.addEventListener('slidechanged', function(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv

    var iframeId = $(event.currentSlide).attr('data-remove-iframe');
    if (iframeId) {
        $('#' + iframeId).remove();
    }
});

// Add event listener to reveal.js fragments
Reveal.addEventListener('fragmentshown', function(event) {
    // event.fragment = the fragment DOM element

    var iframeId = $(event.fragment).attr('data-add-iframe');
    if (iframeId) {
        $('<iframe />', {
            name: iframeId,
            id:   iframeId,
            frameborder: 0,
            src:  'http://cvuorinen.github.io/reactive-life/app/#?pattern=Acorn&color2=hotpink&interval=600&autostart&noGrid&embedded'
        }).appendTo('.reveal');
    }
});

function runCode(element) {
    var container = $(element).closest('section');
    var codeToExecute = $(container.find('.code').get(0)).text();
    var outputContainer = $(container.find('.output').get(0));
    
    outputContainer.text('');
    
    console.log('runCode', codeToExecute);
    
    try {
        eval(codeToExecute);
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