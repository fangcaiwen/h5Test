import jsonWaybill      from '@/static/httpCache/waybill.json';
import jsonLocation     from '@/static/httpCache/location.json';

    const httpCache = Object.assign( jsonWaybill, { location: jsonLocation } );



    export default {

        getData($p, $success, $progress) {

            let success = () => {

                $success( httpCache.dataDetail[ $p.id ].data );
                $progress(1);

            };

            $progress(0);
            window.setTimeout(success, 500);

        },

        getBMap($p, $success, $progress) {

            let success = () => {

                $progress(1);
                $success(
                    {
                        zoom: 12,
                        center: {
                            x: 120.468221,
                            y: 36.171583
                        },
                        trajectory: [
                            {
                                x: httpCache.location[ $p.locationKey[0] ].lngAndLat[0],
                                y: httpCache.location[ $p.locationKey[0] ].lngAndLat[1]
                            },
                            {
                                x: httpCache.location[ $p.locationKey[1] ].lngAndLat[0],
                                y: httpCache.location[ $p.locationKey[1] ].lngAndLat[1]
                            }
                        ]
                    }
                );

            };

            $progress(0);
            window.setTimeout(success, 0);

        }

    }
