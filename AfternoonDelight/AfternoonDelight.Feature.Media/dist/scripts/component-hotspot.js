'use strict';

(function ($) {
    var selectors = {
        root: '.hotspot-image',
        imageContainer: '.hotspot-image__image',
        hotspot: '.hotspot-image__hotspot',
        hotspotInformation: 'TODO',
        scPageEditor: '.on-page-editor',
        scChromeElement: '.scEnabledChrome'
    };

    var _sendRequest = function _sendRequest(x, y, title) {

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
                'Title': title,
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

    // show hide content item
    var _toggleContentForHotspot = function _toggleContentForHotspot($hotspotWidget, $hotspot) {
        var hotspotID = $hotspot.attr('data-hotspot-id');
        var $hotspotInformationItems = $hotspotWidget.find(selectors.hotspotInformation);
        var $selectedHotspotContent = $hotspotInformationItems.filter('[data-hotspot-id=' + hotspotID + ']');

        // if already active
        if ($hotspot.hasClass(classes.activeHotspot)) {
            $hotspot.removeClass(classes.activeHotspot);
            $selectedHotspotContent.slideUp().attr('aria-hidden', true);
        } else {
            _closeHotspotContent($hotspotWidget);
            $hotspot.addClass(classes.activeHotspot);
            $selectedHotspotContent.slideDown().attr('aria-hidden', false);
        }
    };

    var _closeHotspotContent = function _closeHotspotContent($hotspotWidget) {
        var $hotspotInformationItems = $hotspotWidget.find(selectors.hotspotInformation);
        $hotspotWidget.find(selectors.hotspot).removeClass(classes.activeHotspot);
        $hotspotInformationItems.slideUp().attr('aria-hidden', true);
    };

    var _addAddHotspotEventListeners = function _addAddHotspotEventListeners() {
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

                var title = prompt('Title of your hotspot item:');
                _sendRequest(xPos, yPos, title);
            }
        });
    };

    var _addEventListeners = function _addEventListeners() {
        if ($('.on-page-editor').length) {
            $(selectors.hotspot).on('click', function () {
                _toggleContentForHotspot($(e.target));
            });
        };

        $('.hotspot-controls__activate').on('click', function (e) {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspot-controls__deactivate').show();
            _addAddHotspotEventListeners();
        });

        $('.hotspot-controls__deactivate').on('click', function (e) {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspot-controls__activate').show();
            //$(selectors.imageContainer).off('click');
            // remove event listeners
            $(selectors.imageContainer + ' ' + scChromeElement).off('click');
        });
    };

    var _displayInitialState = function _displayInitialState() {
        if (!$('.on-page-editor').length) {
            // hide all dots
            // show first dot
            // add active class to first dot
        };
    };

    var init = function init() {
        if ($(selectors.root).length && $(selectors.scPageEditor).length) {
            _addEventListeners();
            _displayInitialState();
        }
    };

    init();
})(jQuery);