export default class Month {
  constructor (month, year) {
    var firstDay = new Date(year, month, 1)
    var lastDay = new Date(year, month + 1, 0)
    this.start = firstDay
    this.end = lastDay
    this.month = month
    this.year = year
  }

  getWeekStart () {
    return this.start.getDay()
  }

  getDays () {
    return this.getDates(this.start, this.end)
  }

  getMonthLetter () {
    const optionsmonths = {month: 'long', year: 'numeric'}
    return this.start.toLocaleDateString('fr-FR', optionsmonths).toUpperCase()
  }

  getDates (startDate, endDate) {
    let dates = []
    let datestart = startDate
    let dayOfWeek = startDate.getDay() - 1
    if (dayOfWeek === -1) { dayOfWeek = 6 }
    if (dayOfWeek > 0) {
      for (let i = dayOfWeek; i > 0; i--) {
        let date = new Date(startDate)
        date.setDate(i * -1 + 1)
        dates.push(date)
      }
    }
    while (datestart <= endDate) {
      dates.push(datestart)
      datestart = this.addDays.call(datestart, 1)
    }
    dayOfWeek = endDate.getDay() - 1
    if (dayOfWeek === -1) { dayOfWeek = 6 }
    if (dayOfWeek < 6) {
      for (let i = 0; i < (6 - dayOfWeek); i++) {
        let date = new Date(endDate)
        date.setDate(endDate.getDate() + i + 1)
        dates.push(date)
      }
    }
    return dates
  }

  addDays (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
}
