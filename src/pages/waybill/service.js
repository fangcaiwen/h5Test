import httpCache from '@/static/httpCache/waybill.json';



    export default {

        getTopData($p, $success, $progress) {

            let success = () => {

                $success( httpCache.topData[ $p.identity ] );
                $progress(1);

            };

            $progress(0);
            window.setTimeout(success, 500);

        },

        getHistoryData($p, $success, $progress) {

            let success = () => {

                if ( $p.identity === 1 ) {

                    let a = ([]).concat( httpCache.topData[2] ).concat( httpCache.topData[3] ).concat( httpCache.historyData );

                    $success(

                        // data
                        a.slice( $p.index, $p.index + $p.size ),

                        // more
                        a[ $p.index, $p.index + $p.size ] ? 'more' : 'no-more'
                    );

                }

                else
                    $success(

                        // data
                        httpCache.historyData.slice( $p.index, $p.index + $p.size ),

                        // more
                        httpCache.historyData[ $p.index + $p.size ] ? 'more' : 'no-more'
                    );

                $progress(1);

            };

            $progress(0);
            window.setTimeout(success, 500);

        }

    }
