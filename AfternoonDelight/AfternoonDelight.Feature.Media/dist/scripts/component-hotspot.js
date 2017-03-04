'use strict';

(function ($) {
    var selectors = {
        root: '.hotspot-image',
        imageContainer: '.hotspot-image__image',
        hotspot: 'hotspot-image__hotspot',
        hotspotInformation: 'TODO',
        scPageEditor: '.on-page-editor',
        scChromeElement: '.scEnabledChrome'
    };

    var _eventListeners = function _eventListeners() {
        $(selectors.imageContainer + ' ' + scChromeElement).on('click', function (e) {
            debugger;
            e.preventDefault();
            var $this = $(e.target);
            if ($this.hasClass(selectors.hotspot)) {
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

                _sendRequest(xPos, yPos);
            }
        });
    };

    var _sendRequest = function _sendRequest(x, y) {

        var apiUrl = '//afternoondelight/customapi/HotspotImage/SaveHotspotCoordintes';

        var config = $(selectors.root).data();

        return $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                'HotspotImageId': config.hotspotImageId,
                'XLocation': x,
                'YLocation': y,
                'DatabaseName': config.databaseName
            },
            success: function success(data) {
                _addHotspot(x, y);
            },
            error: function error(data) {
                throw Error('Unable to POST event to the service');
            }
        });
    };

    var _addHotspot = function _addHotspot(x, y) {
        // this will be done after confirmation from sitecore that item is created
        $('.js-hotspots').append('<span class="' + selectors.hotspot + '" style="top: ' + y + '%; left: ' + x + '%; "></span>');
    };

    var _activateHotspots = function _activateHotspots() {
        $('.hotspots-controls__activate').on('click', function (e) {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspots-controls__deactivate').show();
            _eventListeners();
        });
    };

    var _deactivateHostpots = function _deactivateHostpots() {
        $('.hotspots-controls__deactivate').on('click', function (e) {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspots-controls__activate').show();
            $(selectors.imageContainer).off('click');
        });
    };

    // show hide content item
    var toggleContentForHotspot = function toggleContentForHotspot($hotspotWidget, $hotspot) {
        var hotspotID = $hotspot.attr('data-hotspot-id');
        var $hotspotInformationItems = $hotspotWidget.find(selectors.hotspotInformation);
        var $selectedHotspotContent = $hotspotInformationItems.filter('[data-hotspot-id=' + hotspotID + ']');

        // if already active
        if ($hotspot.hasClass(classes.activeHotspot)) {
            $hotspot.removeClass(classes.activeHotspot);
            $selectedHotspotContent.slideUp().attr('aria-hidden', true);
        } else {
            closeHotspotContent($hotspotWidget);
            $hotspot.addClass(classes.activeHotspot);
            $selectedHotspotContent.slideDown().attr('aria-hidden', false);
        }
    };

    var closeHotspotContent = function closeHotspotContent($hotspotWidget) {
        var $hotspotInformationItems = $hotspotWidget.find(selectors.hotspotInformation);
        $hotspotWidget.find(selectors.hotspot).removeClass(classes.activeHotspot);
        $hotspotInformationItems.slideUp().attr('aria-hidden', true);
    };

    var init = function init() {
        if ($(selectors.root).length && $(selectors.scPageEditor).length) {
            _activateHotspots();
            _deactivateHostpots();
        }
    };

    init();
})(jQuery);