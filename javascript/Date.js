export const DATE_NUM = Object.freeze({
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
});

export const DATE_STR = Object.freeze({
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
});

export function get_day(date) {
  let days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
}

export function get_total_days(month, year) {
  return new Date(year, month, 0).getDate();
}

export function get_total_weeks(count) {
  return count % 7 === 0 ? parseInt(count / 7) : parseInt(count / 7) + 1;
}

/**
 * yyyymmdd 형식으로 변환
 */
export function get_format_date({ year, month, day }) {
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  return year + "" + month + "" + day;
}

/**
 * yyyymmdd 유효성 검사
 */
export function validate_date(value) {
  let y = value.substr(0, 4);
  let m = value.substr(4, 2) - 1;
  let d = value.substr(6, 2);
  let D = new Date(y, m, d);

  return value.length === 8 &&
    D.getFullYear() == y &&
    D.getMonth() == m &&
    D.getDate() == d
    ? true
    : false;
}
