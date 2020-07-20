<style>

    .user-info {
        position: relative;
        height: 30vw;
    }

    .user-info .at__avatar {
        position: absolute;
        left: 5vw;
        top: 5vw;
        width: 20vw;
        height: 20vw;
    }

    .user-info .at__avatar img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .user-info .at__name {
        position: absolute;
        left: 30vw;
        top: 7vw;
        font-size: 24px;
        line-height: 24px;
        white-space: nowrap;
        color: #191919;
    }

    .user-info .at__id {
        position: absolute;
        left: 30vw;
        top: 16vw;
        font-size: 12px;
        line-height: 12px;
        white-space: nowrap;
        color: #7F7F7F;
    }

    .menu {
        flex-grow: 1;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #EDEDED;
    }

</style>

<template>
	<view>

        <!-- 导航条 -->
        <cl-topbar title="我" :show-back="false">
        </cl-topbar>

        <!-- 用户信息 -->
        <view class="user-info">

            <view class="at__avatar">
                <img :src="account.userInfo.avatar">
            </view>

            <text class="at__name">
                {{ account.userInfo.name }}
            </text>

            <text class="at__id">
                证件号：{{ account.userInfo.id }}
            </text>
        </view>

        <!-- 菜单 -->
        <view class="menu">

            <cl-list label="企业信息">
                <text slot="icon" class="iconfont @company"></text>
            </cl-list>

            <cl-list label="设置">
                <text slot="icon" class="iconfont @setup"></text>
            </cl-list>

            <cl-list label="注销"
                @click.native=" handleLogout() ">
                <text slot="icon" class="iconfont @logout"></text>
            </cl-list>
        </view>
    </view>
</template>

<script>

    import Service from './service';



	export default {

        computed: {

            account() {

                return uni.getStorageSync('account');

            }

        },

        methods: {

            handleLogout() {

                uni.reLaunch( { url: '/pages/login/index' } );

            }

        },

		data() {

			return {};

		}

	}

</script>
