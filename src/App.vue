<style lang="scss">

	@import "./cool/ui/static/css/index.scss";
    @import "./static/public.css";
    @import "./static/iconfont/iconfont.css";

</style>

<script>

	export default {

        methods: {

            handleSet($key, $value) {

                uni.setStorageSync($key, $value);
                uni.$emit($key, $value);

            },

            handleBadge($value) {

                switch (true) {

                    case $value > 99 :
                        uni.setTabBarBadge( { index: 0, text: '99+' } );
                        break;

                    case $value > 0 :
                        uni.setTabBarBadge( { index: 0, text: String($value) } );
                        break;

                    default :
                        uni.removeTabBarBadge( { index: 0 } );
                        break;

                }

            }

        },

		onLaunch: function() {

            uni.$on('set', this.handleSet);
            uni.$on('badge', this.handleBadge);

		}

	};

</script>
