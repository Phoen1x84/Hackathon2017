(($) => {
    let selectors = {
        root: '.hotspot-image',
        imageContainer: '.hotspot-image__image',
        hotspot: '.hotspot-image__hotspot',
        hotspotInformation: 'TODO',
        scPageEditor: '.on-page-editor',
        scChromeElement: '.scEnabledChrome'
    };

    let _sendRequest = (x, y, title) => {

        let apiUrl = '//afternoondelight/customapi/HotspotImage/SaveHotspotCoordintes';

        let config = $(selectors.root).data();

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
            success: function (data) {                
                _addHotspot(x, y);
            },
            error: function (data) {
                throw Error('Unable to POST event to the service');
            }
        });
    };

    let _addHotspot = (x, y) => {        
        // this will be done after confirmation from sitecore that item is created
        $('.js-hotspots').append('<span class="'+ selectors.hotspot +'" style="top: ' + y + '%; left: ' + x + '%; "></span>');
    };


    // show hide content item
    let _toggleContentForHotspot = function ($hotspotWidget, $hotspot) {
        let hotspotID = $hotspot.attr('data-hotspot-id');
        let $hotspotInformationItems = $hotspotWidget.find(selectors.hotspotInformation);
        let $selectedHotspotContent = $hotspotInformationItems.filter('[data-hotspot-id=' + hotspotID + ']');

        // if already active
        if ($hotspot.hasClass(classes.activeHotspot)) {
            $hotspot.removeClass(classes.activeHotspot);
            $selectedHotspotContent
                .slideUp()
                .attr('aria-hidden', true);
        } else {
            _closeHotspotContent($hotspotWidget);
            $hotspot.addClass(classes.activeHotspot);
            $selectedHotspotContent
                .slideDown()
                .attr('aria-hidden', false);
        }
    };

    let _closeHotspotContent = function ($hotspotWidget) {
        let $hotspotInformationItems = $hotspotWidget.find(selectors.hotspotInformation);
        $hotspotWidget.find(selectors.hotspot).removeClass(classes.activeHotspot);
        $hotspotInformationItems
            .slideUp()
            .attr('aria-hidden', true);
    };

    let _addAddHotspotEventListeners = () => {
        $(`${selectors.imageContainer} ${scChromeElement}`).on('click', (e) => {
            debugger;
            e.preventDefault();
            let $this = $(e.target);
            if ($this.hasClass(selectors.hotspot)) {
                alert('You cannot add a hotspot to the same location');
            } else {
                let offset = $this.offset();

                let x = e.pageX - offset.left;
                let y = e.pageY - offset.top;

                let imageHeight = $this.height();
                let imageWidth = $this.width();

                let yPos = (y / imageHeight * 100).toFixed(2);
                let xPos = (x / imageWidth * 100).toFixed(2);

                let title = prompt('Title of your hotspot item:');
                _sendRequest(xPos, yPos, title);
            }
        });
    };

    let _addEventListeners = () => {
        if ($('.on-page-editor').length) {
            $(selectors.hotspot).on('click', function () {
                _toggleContentForHotspot($(e.target));
            });
        };

        $('.hotspot-controls__activate').on('click', (e) => {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspot-controls__deactivate').show();
            _addAddHotspotEventListeners();
        });

        $('.hotspot-controls__deactivate').on('click', (e) => {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspot-controls__activate').show();
            //$(selectors.imageContainer).off('click');
            // remove event listeners
            $(`${selectors.imageContainer} ${scChromeElement}`).off('click');
        });
    };

    let _displayInitialState = () => {
        if (!$('.on-page-editor').length) {
            // hide all dots
            // show first dot
            // add active class to first dot
        };
    };

    let init = () => {
        if ($(selectors.root).length && $(selectors.scPageEditor).length) {
            _addEventListeners();
            _displayInitialState();
        }
    };

    init();

})(jQuery);
