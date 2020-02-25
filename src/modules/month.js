import { format, eachDayOfInterval } from 'date-fns'
// import Moment from 'moment'
// import { extendMoment } from 'moment-range'
// const moment = extendMoment(Moment)

export default class Month {
  constructor (month, year) {
    this.month = parseInt(month)
    this.year = parseInt(year)
    this.start = new Date(this.year, this.month - 1, 1)
    this.end = new Date(this.year, this.month, 0)
  }

  getWeekStart () {
    return format(this.start, 'i') // this.start.weekday()
  }

  getDays () {
    // let range = moment.range(this.start, this.end)
    let range = eachDayOfInterval({start: new Date(this.start), end: new Date(this.end)})
    // return Array.from(range)
    return range
  }

  getMonthLetter () {
    return new Intl.DateTimeFormat('fr-FR', {month: 'long', year: 'numeric'}).format(new Date(this.start)).toUpperCase() // this.start.format('MMMM YYYY').toUpperCase()
  }
}
