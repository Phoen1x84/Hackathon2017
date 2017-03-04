'use strict';

(function ($) {
    var selectors = {
        root: '.hotspot-image',
        imageContainer: '.hotspot-image__image'
    };

    var _eventListeners = function _eventListeners() {
        $(selectors.imageContainer).on('click', function (e) {
            e.preventDefault();

            var $this = $(e.target);
            if ($this.hasClass('hotspot')) {
                alert('You cannot add a hotspot to the same location');
            } else {
                var offset = $this.offset();

                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;

                var imageHeight = $this.height();
                var imageWidth = $this.width();

                var yPos = (y / imageHeight * 100).toFixed(2);
                var xPos = (x / imageWidth * 100).toFixed(2);

                // send api call providing x and y positions

                // prompt to confirm if user would like to place hotspot

                // get data back from sitecore with item guid

                _addHotspot(xPos, yPos);
            }
        });
    };

    var _sendData = function _sendData() {

        var apiUrl = '';

        return $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'json',
            data: 'x and y',
            success: function success(data) {},
            error: function error(data) {
                throw Error('Unable to POST event to the service');
            }
        });
    };

    var _addHotspot = function _addHotspot(x, y) {
        // this will be done after confirmation from sitecore that item is created
        $('.js-hotspots').append('<span class="hotspot-image__hotspot" style="top: ' + y + '%; left: ' + x + '%; "></span>');
    };

    var _activateHotspots = function _activateHotspots() {
        $('.hotspots-controls__activate').on('click', function (e) {
            $(e.target).hide();
            $('.hotspots-controls__deactivate').show();
            _eventListeners();
        });
    };

    var _deactivateHostpots = function _deactivateHostpots() {
        $('.hotspots-controls__deactivate').on('click', function (e) {

            $(e.target).hide();
            $('.hotspots-controls__activate').show();
            $(selectors.imageContainer).off('click');
        });
    };

    var _toggleHotspotContent = function _toggleHotspotContent() {};

    var init = function init() {
        if ($(selectors.root).length) {
            _activateHotspots();
            _deactivateHostpots();
        }
    };

    init();
})(jQuery);