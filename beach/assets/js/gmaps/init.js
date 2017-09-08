(function ($) {
    "use strict";

    /* ============================================= */
    /* ==== GOOGLE MAP ==== */

    function initmap() {
        if (($(".ct-js-googleMap").length > 0) && (typeof google === 'object' && typeof google.maps === 'object')) {
            $('.ct-js-googleMap').each(function () {
                var atcenter = "";
                var $this = $(this);
                var location = $this.data("location");
                var zoom = $this.data("zoom");

                var offset = -30;

                if (validatedata($this.data("offset"))) {
                    offset = $this.data("offset");
                }

                var $drag = true;

                if(device.mobile() || device.tablet() || ($devicewidth < 768)){
                    $drag = false;
                }

                if (validatedata(location)) {
                    $this.gmap3({
                        marker: {
                            //latLng: [40.616439, -74.035540],
                            address: location,
                            options: {
                                visible: false
                            },
                            callback: function (marker) {
                                atcenter = marker.getPosition();
                            }
                        }, map: {
                            options: {
                                //maxZoom:11,
                                zoom: zoom,
                                mapTypeId: google.maps.MapTypeId.TERRAIN, // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                                scrollwheel: false,
                                disableDoubleClickZoom: false,
                                draggable: $drag, //disableDefaultUI: true,
                                mapTypeControlOptions: {
                                    //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                                    //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                    //position: google.maps.ControlPosition.RIGHT_CENTER
                                    mapTypeIds: []
                                }
                            }, events: {
                                idle: function () {
                                    if (!$this.data('idle')) {
                                        $this.gmap3('get').panBy(0, offset);
                                        $this.data('idle', true);
                                    }
                                }
                            }
                        },
                        overlay:{
                            address:location,
                            options:{
                                content:
                                "<div class='ct-googleMaps-infoBox'> \
                                    <div class='media'>\
                                        <div class='media-left'>\
                                            <a href='#'>\
                                                <img class='media-object' width='95' src='./assets/images/villa.jpg' alt='Google Map Result'>\
                                            </a>\
                                        </div>\
                                        <div class='media-body'>\
                                            <h4 class='media-heading'>Villa Mimosa</h4>\
                                            <address>\
                                                Chaussée de Mimosa 57 <br>\
                                                83550 Vidauban, <br>\
                                                France\
                                            </address>\
                                            <ul class='list-unstyled'>\
                                                <li><i class='fa fa-fw fa-phone'></i> Tel: +32 475 68 13 98</li>\
                                                <li><i class='fa fa-fw fa-envelope'></i> Mail: x@y.be</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>",
                                offset:{
                                    y:-220,
                                    x:-178
                                }
                            }
                        }
                        //},"autofit"
                    });

                    // center on resize
                    google.maps.event.addDomListener(window, "resize", function () {
                        //var userLocation = new google.maps.LatLng(53.8018,-1.553);
                        setTimeout(function () {
                            $this.gmap3('get').setCenter(atcenter);
                            $this.gmap3('get').panBy(0, offset);
                        }, 400);

                    });

                    // set height
                    $this.css("min-height", $this.data("height") + "px");
                }

                if ($this.parent().parent().hasClass('hidemap')) {
                    $this.parent().animate({height: '0px'}, 500);
                }

            })
        }

    }

    initmap();
})(jQuery);
