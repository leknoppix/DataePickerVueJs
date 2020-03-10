import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

export default class Month {
  constructor (month, year) {
    this.start = moment([year, month])
    this.end = this.start.clone().endOf('month')
    this.month = month
    this.year = year
  }

  getWeekStart () {
    return this.start.weekday()
  }

  getDays () {
    let range = moment.range(this.start, this.end)
    return Array.from(range.by('days'))
  }

  getMonthLetter () {
    return this.start.format('MMMM YYYY').toUpperCase()
  }
}
