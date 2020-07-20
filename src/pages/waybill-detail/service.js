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

        },

        getStatus($p, $success, $progress) {

            let success = () => {

                $progress(1);
                $success(
                    Number( httpCache.dataDetail[ $p.id ].status.value ),
                    formatDate( httpCache.dataDetail[ $p.id ].status.time[0] ),
                    formatDate( httpCache.dataDetail[ $p.id ].status.time[1] )
                );

            };

            let formatDate = ($d) => {

                if ($d) {

                    let d = new Date(
                        Number( ($d = $d.split(/[^\d]/) ) [0] ),
                        Number( $d[1] ) - 1,
                        Number( $d[2] ),
                        Number( $d[3] ),
                        Number( $d[4] )
                    );

                    return d.toSmartDate();

                }

            };

            $progress(0);
            window.setTimeout(success, 0);

        }

    }
