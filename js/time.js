/* Time Start */
const frmt_time = (n) => {
  if (!n) return "00";
  return Math.floor(Math.log10(n)) ? n : "0" + n;
};

{
  const hours = document.querySelector(".clock > .time > .hr");
  const minutes = document.querySelector(".clock > .time > .min");
  const seconds = document.querySelector(".clock > .time > .sec");

  setInterval(() => {
    const D = new Date();
    const hrs = frmt_time(D.getHours());
    const mins = frmt_time(D.getMinutes());
    const secs = frmt_time(D.getSeconds());

    hours.textContent = hrs;
    minutes.textContent = mins;
    seconds.textContent = secs;
  }, 1000);
}
/* Time End */

/* Date Start */
{
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

  const weekday_ele = document.querySelector(".date > .info > .weekday");
  const day_ele = document.querySelector(".date > .info > .day");
  const month_ele = document.querySelector(".date > .info > .month");
  const year_ele = document.querySelector(".date > .info > .year");
  const now = new Date();

  const day_name = weekdays[now.getDay()];
  const month_name = months[now.getMonth()];

  weekday_ele.textContent = day_name;
  weekday_ele.dataset.en = day_name;

  day_ele.textContent = `${now.getDate()},`;

  month_ele.textContent = month_name;
  month_ele.dataset.en = month_name;

  year_ele.textContent = `${now.getFullYear()}`;
}
/* Date End */
