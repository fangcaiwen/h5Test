<style>

    .bmap-component {
        flex-shrink: 0;
    }

</style>

<template>
    <view class="bmap-component" :style="{ 'width': width, 'height': height }"></view>
</template>

<script>

    export default {

        props: {

            width: {
                type: String
            },

            height: {
                type: String
            },

            zoom: {
                type: Number
            },

            center: {
                type: Object
            },

            trajectory: {
                // [
                //     {
                //         x: Number,
                //         y: Number
                //     },
                //     ...
                // ]
                type: Array
            }

        },

        watch: {

            'zoom'          : { handler() { this.start().then( this.init ) }, deep: true },
            'center'        : { handler() { this.start().then( this.init ) }, deep: true },
            'trajectory'    : { handler() { this.start().then( this.init ) }, deep: true }

        },

        methods: {

            start() {

                let h = ($resolve, $reject) => {

                    if (!window.BMap) {

                        window.BMapLoad = () => {

                            $resolve(window.BMap);

                        };

                        let el = document.createElement('script');
                        el.setAttribute('type', 'text/javascript');
                        el.setAttribute('src', 'http://api.map.baidu.com/api?v=2.0&ak=LnnCYD6KnSzC63IxlXa4QDa499nF38V4&callback=BMapLoad');
                        document.body.append(el);

                    }

                    else
                        $resolve(window.BMap);

                };

                return new Promise(h);

            },

            init() {

                if ( !this.mapInstance )
                    this.mapInstance = new BMap.Map(this.$el),
                    this.mapInstance.addControl(
                        new BMap.NavigationControl(
                            {
                                type: BMAP_NAVIGATION_CONTROL_ZOOM
                            }
                        )
                    ),
                    this.mapTrajectory = new BMap.DrivingRoute(
                        this.mapInstance,
                        {
                            renderOptions: {
                                map: this.mapInstance,
                                autoViewport: true
                            }
                        }
                    );

                if ( this.center )
                    this.mapInstance.centerAndZoom(
                        new BMap.Point(this.center.x, this.center.y),
                        this.zoom
                    );

                if ( this.trajectory )
                    this.mapTrajectory.search(
                        new BMap.Point(this.trajectory[0].x, this.trajectory[0].y),
                        new BMap.Point(this.trajectory[1].x, this.trajectory[1].y)
                    );

            }

        },

        mounted() {

            this.start().then( this.init );

        },

        data() {

            return {
                mapInstance: null,
                mapTrajectory: null
            };

        }

    }

</script>
