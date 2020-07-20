<style>

    .data-list {
        flex-grow: 1;
        overflow-y: auto;
    }

    .data-list__top-data, .data-list__history-data {
        position: relative;
        width: 100vw;
        height: 160px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: .5px solid#F7F7F7;
    }

    .data-list__top-data:active, .data-list__history-data:active {
        background-color: #EDEDED;
    }



    /**
     * 数据列表 -> .at_*
     */

    .data-list .at__0 {
        position: absolute;
        left: 5vw;
        top: 8px;
        font-size: 14px;
        line-height: 14px;
        color: #191919;
    }

    .data-list .at__1 {
        position: absolute;
        left: 5vw;
        top: 38px;
        font-size: 12px;
        line-height: 12px;
        color: #B2B2B2;
    }

    .data-list .at__2 {
        position: absolute;
        left: 5vw;
        top: 62px;
        font-size: 12px;
        line-height: 12px;
        color: #B2B2B2;
    }

    .data-list .at__3 {
        position: absolute;
        left: 5vw;
        top: 86px;
        font-size: 12px;
        line-height: 12px;
        color: #B2B2B2;
    }

    .data-list .at__4 {
        position: absolute;
        left: 5vw;
        top: 110px;
        font-size: 12px;
        line-height: 12px;
        color: #B2B2B2;
    }

    .data-list .at__5 {
        position: absolute;
        left: 5vw;
        top: 134px;
        font-size: 12px;
        line-height: 12px;
        color: #B2B2B2;
    }

    .data-list .at__vehicle {
        position: absolute;
        right: 5vw;
        top: 8px;
        font-size: 14px;
        line-height: 14px;
        color: #191919;
    }

    .data-list .at__driver {
        position: absolute;
        right: 5vw;
        top: 32px;
        font-size: 14px;
        line-height: 14px;
        color: #191919;
    }

    .data-list .at__confirm {
        position: absolute;
        right: 5vw;
        bottom: 20px;
    }



    /**
     * 更多
     */

    .data-list__more {
        margin-bottom: 10px;
    }

    .data-list__more:first-child {
        margin-top: 10px;
    }

    .data-list__more /deep/ .cl-divider__line {
        display: none;
    }

    .data-list__more /deep/ .cl-divider__text {
        background-color: transparent !important;
    }

    .data-list__more.\@more /deep/ .cl-loadmore__text {
        color: #409EFF;
    }

</style>

<template>
	<view>

        <!-- 导航条 -->
        <cl-topbar title="电子联单" :show-back="false">
            <template slot="append">

                <!-- 发起 -->
                <view v-if=" identity === 1 " class="cl-topbar__icon"
                    @click.native=" handleNavigateTo('/pages/waybill-launch/index') ">
                    <cl-icon name="cl-icon-add"></cl-icon>
                </view>
            </template>
        </cl-topbar>

        <!-- 数据列表 -->
        <view class="data-list">

            <!-- 顶部数据 -->
            <template v-if=" identity !== 1 ">
                <view v-for=" (data, i) in dataList.top.data " :key="i" class="data-list__top-data"
                    @click.native=" handleNavigateTo('/pages/waybill-confirm/index?id=' + data.id) ">

                    <text class="at__0">
                        {{ data['0'] }}
                    </text>

                    <text class="at__1">
                        {{ data['1'] | at1Label(identity) }}
                    </text>

                    <text class="at__2">
                        {{ data['2'] | at2Label(identity) }}
                    </text>

                    <text class="at__3">
                        发起位置：{{ data['3'] }}
                    </text>

                    <text class="at__4">
                        送达位置：{{ data['4'] }}
                    </text>

                    <text class="at__5">
                        发起时间：{{ data['5'] }}
                    </text>

                    <text class="at__vehicle">
                        {{ data['vehicle'] }}
                    </text>

                    <text class="at__driver">
                        {{ data['driver'] }}
                    </text>

                    <cl-button class="at__confirm" type="primary" round
                        @click=" handleNavigateTo('/pages/waybill-confirm/index?id=' + data.id) ">
                        {{ '' | atConfirmLabel(identity) }}
                    </cl-button>
                </view>
            </template>

            <!-- 历史数据 -->
            <view v-for=" (data, i) in dataList.history.data " :key="dataList.top.data.length + i" class="data-list__history-data"
                @click.native=" handleNavigateTo('/pages/waybill-detail/index?id=' + data.id) ">

                <text class="at__0">
                    {{ data['0'] }}
                </text>

                <text class="at__1">
                    {{ data['1'] | at1Label(identity) }}
                </text>

                <text class="at__2">
                    {{ data['2'] | at2Label(identity) }}
                </text>

                <text class="at__3">
                    发起位置：{{ data['3'] }}
                </text>

                <text class="at__4">
                    送达位置：{{ data['4'] }}
                </text>

                <text class="at__5">
                    发起时间：{{ data['5'] }}
                </text>

                <text class="at__vehicle">
                    {{ data['vehicle'] }}
                </text>

                <text class="at__driver">
                    {{ data['driver'] }}
                </text>
            </view>

            <!-- 更多 -->
            <view class="data-list__more" :class="{ '@more': (progress.dataList__history === 1 && dataList.history.more === 'more') }">
                <cl-loadmore
                    :loading=" progress.dataList__history !== 1 "
                    :finish=" dataList.history.more === 'no-more' "
                    text="点击加载更多"
                    loading-text="加载中..."
                    finish-text="没有更多了"
                    @click.native=" initHistoryData() ">
                </cl-loadmore>
            </view>
        </view>
    </view>
</template>

<script>

    import Service from './service';



	export default {

	    computed: {

            identity() {

                return uni.getStorageSync('identity');

            }

        },

        filters: {

            at1Label($value, $identity) {

                return ($identity === 1 ? '运输企业：' : '源头企业：') + $value;

            },

            at2Label($value, $identity) {

                return ($identity === 3 ? '运输企业：' : '处置企业：') + $value;

            },

            atConfirmLabel($value, $identity) {

                return $identity === 3 ? '接收' : '确认';

            }

        },

        methods: {

            initTopData($next) {

                let success = ($data) => {

                    this.dataList.top.data = $data;

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    this.progress.dataList__top = $p;

                };

                Service.getTopData( { identity: this.identity }, success, progress);

            },

            initHistoryData($next) {

                let success = ($data, $more) => {

                    this.dataList.history.data.push(...$data);
                    this.dataList.history.more = $more;

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    this.progress.dataList__history = $p;

                };

                Service.getHistoryData( { identity: this.identity, index: this.dataList.history.data.length, size: 3 }, success, progress);

            },

            handleNavigateTo($url) {

                uni.navigateTo( { url: $url } );

            }

        },

        created() {

	        if (this.identity !== 1) this.initTopData();
            this.initHistoryData();

        },

        data() {

            return {
                progress: {
                    dataList__top: 1,
                    dataList__history: 1
                },
                dataList: {
                    top: {
                        data: []
                    },
                    history: {
                        data: [],
                        more: 'more'
                    }
                }
            };

        }

	}

</script>
