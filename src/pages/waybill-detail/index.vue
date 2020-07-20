<style>

    .cl-form {
        overflow-y: auto;
        flex-grow: 1;
        padding: 10px 5vw;
    }

    .cl-form .at__multiline-text > text {
        display: block;
    }

    .uni-steps /deep/ .uni-steps__row-desc {
        line-height: 12px;
    }



    /**
     * 底部
     */

    .bottom-bar {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background-color: #FFFFFF;
    }

    .bottom-bar:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: .5px;
        background-color: rgba(0, 0, 0, .33);
    }

</style>

<template>
	<view>

        <!-- 导航条、地图、状态进度 -->
        <cl-topbar title="电子联单详情">
        </cl-topbar>

        <bmap v-bind="bMap">
        </bmap>

        <!-- 表单 -->
        <cl-form label-width="120px">
            <cl-loading-mask :loading=" progress.data !== 1 ">

                <cl-form-item label="源头企业：">
                    {{ data[0].value }}
                </cl-form-item>

                <cl-form-item label="工地位置：">
                    {{ data[6].value }}
                </cl-form-item>

                <cl-form-item label="运输车辆：">
                    {{ data[1].value }}
                </cl-form-item>

                <cl-form-item label="运输单位：">
                    {{ data[2].value }}
                </cl-form-item>

                <cl-form-item label="运输司机：">
                    <view class="at__multiline-text">

                        <text>
                            {{ data[3].value.name }}
                        </text>

                        <text>
                            工作证：{{ data[3].value.id }}
                        </text>

                        <text>
                            手机号：{{ data[3].value.phone }}
                        </text>
                    </view>
                </cl-form-item>

                <cl-form-item label="处置企业：">
                    {{ data[4].value }}
                </cl-form-item>

                <cl-form-item label="处置企业地址：">
                    {{ data[7].value }}
                </cl-form-item>

                <cl-form-item label="废弃物类别：">
                    {{ data[5].value }}
                </cl-form-item>

                <cl-form-item>

                    <photo v-model="data[8].value[0]" size="50%" description-text="运输介质照片" readonly>
                    </photo>

                    <photo v-model="data[8].value[1]" size="50%" description-text="车尾放大照片" readonly>
                    </photo>
                </cl-form-item>
            </cl-loading-mask>
        </cl-form>

        <!-- 底部 -->
        <view class="bottom-bar">
            <uni-steps :active="status.active" :options="status.data">
            </uni-steps>
        </view>
    </view>
</template>

<script>

    import bmap from '@/components/bmap';
    import photo from '@/components/photo';
    import Service from './service';



	export default {

        components: {
            bmap,
            photo
        },

        computed: {

            q() {

                for (var q = {}, r = /([^#?&=]+)=([^&]+)/g, urlHash = window.location.hash; r.test(urlHash);) {

                    q[ RegExp.$1 ] = decodeURIComponent( RegExp.$2 );

                }

                return q;

            }

        },

        methods: {

            initData($next) {

                let success = ($data) => {

                    this.data = $data;

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    this.progress.data = $p;

                };

                Service.getData( { id: this.q.id }, success, progress);

            },

            initBMap($next) {

                let success = ($data) => {

                    this.bMap.zoom = $data.zoom;
                    this.bMap.center = $data.center;
                    this.bMap.trajectory = $data.trajectory;

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    this.progress.bMap = $p;

                };

                Service.getBMap( { locationKey: [ this.data[6].locationKey, this.data[7].locationKey ] }, success, progress);

            },

            initStatus($next) {

                let success = ($active, $t1, $t2) => {

                    this.status.active = $active;
                    this.status.data[0].desc = $t1;
                    this.status.data[3].desc = $t2;

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    this.progress.status = $p;

                };

                Service.getStatus( { id: this.q.id }, success, progress);

            }

        },

        created() {

            this.initData( () => { this.initBMap() } );
            this.initStatus();

        },

        data() {

			return {
                progress: {
                    bMap: 1,
                    status: 1,
                    data: 1
                },
                bMap: {
                    width: '100vw',
                    height: '50vw',
                    zoom: null,
                    center: null,
                    trajectory: null
                },
                status: {
                    active: 0,
                    data: [
                        {
                            title: '发起',
                            desc: ''
                        },
                        {
                            title: '已接受',
                            desc: ''
                        },
                        {
                            title: '运输中',
                            desc: ''
                        },
                        {
                            title: '已完成',
                            desc: ''
                        }
                    ]
                },
                data: {
                    '0': { value: '' },
                    '1': { value: '' },
                    '2': { value: '' },
                    '3': { value: { id: '', name: '', phone: '' } },
                    '4': { value: '' },
                    '5': { value: '' },
                    '6': { value: '' },
                    '7': { value: '' },
                    '8': { value: { 0: '', 1: '' } }
                }
            };

		}

	}

</script>
