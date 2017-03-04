'use strict';

(function ($) {
    var _eventListeners = function _eventListeners() {
        $('.hotspots__image').on('click', function (e) {
            var $this = $(e.target);
            if ($this.hasClass('hotspot')) {
                console.log('hotspot clicked');
            } else {
                var offset = $this.offset();

                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;

                var imageHeight = $this.height();
                var imageWidth = $this.width();

                var yPercentage = y / imageHeight * 100;
                var xPercentage = x / imageWidth * 100;

                $('.hotspots__image').append('<span class="hotspot" style="top: ' + yPercentage + '%; left: ' + xPercentage + '%; "></span>');
            }
        });
    };

    var _activateHotspots = function _activateHotspots() {
        $('.hotspots-controls__link').on('click', function () {
            _eventListeners();
        });
    };

    var _expandItem = function _expandItem() {};

    var init = function init() {
        var selectors = {
            root: '.hotspots'
        };

        if ($(selectors.root).length) {
            _activateHotspots();
        }
    };

    init();
})(jQuery);