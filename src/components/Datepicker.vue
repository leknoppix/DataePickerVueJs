<style>
  .datepicker__agenda{
    position:relative;
  }
</style>

<template>
  <div class="datepicker__agenda">
    <input type="text" :value="date_formatted" @click="showDatepicker">
    <input type="hidden" :name="name" :value="date_raw">
    <datepicker-agenda @change="SelectDate" :date="date" :visible="isVisible" @cancel="hideDatepicker" @submit="SubmitDatepicker"></datepicker-agenda>
  </div>
</template>

<script>
// import moment from 'moment'
import { format } from 'date-fns'
import DatepickerAgendaComponent from './DatepickerAgenda'
// moment.locale('fr')

export default {
  components: {
    'datepicker-agenda': DatepickerAgendaComponent
  },
  props: {
    value: {type: String, required: true},
    format: {type: String, default: 'yyyy-LL-dd k:mm:ss'},
    name: {type: String}
  },
  data: function () {
    return {
      isVisible: false,
      date: format(new Date(this.value), 'yyyy-LL-dd k:mm:ss') // date: moment(this.value, 'YYYY-MM-DD hh:mm:ss')
    }
  },
  /* created: function () {
    this.isVisible = false
    setTimeout(() => document.addEventListener('click', this.hideDatepicker), 0)
  },
  destroyed: function () {
    document.removeEventListener('click', this.hideDatepicker)
  }, */
  methods: {
    SelectDate: function (date) {
      this.date = date
    },
    showDatepicker: function (date = null) {
      this.isVisible = true
      setTimeout(() => document.addEventListener('click', this.hideDatepicker), 0)
    },
    hideDatepicker: function () {
      this.isVisible = false
      document.removeEventListener('click', this.hideDatepicker)
    },
    SubmitDatepicker: function (date) {
      this.date = date
      this.hideDatepicker()
    }
  },
  computed: {
    date_formatted: function () { // this.date.format(this.format)
      return format(new Date(this.date), this.format)
    },
    date_raw: function () { // this.date.format('YYYY-MM-DD HH:mm:ss')
      return format(new Date(this.date), 'yyyy-LL-dd k:mm:ss')
    }
  }

}
</script>
