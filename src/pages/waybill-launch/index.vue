<style>

    .cl-form {
        overflow-y: auto;
        flex-grow: 1;
        padding: 10px 5vw;
    }

    .cl-form .at__error {
        position: absolute;
        bottom: 0;
        font-size: 13px;
        line-height: 13px;
        color: #FF0000;
    }

    .cl-form .at__multiline-text, .cl-form .at__multiline-text > text {
        display: block;
        width: 100%;
    }

    .cl-form /deep/ .cl-input {
        padding: 0;
        border-width: 0 0 .5px 0;
        border-radius: 0;
    }



    /**
     * 底部
     */

    .bottom-bar {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
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

    .bottom-bar .cl-button--success {
        height: 32px;
        margin-right: 20px;
    }

    .bottom-bar .cl-button--text {
        color: #7A7E83;
    }

</style>

<template>
	<view>

        <!-- 导航条 -->
        <cl-topbar title="发起电子联单">
        </cl-topbar>

        <!-- 表单 -->
        <cl-form label-width="120px">
            <cl-loading-mask :loading=" progress.data !== 1 ">

                <cl-form-item label="源头企业：">
                    {{ data[0].value }}
                </cl-form-item>

                <cl-form-item v-if=" data[6].value " label="工地位置：">
                    {{ data[6].value }}
                </cl-form-item>

                <cl-form-item label="运输车辆：">

                    <cl-select v-model="data[1].value" :options="data[1].option"
                        @change=" initData23($event, () => { handleValidator(1) } ) ">
                    </cl-select>

                    <text v-if=" data[1].error " class="at__error">
                        请选择
                    </text>
                </cl-form-item>

                <cl-form-item v-if=" data[2].value " label="运输单位：">
                    {{ data[2].value }}
                </cl-form-item>

                <cl-form-item v-if=" data[3].option.length " label="运输司机：">
                    <view class="at__multiline-text">

                        <cl-select
                            v-model="data[3].value.id" :options="data[3].option"
                            label-key="name"
                            value-key="id"
                            @change=" handleDriverChange($event) ">
                        </cl-select>

                        <template v-if="data[3].value.id">

                            <text>
                                工作证：{{ data[3].value.id }}
                            </text>

                            <text>
                                手机号：{{ data[3].value.phone }}
                            </text>
                        </template>
                    </view>
                </cl-form-item>

                <cl-form-item label="处置企业：">

                    <cl-select v-model="data[4].value" :options="data[4].option"
                        @change=" initData7($event, () => { handleValidator(4) } ) ">
                    </cl-select>

                    <text v-if=" data[4].error " class="at__error">
                        请选择
                    </text>
                </cl-form-item>

                <cl-form-item v-if=" data[7].value " label="处置企业地址：">
                    {{ data[7].value }}
                </cl-form-item>

                <cl-form-item label="废弃物类别：">

                    <cl-input v-model="data[5].value" placeholder="渣土、碎石、弃料...　等" clearable
                        @input=" handleValidator(5) ">
                    </cl-input>

                    <text v-if=" data[5].error " class="at__error">
                        请输入
                    </text>
                </cl-form-item>

                <cl-form-item>

                    <photo v-model="data[8].value[0]" size="50%" description-text="运输介质照片"
                        @change=" handleValidator(8) ">
                    </photo>

                    <photo v-model="data[8].value[1]" size="50%" description-text="车尾放大照片"
                        @change=" handleValidator(8) ">
                    </photo>

                    <text v-if=" data[8].error " class="at__error">
                        请添加照片
                    </text>
                </cl-form-item>
            </cl-loading-mask>
        </cl-form>

        <!-- 底部 -->
        <view class="bottom-bar">

            <cl-button type="text" :disabled=" progress.data !== 1 "
                @click=" handleBack() ">
                取消
            </cl-button>

            <cl-button type="success" :disabled=" progress.data !== 1 "
                @click=" handleValidator( () => { handleSubmit( () => { handleBack() } ) } ) ">
                提交
            </cl-button>
        </view>
    </view>
</template>

<script>

    import photo from '@/components/photo';
    import Service from './service';



	export default {

        components: {
            photo
        },

        computed: {

            account() {

                return uni.getStorageSync('account');

            }

        },

        methods: {

            initData($next) {

                let success = ($d1, $d4, $d6) => {

                    this.data[1].option = $d1;
                    this.data[4].option = $d4;
                    this.data[6].value = $d6.address;
                    this.data[0].value = this.account.ownership.name;

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    this.progress.data = $p;

                };

                Service.getData( { locationKey: this.account.ownership.id }, success, progress);

            },

            initData23($value, $next) {

                let success = ($d2, $d3) => {

                    this.data[2].value = $d2.name;
                    this.data[3].option = $d3;
                    this.data[3].value.id = '';

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    // 空

                };

                Service.getData23( { vehicle: $value }, success, progress);

            },

            initData7($value, $next) {

                let success = ($d7) => {

                    this.data[7].value = $d7.address;

                    // 执行下一步
                    if ($next) $next();

                };

                let progress = ($p) => {

                    // 空

                };

                Service.getData7( { locationKey: $value }, success, progress);

            },

            handleDriverChange($id) {

                for (let a = null, i = 0; a = this.data[3].option[i]; i++) {

                    if (a.id === $id) {

                        this.data[3].value.phone = a.phone;
                        break;

                    }

                }

            },

            handleValidator($index) {

                if ( typeof $index !== 'function' ) {

                    let a = 0;

                    if ( !$index || $index === 1 )
                        a += Number( this.data[1].error = !this.data[1].value );

                    if ( !$index || $index === 4 )
                        a += Number( this.data[4].error = !this.data[4].value );

                    if ( !$index || $index === 5 )
                        a += Number( this.data[5].error = !this.data[5].value );

                    if ( !$index || $index === 8 )
                        a += Number( this.data[8].error = !this.data[8].value[0] || !this.data[8].value[1] );

                    if ( a )
                        return new Error(a);

                }

                else if ( !this.handleValidator() )
                    $index();

            },

            handleSubmit($next) {

                window.setTimeout($next, 500), this.progress.data = 0;

            },

            handleBack() {

                uni.navigateBack();

            }

        },

        created() {

            this.initData();

        },

		data() {

            return {
                progress: {
                    data: 1
                },
                data: {
                    '0': { error: false, value: '' },
                    '1': { error: false, value: '', option: [] },
                    '2': { error: false, value: '' },
                    '3': { error: false, value: { id: '', name: '', phone: '' }, option: [] },
                    '4': { error: false, value: '', option: [] },
                    '5': { error: false, value: '' },
                    '6': { error: false, value: '' },
                    '7': { error: false, value: '' },
                    '8': { error: false, value: { 0: '', 1: '' } }
                }
            };

		}

	}

</script>
