import jsonWaybillLaunch    from '@/static/httpCache/waybill-launch.json';
import jsonLocation         from '@/static/httpCache/location.json';

    const httpCache = Object.assign( jsonWaybillLaunch, { location: jsonLocation } );



    export default {

        getData($p, $success, $progress) {

            let success = () => {

                $progress(1);
                $success(
                    httpCache.transportVehicle,
                    httpCache.disposalEnterprise,
                    httpCache.location[ $p.locationKey ]
                );

            };

            $progress(0);
            window.setTimeout(success, 500);

        },

        getData23($p, $success, $progress) {

            let success = () => {

                for (var d2 = null, a = null, i = 0; a = httpCache.transportEnterprise[i]; i++) {

                    if ( a.vehicle.indexOf($p.vehicle) !== -1 ) { d2 = a; break; }

                }

                for (var d3 = [], a = null, i = 0; a = httpCache.transportDriver[i]; i++) {

                    if ( a.vehicle.indexOf($p.vehicle) !== -1 ) d3.push(a);

                }

                $success(d2, d3);
                $progress(1);

            };

            $progress(0);
            window.setTimeout(success, 0);

        },

        getData7($p, $success, $progress) {

            let success = () => {

                $success( httpCache.location[ $p.locationKey ] );
                $progress(1);

            };

            $progress(0);
            window.setTimeout(success, 0);

        }

    }
