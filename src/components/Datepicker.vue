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
import moment from 'moment'
import DatepickerAgendaComponent from './DatepickerAgenda'
moment.locale('fr')

export default {
  components: {
    'datepicker-agenda': DatepickerAgendaComponent
  },
  props: {
    value: {type: String, required: true},
    format: {type: String, default: 'YYYY-MM-DD hh:mm:ss'},
    name: {type: String}
  },
  data: function () {
    return {
      isVisible: false,
      date: moment(this.value, 'YYYY-MM-DD hh:mm:ss')
    }
  },
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
    date_formatted: function () {
      return this.date.format(this.format)
    },
    date_raw: function () {
      return this.date.format('YYYY-MM-DD HH:mm:ss')
    }
  }

}
</script>
