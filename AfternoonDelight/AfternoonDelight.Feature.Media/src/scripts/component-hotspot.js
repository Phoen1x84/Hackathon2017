(($) => {
    let _eventListeners = () => {
        $('.hotspots__image').on('click', (e) => {
            let $this = $(e.target);
            if ($this.hasClass('hotspot')) {
                console.log('hotspot clicked');
            } else {
                let offset = $this.offset();

                let x = e.pageX - offset.left;
                let y = e.pageY - offset.top;

                let imageHeight = $this.height();
                let imageWidth = $this.width();

                let yPercentage = y / imageHeight * 100;
                let xPercentage = x / imageWidth * 100;

                $('.hotspots__image').append('<span class="hotspot" style="top: ' + yPercentage + '%; left: ' + xPercentage + '%; "></span>');
            }
        });
    };

    let _activateHotspots = () => {
        $('.hotspots-controls__link').on('click', () => {
            _eventListeners();
        });
    };

    let _expandItem = () => {

    };

    let init = () => {
        let selectors = {
            root: '.hotspots',
        };

        if ($(selectors.root).length) {
            _activateHotspots();
        }
    };

    init();

})(jQuery);
