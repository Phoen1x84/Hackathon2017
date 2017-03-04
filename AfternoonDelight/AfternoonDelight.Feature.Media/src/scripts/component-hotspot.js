(($) => {
    let selectors = {
        root: '.hotspot-image',
        imageContainer: '.hotspot-image__image',
    };

    let _eventListeners = () => {
        $(selectors.imageContainer).on('click', (e) => {
            e.preventDefault();
            
            let $this = $(e.target);
            if ($this.hasClass('hotspot')) {
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

                _addHotspot(xPos, yPos);
            }
        });
    };

    let _sendData = () => {

        var apiUrl = '';

        return $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'json',
            data: 'x and y',
            success: function (data) {

            },
            error: function (data) {
                throw Error('Unable to POST event to the service');
            }
        });
    };

    let _addHotspot = (x, y) => {        
        // this will be done after confirmation from sitecore that item is created
        $('.js-hotspots').append('<span class="hotspot-image__hotspot" style="top: ' + y + '%; left: ' + x + '%; "></span>');
    };

    let _activateHotspots = () => {
        $('.hotspots-controls__activate').on('click', (e) => {
            $(e.target).hide();
            $('.hotspots-controls__deactivate').show();
            _eventListeners();
        });
    };

    let _deactivateHostpots = () => {
        $('.hotspots-controls__deactivate').on('click', (e) => {
            
            $(e.target).hide();
            $('.hotspots-controls__activate').show();
            $(selectors.imageContainer).off('click');
        });
    };

    let _toggleHotspotContent = () => {

    };

    let init = () => {
        if ($(selectors.root).length) {
            _activateHotspots();
            _deactivateHostpots();
        }
    };

    init();

})(jQuery);
