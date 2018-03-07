<template>
    <div id="app">
        <router-view :info="info"></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 记录输入框数据
                info: {
                    city: '',
                    keyWord: '',
                    checkInDate: '',
                    checkOutDate: '',
                    curHotel: {}
                }
            };
        },
        created() {
            this._initInfo();
            this.$util.forbidScal();
        },
        methods: {
            // 初始化输入框数据
            _initInfo() {
                this.info.city = '深圳';
                let day = new Date();
                day.setDate(day.getDate() + 1);
                let checkInDate = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
                day.setDate(day.getDate() + 1);
                let checkOutDate = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
                this.info.checkInDate = checkInDate;
                this.info.checkOutDate = checkOutDate;
            }
        }
    };
</script>

<style>
    #app {
        background-color: #eeeeee;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>
