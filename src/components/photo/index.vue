<style>

    .photo-component + .photo-component {
        margin-left: 10px;
    }

    .photo-component > .at__image {
        position: relative;
        padding-bottom: 100%;
        background-color: #F7F7F7;
    }

    .photo-component > .at__image > * {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .photo-component > .at__image > img {
        max-width: 100%;
        max-height: 100%;
    }

    .photo-component > .at__description-text {
        font-size: 13px;
        line-height: 35px;
    }

    .photo-component /deep/ .cl-button--text {
        padding: 0;
    }

</style>

<template>
    <view class="photo-component" :style="{ 'width': size }">

        <template v-if=" value ">

            <view class="at__image"
                @click.native="() => {
                    if ( !readonly ) handleChoose()
                }">
                <img :src="value">
            </view>

            <view class="at__description-text">
                <cl-button type="text"
                    @click.native="() => {
                        handlePreview()
                    }">
                    {{ descriptionText }}
                </cl-button>
            </view>
        </template>

        <template v-else>

            <view class="at__image"
                @click.native="() => {
                    if ( !readonly ) handleChoose()
                }">
                <cl-icon name="cl-icon-image" size="30px"></cl-icon>
            </view>

            <view class="at__description-text">
                {{ descriptionText }}
            </view>
        </template>
    </view>
</template>

<script>

    export default {

        props: {

            value: {
                type: String
            },

            size: {
                type: String
            },

            descriptionText: {
                type: String
            },

            readonly: {
                type: Boolean
            }

        },

        methods: {

            handleChoose() {

                let success = ($data) => {

                    this.$emit('input', $data.tempFilePaths[0] );
                    this.$emit('change', $data);

                };

                uni.chooseImage( { count: 1, success: success } );

            },

            handlePreview() {

                uni.previewImage( { urls: [this.value] } );

            }

        },

        data() {

            return {};

        }

	}

</script>
