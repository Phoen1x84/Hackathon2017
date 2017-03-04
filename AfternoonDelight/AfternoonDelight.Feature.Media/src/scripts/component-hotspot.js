(($) => {
    let selectors = {
        root: '.hotspot-image',
        imageContainer: '.hotspot-image__image',
        hotspot: 'hotspot-image__hotspot',
        hotspotInformation: 'TODO',
        scPageEditor: '.on-page-editor',
        scChromeElement: '.scEnabledChrome'
    };

    let _eventListeners = () => {        
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

                // send api call providing x and y positions

                // prompt to confirm if user would like to place hotspot

                // get data back from sitecore with item guid

                _sendRequest(xPos, yPos);
            }
        });
    };

    let _sendRequest = (x, y) => {

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

    let _activateHotspots = () => {
        $('.hotspots-controls__activate').on('click', (e) => {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspots-controls__deactivate').show();
            _eventListeners();
        });
    };

    let _deactivateHostpots = () => {
        $('.hotspots-controls__deactivate').on('click', (e) => {
            e.preventDefault();
            $(e.target).hide();
            $('.hotspots-controls__activate').show();
            $(selectors.imageContainer).off('click');
        });
    };

    // show hide content item
    let toggleContentForHotspot = function ($hotspotWidget, $hotspot) {
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
            closeHotspotContent($hotspotWidget);
            $hotspot.addClass(classes.activeHotspot);
            $selectedHotspotContent
                .slideDown()
                .attr('aria-hidden', false);
        }
    };

    var closeHotspotContent = function ($hotspotWidget) {
        let $hotspotInformationItems = $hotspotWidget.find(selectors.hotspotInformation);
        $hotspotWidget.find(selectors.hotspot).removeClass(classes.activeHotspot);
        $hotspotInformationItems
            .slideUp()
            .attr('aria-hidden', true);
    };

    let init = () => {
        if ($(selectors.root).length && $(selectors.scPageEditor).length) {
            _activateHotspots();
            _deactivateHostpots();
        }
    };

    init();

})(jQuery);
