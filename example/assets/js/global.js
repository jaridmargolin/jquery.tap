(function($) {
    'use strict';

    $(document).ready(function() {

        var $touchInner = $('.touch-inner');

        $('.touch-area')
            .on('tap', function(e) {
                console.log('tap event', e);
                var type = e.originalEvent.type.indexOf('touch') === 0 ? 'touch' : 'mouse';

                $touchInner.prepend("Tap {\n    x: " + e.pageX + ",\n    y: " + e.pageY + "\n    e: " + type + "\n};\n");
            })
            .on('tap', '.js-prevent-default', function(e) {
                e.preventDefault();
            });

    });

}(jQuery));