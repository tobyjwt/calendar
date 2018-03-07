<template>
    <div id="mainpage">
        <ul class="input-box">
            <li class="input-box-item">
                <span>入住日期</span>
                <router-link class="input-box-item-content" to="/calendarpage" tag="div" type="text">
                    {{info.checkInDate}}
                    <span class="today" v-show="showTodayText(info.checkInDate)">今天</span>
                </router-link>
            </li>
            <li class="input-box-item">
                <span>离店日期</span>
                <router-link class="input-box-item-content" to="/calendarpage" tag="div" type="text">
                    {{info.checkOutDate}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            info: {}
        },
        components: {},
        methods: {
            showTodayText(str) {
                let today = new Date();
                let dateArr = str.split('-');
                if (today.getFullYear().toString() === dateArr[0] && (today.getMonth() + 1).toString() === dateArr[1] && today.getDate().toString() === dateArr[2]) {
                    return true;
                }
                return false;
            }
        }
    };
</script>

<style lang="scss">
    #mainpage {
        margin: 0.3rem;
        padding: 0.35rem;
        background-color: #FFFFff;
        border: solid #F0F0F0 1px;
        border-radius: 5px;
        color: #6a6f77;
        .input-box {
            /*margin-top: 10px;*/
            .input-box-item {
                margin-bottom: 0.16rem;
                height: 0.8rem;
                line-height: 0.8rem;
                display: flex;
                font-size: 0.3rem;
                span {
                    flex-basis: 1.3rem;
                    text-align: center;
                    color: #999999;
                }
                .input-box-item-content {
                    position: relative;
                    appearance: none;
                    outline: none;
                    flex-grow: 1;
                    margin-left: 0.25rem;
                    padding-left: 0.25rem;
                    height: 0.8rem;
                    border-radius: 4px;
                    background-color: #f4f4f4;
                    color: #4c4c4c;
                    .today {
                        float: right;
                        padding-right: 0.2rem;
                        color: #4c4c4c;
                    }
                }
            }
        }
        .submit {
            margin-bottom: 12px;
            border-radius: 5px;
            height: 0.8rem;
            line-height: 0.8rem;
            background-color: #F28300;
            font-size: 0.3rem;
            color: #FFFFff;
            text-align: center;
        }
    }
</style>
