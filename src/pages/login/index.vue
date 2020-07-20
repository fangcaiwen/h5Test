<style>

    uni-page-body > view {
        background-image: url("@/static/image/login_background.png");
        background-position: center;
        background-size: cover;
    }



    /**
     * .login
     */

    .login {
        position: absolute;
        left: 0;
        top: 30vw;
        width: 90vw;
        padding: 5vw;
        background-color: rgba(0, 121, 254, .8);
    }

    .login .at__h1, .login .at__small {
        display: block;
        font-size: 14px;
        line-height: 24px;
        color: #FFFFFF;
    }



    /**
     * .cl-form
     */

    .cl-form /deep/ .cl-form-item__container:first-child {
        padding-left: 0;
    }

    .cl-form /deep/ .cl-select {
        padding-left: 20px;
        border-radius: 4px;
        background-color: #FFFFFF;
    }

    .cl-form /deep/ .cl-select__icon {
        right: 10px;
    }

</style>

<template>
    <view>
        <view class="login">

            <text class="at__h1">
                睿途资源化智慧管理应用
                <text class="at__small">
                    Construction Rubbish Management App
                </text>
            </text>

            <cl-form>

                <cl-form-item>
                    <cl-select v-model="data.identity.value" :options="data.identity.option">
                    </cl-select>
                </cl-form-item>

                <cl-form-item>
                    <cl-input v-model="data.account.value" prefix-icon="iconfont @account" placeholder="账号">
                    </cl-input>
                </cl-form-item>

                <cl-form-item>
                    <cl-input v-model="data.password.value" prefix-icon="iconfont @password" placeholder="密码" password>
                    </cl-input>
                </cl-form-item>

                <cl-form-item>
                    <cl-button type="success"
                        @click=" handleLogin() ">
                        登录
                    </cl-button>
                </cl-form-item>
            </cl-form>
        </view>
    </view>
</template>

<script>

    import jsonAccount from '@/static/httpCache/account.json';
    import Service from './service';



	export default {

        methods: {

            handleLogin() {

                uni.$emit('set', 'identity', this.data.identity.value );
                uni.$emit('set', 'account', jsonAccount[ this.data.identity.value ] );
                uni.reLaunch(
                    {
                        url: '/pages/waybill/index',
                        success: () => {

                            switch (this.data.identity.value) {

                                case 1 :
                                    uni.setTabBarItem( { index: 0, text: '发起联单' } );
                                    break;

                                case 2 :
                                    uni.setTabBarItem( { index: 0, text: '运输联单' } );
                                    break;

                                case 3 :
                                    uni.setTabBarItem( { index: 0, text: '接受联单' } );
                                    break;

                            }

                            uni.$emit('set', 'badge', (this.data.identity.value !== 1 ? 1 : 0) );

                        }
                    }
                );

            }

        },

		data() {

			return {
			    data: {
                    identity: {
                        value: 1,
                        option: [
                            {
                                label: '源头企业',
                                value: 1
                            },
                            {
                                label: '驾驶员',
                                value: 2
                            },
                            {
                                label: '处置企业',
                                value: 3
                            }
                        ]
                    },
                    account: {
                        value: ''
                    },
                    password: {
                        value: ''
                    }
                }
            };

		}

	}

</script>
