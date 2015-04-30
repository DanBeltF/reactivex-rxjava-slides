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

    // Type text into fragment element
    var iframeId = $(event.fragment).attr('data-add-iframe');
    if (iframeId) {
        $('<iframe />', {
            name: iframeId,
            id:   iframeId,
            frameborder: 0,
            src:  'http://localhost/reactive-life/app/#?pattern=Acorn&color2=hotpink&interval=600&autostart&noGrid&embedded'
        }).appendTo('.reveal');
    }

    // Apply class to current slide (section tag)
    var sectionClass = $(event.fragment).attr('data-section-class');
    if (sectionClass) {
        $(event.fragment).parent().addClass(sectionClass);
    }
});
