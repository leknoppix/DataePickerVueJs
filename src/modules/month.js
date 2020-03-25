export default class Month {
  constructor (month, year) {
    var firstDay = new Date(year, month, 1)
    var lastDay = new Date(year, month + 1, 0)
    this.start = firstDay
    this.startweeknumber = this.getWeekNumber(this.start)
    this.end = lastDay
    this.endweeknumber = this.getWeekNumber(this.end)
    this.month = month
    this.year = year
    this.numberweek = this.endweeknumber - this.startweeknumber
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
    var dates = []
    var currentDate = startDate
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = this.addDays.call(currentDate, 1)
    }
    return dates
  }

  addDays (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }

  getWeekNumber (d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    return weekNo
  }
}
