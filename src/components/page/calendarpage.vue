<template>
    <div class="calendar">
        <div class="calendar-header" v-if="needBlank">
            <div class="back" @click="goBack()"><span class="back-icon">亃</span>返回</div>
            <div class="title">日历</div>
        </div>
        <div class="week">
            <div class="week-day weekend-day">日</div>
            <div class="week-day">一</div>
            <div class="week-day">二</div>
            <div class="week-day">三</div>
            <div class="week-day">四</div>
            <div class="week-day">五</div>
            <div class="week-day weekend-day">六</div>
        </div>
        <div class="calendar-content" ref="calendarWraper" :class="{blank: needBlank}">
            <div style="">
                <div class="calendar-content-item" v-for="month in allMonthData">
                    <div class="calendar-content-title">{{month.year}}年{{month.month}}月</div>
                    <ul class="calendar-content-day">
                        <li class="day-item" @click="selectDate(month, day)"
                            :class="{holiday: day.isWeekend, disable: day.isDisable}" v-for="day in month.date">
                            <p class="day-item-num"
                               :class="{CheckInDate: day.isCheckInDate,themeBackground: day.isCheckInDate || day.isCheckOutDate, CheckOutDate: day.isCheckOutDate}">
                                {{day.showDate}}</p>
                            <p class="check-block holiday" v-show="day.isCheckInDate">入住</p>
                            <p class="check-block holiday" v-show="day.isCheckOutDate">离店</p>
                            <p class="restDay" v-show="day.isRestDay && !day.isWeekend">休</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        props: {
            info: {},
            needBlank: true
        },
        data() {
            return {
                allMonthData: [],
                checkInDate: {},
                checkOutDate: {},
                restDayList: {}
            };
        },
        created() {
            // 需要显示节假日需要更新节假日信息，没有找到合适的节假日接口，这部分以后更新
//            this.initRestDayList();
            this.getAllMonthData(12);
            let checkInMonth = this.info.checkInDate.split('-')[1];
            let checkInDate = this.info.checkInDate.split('-')[2];
            let checkOutMonth = this.info.checkOutDate.split('-')[1];
            let checkOutDate = this.info.checkOutDate.split('-')[2];
            for (let month of this.allMonthData) {
                if ((month.month + '') === checkInMonth) {
                    for (let date of month.date) {
                        if ((date.showDate + '') === checkInDate) {
                            date.isCheckInDate = true;
                            this.checkInDate = {
                                month: month,
                                date: date
                            };
                            break;
                        }
                    }
                }
                if ((month.month + '') === checkOutMonth) {
                    for (let date of month.date) {
                        if ((date.showDate + '') === checkOutDate) {
                            date.isCheckOutDate = true;
                            this.checkOutDate = {
                                month: month,
                                date: date
                            };
                            break;
                        }
                    }
                    break;
                }
            }
            this.$nextTick(function () {
                this._initScroll();
            });
        },
        methods: {
            goBack() {
                window.history.go(-1);
            },
            getMonthData(year, month) {
                let ret = [];
                if (!year || !month) {
                    let today = new Date();
                    year = today.getFullYear();
                    month = today.getMonth() + 1;
                }
                let firstDay = new Date(year, month - 1, 1);
                let firstWeekDay = firstDay.getDay();
                let firstDayWeekDay = firstDay.getDay();
                let preMonthDayCount = firstDayWeekDay - 1;
                let lastDay = new Date(year, month, 0);
                let lastDate = lastDay.getDate();
                for (let i = 0; i < 38; i++) {
                    let date = i - preMonthDayCount;
                    let showDate = date;
                    if (date <= 0) {
                        showDate = '';
                    } else if (date > lastDate) {
                        continue;
                    }
                    let isWeekend = false;
                    if ((showDate + firstWeekDay) % 7 === 0 || (showDate + firstWeekDay) % 7 === 1) {
                        isWeekend = true;
                    }
                    let isRestDay = false;
//                    if (this.restDayList[year][month][showDate]) {
//                        isRestDay = true;
//                    }
                    ret.push({
                        showDate: showDate,
                        isWeekend: isWeekend,
                        isCheckInDate: false,
                        isCheckOutDate: false,
                        isRestDay: isRestDay
                    });
                }
                return ret;
            },
            getAllMonthData(num) {
                console.log(num);
                let todayData = new Date();
                let thisYear = todayData.getFullYear();
                let thisMonth = todayData.getMonth() + 1;
                let temp = [];
                for (let i = 0; i < num; i++) {
                    if (thisMonth > 12) {
                        thisYear += 1;
                        thisMonth = 1;
                    }
                    temp[i] = {
                        year: thisYear,
                        month: thisMonth,
                        date: this.getMonthData(thisYear, thisMonth)
                    };
                    thisMonth += 1;
                }
                // 第一个月今天之前的日期不可点击
                for (let i of temp[0].date) {
                    let today = new Date();
                    if (i.showDate >= today.getDate()) {
                        break;
                    }
                    i.isDisable = true;
                }
                this.allMonthData = temp;
            },
            _initScroll() {
                this.itemScoll = new BScroll(this.$refs.calendarWraper, {
                    click: true,
                    probeType: 1
                });
            },
            initRestDayList() {
                this.restDayList['2017'] = {};
                for (let i = 1; i <= 12; i++) {
                    this.restDayList['2017'][i + ''] = {};
                }
                this.restDayList['2018'] = {};
                for (let i = 1; i <= 12; i++) {
                    this.restDayList['2018'][i + ''] = {};
                }
                this.restDayList['2017']['1']['1'] = true;
                this.restDayList['2017']['1']['2'] = true;
                this.restDayList['2017']['1']['27'] = true;
                this.restDayList['2017']['1']['28'] = true;
                this.restDayList['2017']['1']['29'] = true;
                this.restDayList['2017']['1']['30'] = true;
                this.restDayList['2017']['1']['31'] = true;
                this.restDayList['2017']['2']['1'] = true;
                this.restDayList['2017']['2']['2'] = true;
                this.restDayList['2017']['4']['2'] = true;
                this.restDayList['2017']['4']['3'] = true;
                this.restDayList['2017']['4']['4'] = true;
                this.restDayList['2017']['4']['29'] = true;
                this.restDayList['2017']['4']['30'] = true;
                this.restDayList['2017']['5']['1'] = true;
                this.restDayList['2017']['5']['28'] = true;
                this.restDayList['2017']['5']['29'] = true;
                this.restDayList['2017']['5']['30'] = true;
                for (let i = 1; i < 9; i++) {
                    this.restDayList['2017']['10'][i + ''] = true;
                }
                this.restDayList['2018']['1']['1'] = true;
                for (let i = 15; i < 22; i++) {
                    this.restDayList['2018']['2'][i + ''] = true;
                }
                this.restDayList['2018']['4']['5'] = true;
                this.restDayList['2018']['4']['6'] = true;
                this.restDayList['2018']['4']['7'] = true;
                this.restDayList['2018']['4']['29'] = true;
                this.restDayList['2018']['4']['30'] = true;
                this.restDayList['2018']['5']['1'] = true;
                this.restDayList['2018']['6']['18'] = true;
                this.restDayList['2018']['9']['24'] = true;
                for (let i = 1; i < 8; i++) {
                    this.restDayList['2018']['10'][i + ''] = true;
                }
            },
            selectDate(month, day) {
                if (day.isDisable) {
                    return;
                }
                if (this.checkInDate.date.isCheckInDate && this.checkOutDate.date.isCheckOutDate) {
                    this.checkInDate.date.isCheckInDate = false;
                    this.checkOutDate.date.isCheckOutDate = false;
                    day.isCheckInDate = true;
                    this.checkInDate = {
                        date: day,
                        month: month
                    };
                } else if (this.checkInDate.date.isCheckInDate && !this.checkOutDate.date.isCheckOutDate) {
                    // 判断点击是改变入住日期还是离店日期，年，年相等判断月，月相等判断日
                    if (month.year > this.checkInDate.month.year || ((month.year === this.checkInDate.month.year) && (month.month > this.checkInDate.month.month)) || ((month.year === this.checkInDate.month.year) && (month.month === this.checkInDate.month.month) && day.showDate > this.checkInDate.date.showDate)) {
                        day.isCheckOutDate = true;
                        day.isCheckInDate = false;
                        this.checkOutDate = {
                            date: day,
                            month: month
                        };
                    } else {
                        this.checkInDate.date.isCheckInDate = false;
                        day.isCheckInDate = true;
                        this.checkInDate = {
                            date: day,
                            month: month
                        };
                    }
                }
                if (this.checkInDate.date.isCheckInDate && this.checkOutDate.date.isCheckOutDate) {
                    this.info.checkInDate = this.checkInDate.month.year + '-' + this.checkInDate.month.month + '-' + this.checkInDate.date.showDate;
                    this.info.checkOutDate = this.checkOutDate.month.year + '-' + this.checkOutDate.month.month + '-' + this.checkOutDate.date.showDate;
                    window.history.go(-1);
                }
            }
        }
    };
</script>

<style lang="scss">
    .calendar {
        .calendar-header {
            border-bottom: solid 1px #EEEEEE;
            background-color: #F28300;
            padding-top: 0.48rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.36rem;
            font-family: PingFang-SC-Bold;
            color: #FFFFFF;
            .back {
                position: absolute;
                padding-left: 0.27rem;
                width: 1rem;
                font-size: 0.32rem;
                .back-icon {
                    font-family: iconfont;
                }
            }
            .title {
                text-align: center;
            }
        }
        .week {
            display: flex;
            background-color: #FFFFff;
            height: 0.5rem;
            line-height: 0.5rem;
            .week-day {
                flex: 1;
                color: #111111;
                font-size: 0.24rem;
                text-align: center;
            }
            .weekend-day {
                color: #F28300;
            }
        }
        .blank {
            margin-top: 1.28rem;
        }
        .calendar-content {
            position: absolute;
            top: 0.5rem;
            bottom: 0;
            width: 100%;
            overflow: hidden;
            font-size: 0.29rem;
            .calendar-content-item {
                .calendar-content-title {
                    width: 100%;
                    text-align: center;
                    height: 0.5rem;
                    line-height: 0.5rem;
                }
                .calendar-content-day {
                    background: #ffffff;
                    overflow: hidden;
                    .holiday {
                        color: #F28300;
                    }
                    .day-item {
                        position: relative;
                        float: left;
                        width: 14.2%;
                        height: 1.27rem;
                        text-align: center;
                        .day-item-num {
                            margin: 0.42rem auto 0;
                            height: 0.58rem;
                            width: 0.58rem;
                            line-height: 0.58rem;
                        }
                        .CheckInDate, .CheckOutDate {
                            border-radius: 0.14rem;
                            color: #ffffff;
                            background-color: #F28300;
                        }
                        .check-block {
                            display: block;
                            height: 0.27rem;
                            line-height: 0.27rem;
                            font-size: 0.2rem;
                        }
                        .restDay {
                            position: absolute;
                            top: 0.2rem;
                            right: 0;
                            font-size: 0.18rem;
                            color: #F28300;
                        }
                    }
                    .disable {
                        color: gray;
                    }
                }
            }
        }
    }
</style>
