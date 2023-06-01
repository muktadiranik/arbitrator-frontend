import * as moment from 'moment';

export class DateUtil {
  static replaceDash(date: string) {
    return date ? moment(date, 'MM-DD-YYYY').format('MM/DD/YYYY') : '-';
  }

  static formatDate(date: string, format: string) {
    return moment(date, 'MM-DD-YYYY').format(format);
  }
}
