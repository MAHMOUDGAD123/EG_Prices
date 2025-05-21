"use strict";

/**@param {number} n*/
export const frmt_time = (n) => {
  return n.toString().padStart(2, "0");
};

/**
 * @param {Intl.NumberFormat} formatter
 * @param {number} n
 * @param {boolean} leadingZero
 */
export const toArabicNumber = (formatter, n, leadingZero = false) => {
  return leadingZero
    ? formatter.format(n).padStart(2, "٠")
    : formatter.format(n);
};

const weekday_ele = document.querySelector(".date > .info > .weekday");
const month_ele = document.querySelector(".date > .info > .month");
const day_ele = document.querySelector(".date > .info > .day");
const year_ele = document.querySelector(".date > .info > .year");

const hours = document.querySelector(".clock > .time > .hr");
const minutes = document.querySelector(".clock > .time > .min");
const seconds = document.querySelector(".clock > .time > .sec");

export const updateTime = () => {
  const date = new Date();
  const hrs = date.getHours();
  const mins = date.getMinutes();
  const secs = date.getSeconds();

  if (document.body.classList.contains("ar")) {
    const intlNumberFormatter = new Intl.NumberFormat("AR-EG", {
      useGrouping: false,
    });
    hours.textContent = toArabicNumber(intlNumberFormatter, +hrs, true);
    minutes.textContent = toArabicNumber(intlNumberFormatter, +mins, true);
    seconds.textContent = toArabicNumber(intlNumberFormatter, +secs, true);
  } else {
    hours.textContent = frmt_time(hrs);
    minutes.textContent = frmt_time(mins);
    seconds.textContent = frmt_time(secs);
  }
};

export const updateDate = () => {
  const now = new Date();
  if (document.body.classList.contains("ar")) {
    const intlNumberFormatter = new Intl.NumberFormat("AR-EG", {
      useGrouping: false,
    });
    day_ele.textContent = toArabicNumber(intlNumberFormatter, now.getDate());
    year_ele.textContent = toArabicNumber(
      intlNumberFormatter,
      now.getFullYear()
    );
  } else {
    day_ele.textContent = now.getDate();
    year_ele.textContent = now.getFullYear();
  }
};

export const setTimeAndDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const now = new Date();
  const day_name = weekdays[now.getDay()];
  const month_name = months[now.getMonth()];

  // add the english text first to make it ready for translation
  weekday_ele.dataset.en = day_name;
  month_ele.dataset.en = month_name;

  setTimeout(() => {
    setInterval(updateTime, 1000); // update time interval
    updateDate();
  }, 0);
};
