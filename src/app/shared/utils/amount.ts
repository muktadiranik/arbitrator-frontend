export class AmountUtil {
  static appendCurrency(
    obj: any,
    key: string,
    appendCurrency = true,
    currency = '$'
  ) {
    if (obj && obj[key] && obj[key] != '') {
      return appendCurrency ? currency + obj[key] : obj[key];
    }
    return '-';
  }
}
