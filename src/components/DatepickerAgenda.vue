<style lang="scss">
  $header-height: 60px;
  $day-size: 41px;
  $color: #0097a7;
  .datepicker{
    font-family: 'Roboto', sans-serif;
    position: absolute;
    top:100%;
    width: 315px;
    z-index:5;
    background-color: #fff;
    box-shadow: 0 14px 45px rgba(0,0,0,0.25), 0 10px 18px rgba(0,0,0,0.22);
  }
  .datepicker__header{
    background-color: $color;
    color: #fff;
    padding: 20px;
    height: $header-height;
  }
  .datepicker__year{
    opacity: 0.7;
    margin-bottom: 10px;
    line-height: 16px;
  }
  .datepicker__date{
    font-size: 32px;
    line-height: 32px;
  }
  .datepicker__week{
    line-height: 12px;
    font-style: 12px;
    color: rgba(0,0,0,0.8);
    padding: 0 14px;
  }
  .datepicker__weekday{
    float: left;
    width: $day-size;
    text-align: center;
  }
  .datepicker__days{
    margin: 14px;
    margin-bottom: 0;
    height: $day-size * 5;
  }
  .datepicker__day{
    position: relative;
    width: $day-size;
    height: $day-size;
    line-height: $day-size;
    cursor: pointer;
    float: left;
    text-align: center;
    transition: color 450ms cubic-bezier(0.23,1,0.32,1);
  }
  .datepicker__day__effect{
    position: absolute;
    top:2px;
    left: 2px;
    background-color: rgb(0,151,167);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transition: color 450ms cubic-bezier(0.23,1,0.32,1);
    transform: scale(0);
    opacity: 0;
  }
  .datepicker__day__text{
    position: relative;
  }
  .datepicker__day:hover{
    color: #fff;
    .datepicker__day__effect{
      transform: scale(1);;
      opacity: 0.6;
    }
  }
  .datepicker__day.selected{
    color: #fff;
    .datepicker__day__effect{
      transform: scale(1);
      opacity: 1
    }
  }
  .datepicker__controls{
    position: relative;
    height: 56px;
    line-height: 56px;
    text-align: center;
    button{
      position: relative;
      border:none;
      background-color: transparent;
      user-select: none;
      outline: none;
      cursor: pointer;
      width: 56px;
      height: 56px;
    }
    svg{
      width: 24px;
      height: 24px;
      fill: rgba(0,0,0,0.87);
      vertical-align: middle;
    }
    &__label{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    &__next{
      float: right;
    }
    &__prev{
      float: left;
    }
  }
  .datepicker__actions{
    text-align: right;
    padding: 8px;
    button{
      border:none;
      background-color: transparent;
      user-select: none;
      outline: none;
      cursor: pointer;
      display: inline-block;
      color: #00bcd4;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 500;
      min-width: 88px;
      text-align: center;
      -webkit-appearance: none;
      line-height: 36px;
      transition: all 0.3s;
      &:hover{
        background-color: rgba(153,153,153,0.20);
      };
    }
  }
  .datepicker__schedule{
    position: relative;
    margin-top: 10px;
    height: 56px;
    &__hour, &__minute{
      position: absolute;
      top:0;
      display: block;
      width:150px;
      margin: 0 auto;
      z-index: 10;
      & select {
        text-align: center;
        border: none;
        outline: none;
        background: transparent;
        appearance: none;
        border-radius: 0;
        margin: 0;
        display: block;
        width: 100%;
        padding: 12px 55px 15px 15px;
        font-size: 16px;
        color: black;
      }
      &:after {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 100%;
        line-height: 38px;
        content: ' ';
        background-position: center center;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.41 0.59L-2.62268e-07 2L6 8L12 2L10.59 0.59L6 5.17L1.41 0.59Z' fill='black'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        background-color: $color;
        text-align: center;
        color: black;
        font-size: 24px;
        z-index: -1;
      }
    }
    &__separator{
      position: absolute;;
      top:7px;
      left: calc(100%/2 - 2px);
      font-weight: bolder;
      font-size: 1.5em;
    }
    &__hour{
      left:5px;
    }
    &__minute{
      right:5px;
    }
  }
  .datepickerslide-enter-active{
    opacity: 1;
    transition: all 0.3s;
    transform: translateY(0);

  }
  .datepickerslide-leave-active{
    opacity: 0;
    transform: translateY(-50px);
  }
</style>

<template>
  <transition name="datepickerslide">
    <div class="datepicker" v-if="visible" @click.stop>
      <div class="datepicker__header">
        <div class="datepicker__year">
          {{ year }}
        </div>
        <div class="datepicker__date">
          {{ date_formatted }}
        </div>
      </div>
      <div class="datepicker__controls">
        <div class="datepicker__controls__label">
          {{ month.getMonthLetter()}}
        </div>
        <button class="datepicker__controls__prev" @click="prevMonth()">
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </button>
        <button class="datepicker__controls__next" @click="nextMonth()">
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
      </div>
      <div class="datepicker__week">
        <div v-for="day in days" track-by="$index" :key="day.id" class="datepicker__weekday">
          {{ day }}
        </div>
      </div>
      <div class="datepicker__days">
        <div class="datepicker__day" v-bind:style="{width: ( month.getWeekStart() * 41 ) + 'px' }"></div>
        <div class="datepicker__day" @click="selectDate(day)" v-for="day in month.getDays()" :key="day.id" :class="{selected: isSelected(day)}">
          <span class="datepicker__day__effect"></span>
          <span class="datepicker__day__text">{{ new Intl.DateTimeFormat('fr-FR', {day: 'numeric'}).format(new Date(day)) }}</span>
        </div>
      </div>
      <div class="datepicker__schedule">
        <div class="datepicker__schedule__hour">
          <select>
            <option v-for="hour in hours" :key="hour" :value="hour">
              {{ hour }}
            </option>
          </select>
        </div>
        <div class="datepicker__schedule__separator">:</div>
        <div class="datepicker__schedule__minute">
          <select>
            <option v-for="minute in minutes" :key="minute" :value="minute">
              {{ minute }}
            </option>
          </select>
        </div>
      </div>
      <div class="datepicker__actions">
        <button @click="cancelDate">Annuler</button>
        <button @click="submitDate">Valider</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { getTime } from 'date-fns'
import Month from '../modules/month'
export default {
  props: {
    date: {},
    visible: {type: Boolean, default: true}
  },
  data () {
    return {
      days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      hours: [],
      minutes: [],
      month: new Month(new Intl.DateTimeFormat('fr-FR', {month: 'numeric'}).format(new Date(this.date)), new Intl.DateTimeFormat('fr-FR', {year: 'numeric'}).format(new Date(this.date))), // new Month(this.date.month(), this.date.year()),
      hour: parseInt(new Intl.DateTimeFormat('fr-FR', {hour: '2-digit'}).format(new Date(this.date))), // this.date.hour(),
      minute: new Intl.DateTimeFormat('fr-FR', {minute: '2-digit'}).format(new Date(this.date)), // this.date.minute(),
      lastdate: new Date(this.date),
      newdate: null
    }
  },
  methods: {
    Minutes: function () {
      for (var i = 0; i < 60; i++) {
        this.minutes.push(String(i).padStart(2, '0'))
      }
      return this.minutes
    },
    Hours: function () {
      for (var i = 0; i < 24; i++) {
        this.hours.push(String(i).padStart(2, '0'))
      }
      return this.hours
    },
    isSelected: function (day) {
      return getTime(new Date(this.date).setHours(1, 1)) === getTime(new Date(day).setHours(1, 1))
    },
    selectDate: function (day) {
      this.newdate = new Date(day).setHours(this.hour, this.minute)
      this.$emit('change', this.newdate)
    },
    nextMonth: function () {
      let month = this.month.month + 1
      let year = this.month.year
      if (month > 11) {
        year += 1
        month = 1
      }
      this.month = new Month(month, year)
    },
    prevMonth: function () {
      let month = this.month.month - 1
      let year = this.month.year
      if (month < 0) {
        year -= 1
        month = 11
      }
      this.month = new Month(month, year)
    },
    cancelDate: function () {
      this.$emit('change', this.lastdate)
      this.$emit('cancel', this.lastdate)
    },
    submitDate: function () {
      this.newdate = new Date(this.date).setHours(this.hour, this.minute)
      this.$emit('submit', this.newdate)
    }
  },
  computed: {
    year: function () { // this.date.format('Y')
      return new Intl.DateTimeFormat('fr-FR', {year: 'numeric'}).format(new Date(this.date))
    },
    date_formatted: function () {
      let jour = new Intl.DateTimeFormat('fr-FR', {weekday: 'long'}).format(new Date(this.date)) // this.date.format('dddd')
      let chiffre = new Intl.DateTimeFormat('fr-FR', {day: '2-digit'}).format(new Date(this.date))
      let jourletter = jour.charAt(0).toUpperCase() + jour.slice(1)
      let month = new Intl.DateTimeFormat('fr-FR', {month: 'short'}).format(new Date(this.date)) // this.date.format('MMMM')
      let monthletter = month.charAt(0).toUpperCase() + month.slice(1)
      return jourletter + ' ' + chiffre + ' ' + monthletter
    }
  },
  mounted () {
    this.Minutes()
    this.Hours()
  }
}
</script>
