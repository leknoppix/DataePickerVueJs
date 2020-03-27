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
import DatepickerAgendaComponent from './DatepickerAgenda'

export default {
  components: {
    'datepicker-agenda': DatepickerAgendaComponent
  },
  props: {
    value: {type: String, required: true},
    name: {type: String}
  },
  data: function () {
    const dateinit = new Date(this.value)
    return {
      isVisible: false,
      date: dateinit.getFullYear() + '-' + String(dateinit.getUTCMonth() + 1).padStart(2, '0') + '-' + String(dateinit.getDate()).padStart(2, '0') + ' ' + dateinit.getHours() + ':' + dateinit.getMinutes() + ':00',
      date_raw: dateinit.getFullYear() + '-' + String(dateinit.getUTCMonth() + 1).padStart(2, '0') + '-' + String(dateinit.getDate()).padStart(2, '0') + ' ' + dateinit.getHours() + ':' + dateinit.getMinutes() + ':00'
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
      const $newdate = new Date(this.date)
      this.date_raw = $newdate.getFullYear() + '-' + String($newdate.getUTCMonth() + 1).padStart(2, '0') + '-' + String($newdate.getDate()).padStart(2, '0') + ' ' + $newdate.getHours() + ':' + $newdate.getMinutes() + ':00'
      this.hideDatepicker()
    }
  },
  computed: {
    date_formatted: function () {
      const datereturn = new Date(this.date)
      const day = String(datereturn.getUTCDate()).padStart(2, '0')
      const month = String(datereturn.getUTCMonth() + 1).padStart(2, '0')
      const year = datereturn.getFullYear()
      const hour = datereturn.getHours()
      const minute = datereturn.getMinutes()
      return day + '-' + month + '-' + year + ' ' + hour + ':' + minute
    }
  }

}
</script>
