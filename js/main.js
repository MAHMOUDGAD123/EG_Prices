//==================== Data & tools Start =====================
const testing = false; // used for testing
const precision = 2;
const page_count = 5; // main pages count
// en: false | ar: true (app language)
let ar = window.localStorage.getItem("lang") === "ar" ? true : false;
let pointer_x = 0; // holds the pointerdown event x coordinate (pageX) - used for scrolling through pages
let curr_page = null; // holds the current page
let curr_calc = null; // holds the current calculator
let curr_curr = null; // holds the current currency info
const initial_page = 3;
const initial_calc = 1;
const initial_curr = 1;
let prices = null; // object hold all prices
let live_api_interval = 60000; // time interval for live data api fetching
let Live_data = null; // holds the current live data object

const en_ar = new Map([
  // weekdays
  ["Saturday", "السبت"],
  ["Sunday", "الأحد"],
  ["Monday", "الإثنين"],
  ["Tuesday", "الثلاثاء"],
  ["Wednesday", "الأربعاء"],
  ["Thursday", "الخميس"],
  ["Friday", "الجمعة"],

  // gregorian months
  ["January", "يناير"],
  ["February", "فيراير"],
  ["March", "مارس"],
  ["April", "إبريل"],
  ["May", "مايو"],
  ["June", "يونيو"],
  ["July", "يوليو"],
  ["August", "أغسطس"],
  ["September", "سبتمبر"],
  ["October", "أكتوبر"],
  ["November", "نوفمبر"],
  ["December", "ديسمبر"],

  // nav - pages
  ["Gold", "الذهب"],
  ["Silver", "الفضة"],
  ["Bank", "البنك"],
  ["Market", "السوق"],
  ["Gasoline", "البنزين"],
  ["Gas", "الوقود"],
  ["Calculator", "الحاسبة"],

  // settings
  ["Language", "اللغة"],
  ["English", "إنجليزي"],
  ["Arabic", "عربي"],
  ["Notifications", "الإشعارات"],

  // others
  ["MG", "إم جي"],
  ["Designed-by", "تصميم"],
  ["EG", "مصر"],
  ["Prices", "أسعار"],
  ["Buy", "شراء"],
  ["Sell", "بيع"],
  ["Price", "السعر"],
  ["Type", "النوع"],
  ["Network Error", "تحقق من إتصالك بالإنترنت"],
  ["no. of", "العدد"],
  ["Result", "النتيجة"],
  ["Karat", "العيار"],
  ["Amount", "الكمية"],
  ["From", "من"],
  ["To", "إلى"],
  ["Search", "البحث"],
  ["Search...", "البحث..."],
  ["Home", "الرئيسية"],
  ["Cash", "العملة"],
  ["buy", "شراء"],
  ["sell", "بيع"],
  ["Banks USD", "دولار البنوك"],
  ["Market USD", "دولار السوق"],
  ["Sagha USD", "دولار الصاغة"],
  ["Sagha Diff", "فرق الصاغة"],
  ["Market Diff", "فرق السوق"],
  ["Silver Price", "سعر الفضة"],
  ["Global Ounce", "الأونصة العالمية"],
  ["(USD/OZ)", "(دولار/أونصة)"],
  ["(USD/EGP)", "(دولار/جنية)"],

  // units
  ["liter", "لتر"],
  ["Gram", "جرام"],
  ["gram", "جرام"],
  ["Ounce", "أونصة"],
  ["ounce", "أونصة"],
  ["cylinder", "إسطوانة"],
  ["gold pound", "جنية ذهب"],
  ["Pound", "جنية"],
  ["pound", "جنية"],
  ["Dollar", "دولار"],
  ["dollar", "دولار"],

  // Gold
  ["Gold Ounce", "أونصة الذهب"],
  ["Gold Pound", "جنية الذهب"],
  ["Sagha", "الصاغة"],
  ["Gold 24-Karat", "ذهب عيار 24"],
  ["24 Karat", "عيار 24"],
  ["Gold 22-Karat", "ذهب عيار 22"],
  ["22 Karat", "عيار 22"],
  ["Gold 21-Karat", "ذهب عيار 21"],
  ["21 Karat", "عيار 21"],
  ["Gold 18-Karat", "ذهب عيار 18"],
  ["18 Karat", "عيار 18"],
  ["Gold 14-Karat", "ذهب عيار 14"],
  ["14 Karat", "عيار 14"],
  ["Gold 12-Karat", "ذهب عيار 12"],
  ["12 Karat", "عيار 12"],
  ["Gold 9-Karat", "ذهب عيار 9"],
  ["9 Karat", "عيار 9"],
  ["Gold Calculator", "حاسبة الذهب"],
  ["Sagha Calculator", "حاسبة الصاغة"],
  ["Silver Calculator", "حاسبة الفضة"],
  ["Bank Calculator", "حاسبة العملة في البنك"],
  ["Market Calculator", "حاسبة العملة في السوق"],
  ["Gasoline Calculator", "حاسبة الوقود"],

  // Silver
  ["Silver 999", "فضة 999"],
  ["Silver 960", "فضة 960"],
  ["Silver 958", "فضة 958"],
  ["Silver 950", "فضة 950"],
  ["Silver 947", "فضة 947"],
  ["Silver 925", "فضة 925"],
  ["Silver 800", "فضة 800"],
  ["Silver Ounce", "أونصة الفضة"],

  // currency
  ["USDT", "الدولار الرقمي"],
  ["Currency", "العملة"],
  ["Egyptian Pound", "جنية مصري"],
  [" EGP ", "جنية مصري"],
  ["EGP", "ج.م"],
  ["US Dollar", "دولار أمريكي"],
  ["USD", "دولار أمريكي"],
  [" USD ", "دولار"],
  ["usd", "دولار أمريكي"],
  ["USD Bank", "دولار أمريكي البنك"],
  ["USD Market", "دولار أمريكي السوق"],
  ["Euro", "يورو"],
  ["EUR Bank", "يورو البنك"],
  ["EUR Market", "يورو السوق"],
  ["EUR", "يورو"],
  ["eur", "يورو"],
  ["Sterling Pound", "جنية إسترليني"],
  ["GBP", "جنية إسترليني"],
  ["gbp", "جنية إسترليني"],
  ["GBP Bank", "جنية إسترليني البنك"],
  ["GBP Market", "جنية إسترليني السوق"],
  ["Saudi Riyal", "ريال سعودي"],
  ["SAR", "ريال سعودي"],
  ["sar", "ريال سعودي"],
  ["SAR Bank", "ريال سعودي البنك"],
  ["SAR Market", "ريال سعودي السوق"],
  ["UAE Dirham", "درهم إماراتي"],
  ["AED", "درهم إماراتي"],
  ["aed", "درهم إماراتي"],
  ["AED Bank", "درهم إماراتي البنك"],
  ["AED Market", "درهم إماراتي السوق"],
  ["Kuwait Dinar", "دينار كويتي"],
  ["KWD", "دينار كويتي"],
  ["kwd", "دينار كويتي"],
  ["KWD Bank", "دينار كويتي البنك"],
  ["KWD Market", "دينار كويتي السوق"],
  ["Oman Riyal", "ريال عماني"],
  ["OMR", "ريال عماني"],
  ["omr", "ريال عماني"],
  ["OMR Bank", "ريال عماني البنك"],
  ["OMR Market", "ريال عماني السوق"],
  ["Qatar Riyal", "ريال قطري"],
  ["QAR", "ريال قطري"],
  ["qar", "ريال قطري"],
  ["QAR Bank", "ريال قطري البنك"],
  ["QAR Market", "ريال قطري السوق"],
  ["Chinese Yuan", "يوان صيني"],
  ["CNY", "يوان صيني"],
  ["cny", "يوان صيني"],
  ["CNY Bank", "يوان صيني البنك"],
  ["CNY Market", "يوان صيني السوق"],
  ["Bahrain Dinar", "دينار بحريني"],
  ["BHD", "دينار بحريني"],
  ["bhd", "دينار بحريني"],
  ["BHD Bank", "دينار بحريني البنك"],
  ["BHD Market", "دينار بحريني السوق"],
  ["Jordanian Dinar", "دينار أردني"],
  ["JOD", "دينار أردني"],
  ["jod", "دينار أردني"],
  ["JOD Bank", "دينار أردني البنك"],
  ["JOD Market", "دينار أردني السوق"],
  ["Canadian Dollar", "دولار كندي"],
  ["CAD", "دولار كندي"],
  ["cad", "دولار كندي"],
  ["CAD Bank", "دولار كندي البنك"],
  ["CAD Market", "دولار كندي السوق"],
  ["Australian Dollar", "دولار استرالي"],
  ["AUD", "دولار استرالي"],
  ["aud", "دولار استرالي"],
  ["AUD Bank", "دولار استرالي البنك"],
  ["AUD Market", "دولار استرالي السوق"],
  ["Japanese Yen", "ين ياباني"],
  ["JPY", "ين ياباني"],
  ["jpy", "ين ياباني"],
  ["JPY Bank", "ين ياباني البنك"],
  ["JPY Market", "ين ياباني السوق"],
  ["Swedish Krona", "كرون سويدي"],
  ["SEK", "كرون سويدي"],
  ["sek", "كرون سويدي"],
  ["SEK Bank", "كرون سويدي البنك"],
  ["SEK Market", "كرون سويدي السوق"],
  ["Swiss Franc", "فرنك سويسري"],
  ["CHF", "فرنك سويسري"],
  ["chf", "فرنك سويسري"],
  ["CHF Bank", "فرنك سويسري البنك"],
  ["CHF Market", "فرنك سويسري السوق"],
  ["Norwegian Krone", "كرون نرويجي"],
  ["NOK", "كرون نرويجي"],
  ["nok", "كرون نرويجي"],
  ["NOK Bank", "كرون نرويجي البنك"],
  ["NOK Market", "كرون نرويجي السوق"],
  ["Dinish Krone", "كرون دانماركي"],
  ["DKK", "كرون دانماركي"],
  ["dkk", "كرون دانماركي"],
  ["DKK Bank", "كرون دانماركي البنك"],
  ["DKK Market", "كرون دانماركي السوق"],

  // Gasoline
  ["Gasoline 95", "بنزين 95"],
  ["Gasoline 92", "بنزين 92"],
  ["Gasoline 80", "بنزين 80"],
  ["Kerosene", "الكيروسين"],
  ["Solar", "السولار"],
  ["Stove Cylinder", "إسطوانة البوتاجاز"],
]);

// page_btn_id => page_id
const page_btn = new Map([
  ["settingsPage", "settings_page_btn"],
  ["calculatorPage", "calculator_page_btn"],
  ["searchPage", "search_page_btn"],
  ["goldPage", "gold_page_btn"],
  ["silverPage", "silver_page_btn"],
  ["mainPage", "main_page_btn"],
  ["currencyPage", "currency_page_btn"],
  ["gasolinePage", "gasoline_page_btn"],
]);

// calculator_id => option_btn_id
const calc_opt = new Map([
  ["goldCalc", "goldOpt"],
  ["silverCalc", "silverOpt"],
  ["saghaCalc", "saghaOpt"],
  ["bankCalc", "bankOpt"],
  ["marketCalc", "marketOpt"],
  ["gasCalc", "gasOpt"],
]);

// calculator_id => option_btn_id
const currency_opt = new Map([
  ["bankInfo", "bankInfoOpt"],
  ["marketInfo", "marketInfoOpt"],
]);

const search_map = [
  [
    ["sagha usd", "دولار الصاغة"],
    {
      img: "sagha-usd",
      name: "Sagha USD",
      price: "sagha_usd_b",
    },
  ],
  [
    ["gold ounce", "اونصة الذهب"],
    {
      img: "gold",
      name: "Gold Ounce",
      price: "goldO_egp_b",
    },
  ],
  [
    ["gold pound", "جنية ذهب"],
    {
      img: "gold-pound",
      name: "Gold Pound",
      price: "goldP_egp_b",
    },
  ],
  [
    ["gold 24 karat", "ذهب عيار 24"],
    {
      img: "24k",
      name: "Gold 24-Karat",
      price: "gold24_egp_b",
    },
  ],
  [
    ["gold 22 karat", "ذهب عيار 22"],
    {
      img: "22k",
      name: "Gold 22-Karat",
      price: "gold22_egp_b",
    },
  ],
  [
    ["gold 21 karat", "ذهب عيار 21"],
    {
      img: "21k",
      name: "Gold 21-Karat",
      price: "gold21_egp_b",
    },
  ],
  [
    ["gold 18 karat", "ذهب عيار 18"],
    {
      img: "18k",
      name: "Gold 18-Karat",
      price: "gold18_egp_b",
    },
  ],
  [
    ["gold 14 karat", "ذهب عيار 14"],
    {
      img: "14k",
      name: "Gold 14-Karat",
      price: "gold14_egp_b",
    },
  ],
  [
    ["gold 12 karat", "ذهب عيار 12"],
    {
      img: "12k",
      name: "Gold 12-Karat",
      price: "gold12_egp_b",
    },
  ],
  [
    ["gold 9 karat", "ذهب عيار 9"],
    {
      img: "9k",
      name: "Gold 9-Karat",
      price: "gold9_egp_b",
    },
  ],
  [
    ["silver ounce", "اونصة الفضة"],
    {
      img: "silver",
      name: "Silver Ounce",
      price: "silOZ_egp_b",
    },
  ],
  [
    ["silver 999", "فضة 999"],
    {
      img: "999k",
      name: "Silver 999",
      price: "sil999_egp_b",
    },
  ],
  [
    ["silver 960", "فضة 960"],
    {
      img: "960k",
      name: "Silver 960",
      price: "sil960_egp_b",
    },
  ],
  [
    ["silver 958", "فضة 958"],
    {
      img: "958k",
      name: "Silver 958",
      price: "sil958_egp_b",
    },
  ],
  [
    ["silver 950", "فضة 950"],
    {
      img: "950k",
      name: "Silver 950",
      price: "sil950_egp_b",
    },
  ],
  [
    ["silver 947", "فضة 947"],
    {
      img: "947k",
      name: "Silver 947",
      price: "sil947_egp_b",
    },
  ],
  [
    ["silver 925", "فضة 925"],
    {
      img: "925k",
      name: "Silver 925",
      price: "sil925_egp_b",
    },
  ],
  [
    ["silver 800", "فضة 800"],
    {
      img: "800k",
      name: "Silver 800",
      price: "sil800_egp_b",
    },
  ],
  [
    ["usd", "دولار امريكي"],
    {
      img: "USD",
      name: "USD Bank",
      price: "usd_egp_b",
    },
  ],
  [
    ["usd", "دولار امريكي"],
    {
      img: "USD",
      name: "USD Market",
      price: "usd_egp_bm_b",
    },
  ],
  [
    ["sar", "ريال سعودي"],
    {
      img: "SAR",
      name: "SAR Bank",
      price: "sar_egp_b",
    },
  ],
  [
    ["sar", "ريال سعودي"],
    {
      img: "SAR",
      name: "SAR Market",
      price: "sar_egp_bm_b",
    },
  ],
  [
    ["eur", "يورو"],
    {
      img: "EUR",
      name: "EUR Bank",
      price: "eur_egp_b",
    },
  ],
  [
    ["eur", "يورو"],
    {
      img: "EUR",
      name: "EUR Market",
      price: "eur_egp_bm_b",
    },
  ],
  [
    ["aed", "درهم إماراتي"],
    {
      img: "AED",
      name: "AED Bank",
      price: "aed_egp_b",
    },
  ],
  [
    ["aed", "درهم إماراتي"],
    {
      img: "AED",
      name: "AED Market",
      price: "aed_egp_bm_b",
    },
  ],
  [
    ["kwd", "دينار كويتي"],
    {
      img: "KWD",
      name: "KWD Bank",
      price: "kwd_egp_b",
    },
  ],
  [
    ["kwd", "دينار كويتي"],
    {
      img: "KWD",
      name: "KWD Market",
      price: "kwd_egp_bm_b",
    },
  ],
  [
    ["gbp", "جنية إسترليني"],
    {
      img: "GBP",
      name: "GBP Bank",
      price: "gbp_egp_b",
    },
  ],
  [
    ["gbp", "جنية إسترليني"],
    {
      img: "GBP",
      name: "GBP Market",
      price: "gbp_egp_bm_b",
    },
  ],
  [
    ["omr", "ريال عماني"],
    {
      img: "OMR",
      name: "OMR Bank",
      price: "omr_egp_b",
    },
  ],
  [
    ["omr", "ريال عماني"],
    {
      img: "OMR",
      name: "OMR Market",
      price: "omr_egp_bm_b",
    },
  ],
  [
    ["qar", "ريال قطري"],
    {
      img: "QAR",
      name: "QAR Bank",
      price: "qar_egp_b",
    },
  ],
  [
    ["qar", "ريال قطري"],
    {
      img: "QAR",
      name: "QAR Market",
      price: "qar_egp_bm_b",
    },
  ],
  [
    ["cny", "يوان صيني"],
    {
      img: "CNY",
      name: "CNY Bank",
      price: "cny_egp_b",
    },
  ],
  [
    ["cny", "يوان صيني"],
    {
      img: "CNY",
      name: "CNY Market",
      price: "cny_egp_bm_b",
    },
  ],
  [
    ["bhd", "دينار بحريني"],
    {
      img: "BHD",
      name: "BHD Bank",
      price: "bhd_egp_b",
    },
  ],
  [
    ["bhd", "دينار بحريني"],
    {
      img: "BHD",
      name: "BHD Market",
      price: "bhd_egp_bm_b",
    },
  ],
  [
    ["jod", "دينار أردني"],
    {
      img: "JOD",
      name: "JOD Bank",
      price: "jod_egp_b",
    },
  ],
  [
    ["jod", "دينار أردني"],
    {
      img: "JOD",
      name: "JOD Market",
      price: "jod_egp_bm_b",
    },
  ],
  [
    ["cad", "دولار كندي"],
    {
      img: "CAD",
      name: "CAD Bank",
      price: "cad_egp_b",
    },
  ],
  [
    ["cad", "دولار كندي"],
    {
      img: "CAD",
      name: "CAD Market",
      price: "cad_egp_bm_b",
    },
  ],
  [
    ["aud", "دولار استرالي"],
    {
      img: "AUD",
      name: "AUD Bank",
      price: "aud_egp_b",
    },
  ],
  [
    ["aud", "دولار استرالي"],
    {
      img: "AUD",
      name: "AUD Market",
      price: "aud_egp_bm_b",
    },
  ],
  [
    ["jpy", "ين ياباني"],
    {
      img: "JPY",
      name: "JPY Bank",
      price: "jpy_egp_b",
    },
  ],
  [
    ["jpy", "ين ياباني"],
    {
      img: "JPY",
      name: "JPY Market",
      price: "jpy_egp_bm_b",
    },
  ],
  [
    ["CHF", "فرنك سويسري"],
    {
      img: "CHF",
      name: "CHF Bank",
      price: "chf_egp_b",
    },
  ],
  [
    ["CHF", "فرنك سويسري"],
    {
      img: "CHF",
      name: "CHF Market",
      price: "chf_egp_bm_b",
    },
  ],
  [
    ["NOK", "كرون نرويجي"],
    {
      img: "NOK",
      name: "NOK Bank",
      price: "nok_egp_b",
    },
  ],
  [
    ["NOK", "كرون نرويجي"],
    {
      img: "NOK",
      name: "NOK Market",
      price: "nok_egp_bm_b",
    },
  ],
  [
    ["DKK", "كرون دانماركي"],
    {
      img: "DKK",
      name: "DKK Bank",
      price: "dkk_egp_b",
    },
  ],
  [
    ["DKK", "كرون دانماركي"],
    {
      img: "DKK",
      name: "DKK Market",
      price: "dkk_egp_bm_b",
    },
  ],
  [
    ["gasoline 95", "بنزين 95"],
    {
      img: "gas",
      name: "Gasoline 95",
      price: "gasoline95",
    },
  ],
  [
    ["gasoline 92", "بنزين 92"],
    {
      img: "gas",
      name: "Gasoline 92",
      price: "gasoline92",
    },
  ],
  [
    ["gasoline 80", "بنزين 80"],
    {
      img: "gas",
      name: "Gasoline 80",
      price: "gasoline80",
    },
  ],
  [
    ["kerosene", "كيروسين"],
    {
      img: "gas",
      name: "Kerosene",
      price: "kerosene",
    },
  ],
  [
    ["solar", "سولار"],
    {
      img: "gas",
      name: "Solar",
      price: "solar",
    },
  ],
  [
    ["stove cylinder", "اسطوانة البوتاجاز"],
    {
      img: "stoveCyl",
      name: "Stove Cylinder",
      price: "gas_cyl",
    },
  ],
  [
    ["usdt", "دولار رقمي"],
    {
      img: "usdt",
      name: "USDT",
      price: "usdt_egp",
    },
  ],
];

// used for animate the page after loading
const content = ["header", ".content", "nav"];

// settings_switch_id => action_function
const settings_switches = new Map([["langSwitch", set_lang]]);

const pick = (target, map) => {
  target.classList.add("picked");
  document.getElementById(map.get(target.id)).classList.add("picked");
};

const unpick = (target, map) => {
  target.classList.remove("picked");
  document.getElementById(map.get(target.id)).classList.remove("picked");
};

const bad_internet = () => {
  document.getElementById("badNetPage").style.transform = "none";
};

//===================== Data & tools End ======================

//===================== initialization Start ======================

build_calc_selections();
set_lang();

// get & set data
(async () => {
  if (!testing) {
    try {
      const loadingPage = document.getElementById("loadingPage");
      // get data from api
      const all = await Promise.allSettled([
        fetch("https://eg-prices-api.vercel.app/gold"),
        fetch("https://eg-prices-api.vercel.app/silver"),
        fetch("https://eg-prices-api.vercel.app/prices"),
      ]);

      const res1 = await all[0].value,
        res2 = await all[1].value,
        res3 = await all[2].value;

      if (res1.ok || res2.ok || res3.ok) {
        prices = Object.assign(
          Object.create(null),
          await res1.json(),
          await res2.json(),
          await res3.json()
        );
        set_data(prices);
        // remove loading page & bad internet page
        loadingPage.style.transform = "translateY(-150%)";
        setTimeout(async () => {
          loadingPage.remove();
          document.getElementById("badNetPage").remove();
        }, 1500);
        // set the initial page
        curr_page = document.querySelector(`.page[data-num="${initial_page}"]`);
        pick(curr_page, page_btn);
        // set the initial calculator
        curr_calc = document.querySelector(`.calc[data-num="${initial_calc}"]`);
        pick(curr_calc, calc_opt);
        // set the initial currency info
        curr_curr = document.querySelector(
          `.currency[data-num="${initial_curr}"]`
        );
        pick(curr_curr, currency_opt);
        // show content
        content.forEach((sel) => {
          document.querySelector(sel).style.transform = "none";
        });
        set_culculators();
        play_live();
      } else {
        // remove loading page
        loadingPage.style.transform = "translateY(-150%)";
        bad_internet();
      }
    } catch (er) {
      // remove loading page
      loadingPage.style.transform = "translateY(-150%)";
      console.error("Error ❌:", er.message);
      bad_internet();
    }
  } else {
    // testing
    prices = await (await fetch("../prices.json")).json();
    set_data(prices);
    curr_page = document.querySelector(`.page[data-num="${initial_page}"]`);
    curr_calc = document.querySelector(`.calc[data-num="${initial_calc}"]`);
    curr_curr = document.querySelector(`.currency[data-num="${initial_curr}"]`);
    pick(curr_page, page_btn);
    pick(curr_calc, calc_opt);
    pick(curr_curr, currency_opt);
    const loadingPage = document.getElementById("loadingPage");
    loadingPage.style.transform = "translateY(-150%)";
    content.forEach((sel) => {
      document.querySelector(sel).style.transform = "none";
    });
    set_culculators();
    live_api_interval = 300000;
    play_live();
  }
})();

//====================== initialization End =======================

//========================= Functions Start =========================

function set_lang() {
  const all_txt = document.querySelectorAll("[data-en]");
  const logo = document.querySelector(".logo > .txt");
  const lang_switch = document.getElementById("langSwitch");
  const searchBox_in = document.querySelector("#searchBox > input");
  const searchIcon = document.querySelector("#searchIcon");

  if (ar) {
    ar = false;
    lang_switch.classList.add("on");
    document.body.classList.add("ar");
    logo.classList.add("ar");

    all_txt.forEach((ele) => {
      const en_txt = ele.dataset.en;
      ele.textContent = en_ar.get(en_txt);
    });

    searchBox_in.placeholder = en_ar.get(searchBox_in.dataset.en);
    searchIcon.classList.add("ar");
    window.localStorage.setItem("lang", "ar");
  } else {
    ar = true;
    lang_switch.classList.remove("on");
    document.body.classList.remove("ar");
    logo.classList.remove("ar");

    all_txt.forEach((ele) => {
      const en_txt = ele.dataset.en;
      ele.textContent = en_txt;
    });

    searchBox_in.placeholder = searchBox_in.dataset.en;
    searchIcon.classList.remove("ar");
    window.localStorage.setItem("lang", "en");
  }
}

function set_data(data) {
  document.querySelectorAll("[data-val]").forEach((el) => {
    el.textContent =
      new Intl.NumberFormat().format(data[el.dataset.val]) || "-";
  });
}

// get & set live data
async function play_live() {
  const color_effect = async (ele, cls) => {
    ele.classList.add(cls);
    setTimeout(async () => {
      ele.classList.remove(cls);
    }, 3000);
  };

  // TV element id => data {}
  const live_map = new Map([
    [
      "goldTv",
      {
        val: "xau_usd",
        delta_num: "xau_usd_delta",
        delta_pt: "xau_usd_delta_pt",
      },
    ],
    [
      "USDEGPTv",
      {
        val: "usd_egp",
        delta_num: "usd_egp_delta",
        delta_pt: "usd_egp_delta_pt",
      },
    ],
  ]);

  const set_data = (_prev, _new) => {
    live_map.forEach(({ val, delta_num, delta_pt }, TV_id) => {
      const TV_el = document.getElementById(TV_id);
      const val_el = TV_el.querySelector(".price-now");
      const delta_el = TV_el.querySelector(".delta");
      const delta_num_el = TV_el.querySelector(".delta-num");
      const delta_pt_el = TV_el.querySelector(".delta-pt");
      // get difference
      const new_val = _new[val];
      const diff = new_val - _prev[val];
      const new_delta_num_val = _new[delta_num];
      // print data
      val_el.textContent = new Intl.NumberFormat().format(new_val);
      delta_num_el.textContent = new_delta_num_val;
      delta_pt_el.textContent = _new[delta_pt];

      if (diff > 0) {
        // increased
        color_effect(val_el, "up");
      } else if (diff < 0) {
        // decreased
        color_effect(val_el, "down");
      } else {
        // no change
        color_effect(val_el, "no-chng");
      }

      if (new_delta_num_val.startsWith("+")) {
        delta_el.classList.add("up");
        delta_el.classList.remove("down");
      } else if (new_delta_num_val.startsWith("-")) {
        delta_el.classList.add("down");
        delta_el.classList.remove("up");
      } else {
        delta_el.classList.remove("down");
        delta_el.classList.remove("up");
      }
    });
    // save the new data
    Live_data = _new;
  };

  const set_differences = () => {
    /* get & set the usd differences */
    const sagha_diff_el = document.getElementById("sagha_usd_diff");
    const market_diff_el = document.getElementById("market_usd_diff");
    // save old diffs
    const old_sagha_diff = +sagha_diff_el.textContent;
    const old_market_diff = +market_diff_el.textContent;
    const new_sagha_diff = +(
      Live_data.usd_egp - prices.sagha_usd_b
    ).toPrecision(4);
    const new_market_diff = +(
      Live_data.usd_egp - prices.usd_egp_bm_b
    ).toPrecision(4);
    // print new data
    sagha_diff_el.textContent = new_sagha_diff;
    market_diff_el.textContent = new_market_diff;

    if (new_sagha_diff > old_sagha_diff) {
      // increased
      color_effect(sagha_diff_el, "up");
    } else if (new_sagha_diff < old_sagha_diff) {
      // decreased
      color_effect(sagha_diff_el, "down");
    } else {
      // no change
      color_effect(sagha_diff_el, "no-chng");
    }

    if (new_market_diff > old_market_diff) {
      // increased
      color_effect(market_diff_el, "up");
    } else if (new_market_diff < old_market_diff) {
      // decreased
      color_effect(market_diff_el, "down");
    } else {
      // no change
      color_effect(market_diff_el, "no-chng");
    }
  };

  const url = "https://eg-prices-api.vercel.app/live";

  // init
  const res = await fetch(url);

  if (res.ok) {
    Live_data = await res.json();
    set_data(Live_data, Live_data);
    set_differences();

    const today = new Date().getUTCDay();

    if (today !== 0 && today !== 6) {
      setInterval(async () => {
        const res = await fetch(url);
        if (res.ok) {
          const new_data = await res.json();
          set_data(Live_data, new_data);
          set_differences();
        }
      }, live_api_interval);
    } else {
      // market is off at weekend (sat - sun)
      live_map.forEach((_, TV_id) => {
        document.getElementById(TV_id).classList.add("off");
      });
    }
  }
}

//========================= Functions End =========================

//========================= Events Start =========================

// currency page options
currency_opt.forEach((opt_id, info_id, ref) => {
  const info = document.getElementById(info_id);
  const opt = document.getElementById(opt_id);

  const show_info = () => {
    if (info !== curr_curr) {
      unpick(curr_curr, ref);
      pick(info, ref);
      curr_curr = info;
    }
  };

  opt.addEventListener("click", show_info);

  opt.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      show_info();
    }
  });
});

// Pages Btns
page_btn.forEach((btn_id, page_id, ref) => {
  const page = document.getElementById(page_id);
  const btn = document.getElementById(btn_id);

  const set_page = () => {
    if (page !== curr_page) {
      unpick(curr_page, ref);
      pick(page, ref);
      curr_page = page;
    }
  };

  btn.addEventListener("click", () => {
    set_page();
  });

  btn.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      set_page();
    }
  });
});

// Settings Switches
settings_switches.forEach((action_fun, switch_id) => {
  const _switch = document.getElementById(switch_id);

  _switch.addEventListener("click", action_fun);

  _switch.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      action_fun();
    }
  });
});

// change page by sliding effect events
{
  const content = document.querySelector(".content");

  const change_page = (curr_pointer_x) => {
    const distance = pointer_x - curr_pointer_x;
    const curr_page_num = +curr_page.dataset.num;
    const is_page = curr_page_num > 0;

    if (Math.abs(distance) >= 90 && is_page) {
      // distance > 0 -> sliding right
      // distance < 0 -> sliding left
      const dir = (distance > 0 ? 1 : -1) * (ar ? 1 : -1);
      const num = curr_page_num + dir;
      const page_num = num < 1 ? page_count : num > page_count ? 1 : num;
      const page = document.querySelector(`.page[data-num="${page_num}"]`);
      unpick(curr_page, page_btn);
      pick(page, page_btn);
      curr_page = page;
    }
  };

  content.addEventListener("pointerdown", (e) => {
    pointer_x = e.pageX;
  });

  // if on chrome use (touchend) event else use (poiterup) event
  if (navigator.userAgent.indexOf("Chrome") > -1) {
    content.addEventListener("touchend", (e) => {
      change_page(e.changedTouches[0].pageX);
    });
  } else {
    content.addEventListener("pointerup", (e) => {
      change_page(e.pageX);
    });
  }
}

//========================== Events End ==========================

//========================== Calculator Start ========================

// build calculators selections
function build_calc_selections() {
  // <select> id => [ array of options of [ array of data attributes ]+ ]+
  const calc_selections = new Map([
    [
      "goldKaratSel",
      [
        [
          ["price", "gold24_egp_b"],
          ["en", "24 Karat"],
          ["unit", "gram"],
        ],
        [
          ["price", "gold22_egp_b"],
          ["en", "22 Karat"],
          ["unit", "gram"],
        ],
        [
          ["price", "gold21_egp_b"],
          ["en", "21 Karat"],
          ["unit", "gram"],
        ],
        [
          ["price", "gold18_egp_b"],
          ["en", "18 Karat"],
          ["unit", "gram"],
        ],
        [
          ["price", "gold14_egp_b"],
          ["en", "14 Karat"],
          ["unit", "gram"],
        ],
        [
          ["price", "gold12_egp_b"],
          ["en", "12 Karat"],
          ["unit", "gram"],
        ],
        [
          ["price", "gold9_egp_b"],
          ["en", "9 Karat"],
          ["unit", "gram"],
        ],
        [
          ["price", "goldO_egp_b"],
          ["en", "Gold Ounce"],
          ["unit", "ounce"],
        ],
        [
          ["price", "goldP_egp_b"],
          ["en", "Gold Pound"],
          ["unit", "gold pound"],
        ],
      ],
    ],

    [
      "silverKaratSel",
      [
        [
          ["price", "sil999_egp_b"],
          ["en", "Silver 999"],
          ["unit", "gram"],
        ],
        [
          ["price", "sil960_egp_b"],
          ["en", "Silver 960"],
          ["unit", "gram"],
        ],
        [
          ["price", "sil958_egp_b"],
          ["en", "Silver 958"],
          ["unit", "gram"],
        ],
        [
          ["price", "sil950_egp_b"],
          ["en", "Silver 950"],
          ["unit", "gram"],
        ],
        [
          ["price", "sil947_egp_b"],
          ["en", "Silver 947"],
          ["unit", "gram"],
        ],
        [
          ["price", "sil925_egp_b"],
          ["en", "Silver 925"],
          ["unit", "gram"],
        ],
        [
          ["price", "sil800_egp_b"],
          ["en", "Silver 800"],
          ["unit", "gram"],
        ],
        [
          ["price", "silOZ_egp_b"],
          ["en", "Silver Ounce"],
          ["unit", "ounce"],
        ],
      ],
    ],

    [
      "saghaXSel",
      [
        [
          ["price", "sagha_usd_b"],
          ["en", "USD"],
          ["unit", "USD"],
        ],
      ],
    ],

    [
      "saghaSel",
      [
        [
          ["price", ""],
          ["en", " EGP "],
          ["unit", " EGP "],
        ],
      ],
    ],

    [
      "bankXSel",
      [
        [
          ["price", "usd_egp_b"],
          ["en", "USD"],
          ["unit", "USD"],
        ],
        [
          ["price", "sar_egp_b"],
          ["en", "SAR"],
          ["unit", "SAR"],
        ],
        [
          ["price", "eur_egp_b"],
          ["en", "EUR"],
          ["unit", "EUR"],
        ],
        [
          ["price", "aed_egp_b"],
          ["en", "AED"],
          ["unit", "AED"],
        ],
        [
          ["price", "kwd_egp_b"],
          ["en", "KWD"],
          ["unit", "KWD"],
        ],
        [
          ["price", "gbp_egp_b"],
          ["en", "GBP"],
          ["unit", "GBP"],
        ],
        [
          ["price", "omr_egp_b"],
          ["en", "OMR"],
          ["unit", "OMR"],
        ],
        [
          ["price", "qar_egp_b"],
          ["en", "QAR"],
          ["unit", "QAR"],
        ],
        [
          ["price", "cny_egp_b"],
          ["en", "CNY"],
          ["unit", "CNY"],
        ],
        [
          ["price", "bhd_egp_b"],
          ["en", "BHD"],
          ["unit", "BHD"],
        ],
        [
          ["price", "jod_egp_b"],
          ["en", "JOD"],
          ["unit", "JOD"],
        ],
        [
          ["price", "cad_egp_b"],
          ["en", "CAD"],
          ["unit", "CAD"],
        ],
        [
          ["price", "aud_egp_b"],
          ["en", "AUD"],
          ["unit", "AUD"],
        ],
        [
          ["price", "jpy_egp_b"],
          ["en", "JPY"],
          ["unit", "JPY"],
        ],
        [
          ["price", "chf_egp_b"],
          ["en", "CHF"],
          ["unit", "CHF"],
        ],
        [
          ["price", "sek_egp_b"],
          ["en", "SEK"],
          ["unit", "SEK"],
        ],
        [
          ["price", "nok_egp_b"],
          ["en", "NOK"],
          ["unit", "NOK"],
        ],
        [
          ["price", "dkk_egp_b"],
          ["en", "DKK"],
          ["unit", "DKK"],
        ],
      ],
    ],

    [
      "bankSel",
      [
        [
          ["price", ""],
          ["en", " EGP "],
          ["unit", " EGP "],
        ],
      ],
    ],

    [
      "marketXSel",
      [
        [
          ["price", "usd_egp_bm_b"],
          ["en", "USD"],
          ["unit", "USD"],
        ],
        [
          ["price", "sar_egp_bm_b"],
          ["en", "SAR"],
          ["unit", "SAR"],
        ],
        [
          ["price", "eur_egp_bm_b"],
          ["en", "EUR"],
          ["unit", "EUR"],
        ],
        [
          ["price", "aed_egp_bm_b"],
          ["en", "AED"],
          ["unit", "AED"],
        ],
        [
          ["price", "kwd_egp_bm_b"],
          ["en", "KWD"],
          ["unit", "KWD"],
        ],
        [
          ["price", "gbp_egp_bm_b"],
          ["en", "GBP"],
          ["unit", "GBP"],
        ],
        [
          ["price", "omr_egp_bm_b"],
          ["en", "OMR"],
          ["unit", "OMR"],
        ],
        [
          ["price", "qar_egp_bm_b"],
          ["en", "QAR"],
          ["unit", "QAR"],
        ],
        [
          ["price", "cny_egp_bm_b"],
          ["en", "CNY"],
          ["unit", "CNY"],
        ],
        [
          ["price", "bhd_egp_bm_b"],
          ["en", "BHD"],
          ["unit", "BHD"],
        ],
        [
          ["price", "jod_egp_bm_b"],
          ["en", "JOD"],
          ["unit", "JOD"],
        ],
        [
          ["price", "cad_egp_bm_b"],
          ["en", "CAD"],
          ["unit", "CAD"],
        ],
        [
          ["price", "aud_egp_bm_b"],
          ["en", "AUD"],
          ["unit", "AUD"],
        ],
        [
          ["price", "jpy_egp_bm_b"],
          ["en", "JPY"],
          ["unit", "JPY"],
        ],
        [
          ["price", "chf_egp_bm_b"],
          ["en", "CHF"],
          ["unit", "CHF"],
        ],
        [
          ["price", "sek_egp_bm_b"],
          ["en", "SEK"],
          ["unit", "SEK"],
        ],
        [
          ["price", "nok_egp_bm_b"],
          ["en", "NOK"],
          ["unit", "NOK"],
        ],
        [
          ["price", "dkk_egp_bm_b"],
          ["en", "DKK"],
          ["unit", "DKK"],
        ],
      ],
    ],

    [
      "marketSel",
      [
        [
          ["price", ""],
          ["en", " EGP "],
          ["unit", " EGP "],
        ],
      ],
    ],

    [
      "gasSel",
      [
        [
          ["price", "gasoline95"],
          ["en", "Gasoline 95"],
          ["unit", "liter"],
        ],
        [
          ["price", "gasoline92"],
          ["en", "Gasoline 92"],
          ["unit", "liter"],
        ],
        [
          ["price", "gasoline80"],
          ["en", "Gasoline 80"],
          ["unit", "liter"],
        ],
        [
          ["price", "kerosene"],
          ["en", "Kerosene"],
          ["unit", "liter"],
        ],
        [
          ["price", "solar"],
          ["en", "Solar"],
          ["unit", "liter"],
        ],
        [
          ["price", "gas_cyl"],
          ["en", "Stove Cylinder"],
          ["unit", "cylinder"],
        ],
      ],
    ],
  ]);

  calc_selections.forEach((options, sel_id) => {
    const sel_ele = document.getElementById(sel_id);
    const frag = new DocumentFragment();

    options.forEach((option) => {
      const opt_ele = document.createElement("option");

      option.forEach(([prop, val]) => {
        opt_ele.dataset[prop] = val;
      });

      frag.appendChild(opt_ele);
    });

    sel_ele.appendChild(frag);
    // select the 1st option
    sel_ele.firstChild.selected = true;

    if (sel_ele.classList.contains("one-option")) {
      // make select element responseless
      sel_ele.addEventListener("mousedown", (e) => {
        e.preventDefault();
      });
    }
  });
}

// used with gold & silver & gas
const non_currnecy_calc = (calc) => {
  const input = calc.querySelector(".calc_in");
  const input_unit = calc.querySelector(".input > label > .unit");
  const selections = calc.querySelector(".calc_sel");
  const output = calc.querySelector(".calc_out");

  // init the input
  input.value = 0;
  // init the output
  output.textContent = 0;

  const set_label_unit = (sels) => {
    const unit_en = sels.selectedOptions[0].dataset.unit;
    const txt = ar ? unit_en : en_ar.get(unit_en);
    input_unit.dataset.en = unit_en;
    input_unit.textContent = txt;
  };

  // set the input label unit
  set_label_unit(selections);

  // set options values
  selections.querySelectorAll("option").forEach((opt) => {
    const price = prices[opt.dataset.price];
    opt.value = price;
  });

  // calculate at input events
  selections.addEventListener("input", (e) => {
    const sels = e.target;
    const price = sels.value;
    output.textContent = new Intl.NumberFormat().format(price * input.value);

    // update the input unit label
    set_label_unit(sels);
  });
  input.addEventListener("input", (e) => {
    const price = selections.value;
    output.textContent = new Intl.NumberFormat().format(price * e.target.value);
  });
};

// used with currency
const currency_calc = (calc) => {
  // elements for initialization
  const xEGP_sel = calc.querySelector(".calc_sel.xEGP");
  const EGP_sel = calc.querySelector(".calc_sel.EGP");
  const in_from = calc.querySelector(".calc_in.from");
  const in_to = calc.querySelector(".calc_in.EGP");
  const out_from = calc.querySelector(".calc_out.from");
  const out_to = calc.querySelector(".calc_out.to");
  const reset_btn = calc.querySelector("i.reset");
  const swap_btn = calc.querySelector("i.swap");

  // Tools & funcs
  //------------------------------------------------
  // used to set & update the egp option value
  // with the current other currency
  const set_egp_opt_val = (egp_sel, xegp_sel) => {
    const egp_opt = egp_sel.selectedOptions[0];
    const xegp_opt = xegp_sel.selectedOptions[0];
    const price = prices[xegp_opt.dataset.price];
    egp_opt.value = 1 / price; // save the price
  };
  // set the currency unit
  const set_units = (isSwapped = false) => {
    const sel_from = calc.querySelector(".calc_sel.from");
    const sel_to = calc.querySelector(".calc_sel.to");
    const unit_from = calc.querySelector(".unit.from");
    const unit_to = calc.querySelector(".unit.to");

    const unit_from_en = sel_from.selectedOptions[0].dataset.unit;
    const unit_to_en = sel_to.selectedOptions[0].dataset.unit;
    const from_txt = ar ? unit_from_en : en_ar.get(unit_from_en);
    const to_txt = ar ? unit_to_en : en_ar.get(unit_to_en);

    if (isSwapped) {
      unit_from.dataset.en = unit_to_en;
      unit_from.textContent = to_txt;
      unit_to.dataset.en = unit_from_en;
      unit_to.textContent = from_txt;
    } else {
      unit_from.dataset.en = unit_from_en;
      unit_from.textContent = from_txt;
      unit_to.dataset.en = unit_to_en;
      unit_to.textContent = to_txt;
    }
  };
  // init the i/p - o/p
  const zero_fill = () => {
    in_from.value = in_to.value = 0;
    out_from.textContent = 0;
    out_to.textContent = 0;
  };
  // reverse the layout
  const toggle_all = () => {
    // toggle all (from <=> to)
    [".calc_sel", ".calc_out", ".unit"].forEach((sel) => {
      calc.querySelectorAll(sel).forEach((ele) => {
        ele.classList.toggle("from");
        ele.classList.toggle("to");
      });
    });
  };
  // calculations
  const calculate = (isFrom, isSwapped) => {
    // if isFrom === true => the input comes from (in_from)
    // if isFrom === false => the input comes from (in_to)
    // input_val => the changed input value

    // output elements
    const out_from_el = calc.querySelector(".calc_out.from");
    const out_to_el = calc.querySelector(".calc_out.to");

    const frmt = new Intl.NumberFormat(); // number formatter

    if (isFrom) {
      const input_val = in_from.value;
      const price =
        calc.querySelector(".calc_sel.from").selectedOptions[0].value;

      const total = (price * input_val).toFixed(precision);
      in_to.value = total;

      if (isSwapped) {
        out_from_el.textContent = frmt.format(total);
        out_to_el.textContent = frmt.format(input_val);
      } else {
        out_from_el.textContent = frmt.format(input_val);
        out_to_el.textContent = frmt.format(total);
      }
    } else {
      const input_val = in_to.value;
      const price = calc.querySelector(".calc_sel.to").selectedOptions[0].value;

      const total = (price * input_val).toFixed(precision);
      in_from.value = total;

      if (isSwapped) {
        out_from_el.textContent = frmt.format(input_val);
        out_to_el.textContent = frmt.format(total);
      } else {
        out_from_el.textContent = frmt.format(total);
        out_to_el.textContent = frmt.format(input_val);
      }
    }
  };
  //------------------------------------------------

  zero_fill();

  // set other currencies options values
  xEGP_sel.querySelectorAll("option").forEach((opt) => {
    const price = prices[opt.dataset.price];
    opt.value = price;
  });

  set_units();
  set_egp_opt_val(EGP_sel, xEGP_sel);

  // update at input
  //----------------------------------------
  in_from.addEventListener("input", (e) => {
    const isSwapped = calc.classList.contains("swapped");
    calculate(true, isSwapped);
  });
  in_to.addEventListener("input", (e) => {
    const isSwapped = calc.classList.contains("swapped");
    calculate(false, isSwapped);
  });
  xEGP_sel.addEventListener("input", (e) => {
    const xegp_sel = e.target;
    const isSwapped = calc.classList.contains("swapped");
    set_egp_opt_val(EGP_sel, xegp_sel);
    set_units(isSwapped);
    calculate(!isSwapped, isSwapped);
  });
  //----------------------------------------

  // swap
  swap_btn.addEventListener("click", (e) => {
    // reverse the layout
    const isSwapped = calc.classList.toggle("swapped");
    toggle_all();

    // swap units
    set_units(isSwapped);
    calculate(true, isSwapped);
  });

  // reset
  reset_btn.addEventListener("click", (e) => {
    // reset all
    const isSwapped = calc.classList.contains("swapped");
    if (isSwapped) {
      calc.classList.remove("swapped");
      toggle_all();
      set_units();
    }
    zero_fill();
  });
};

// calculators set function
function set_culculators() {
  calc_opt.forEach((opt_id, calc_id, ref) => {
    const calc = document.getElementById(calc_id);
    const opt = document.getElementById(opt_id);

    // Calculators Options
    //--------------------------------------------------
    const show_calc = () => {
      if (calc !== curr_calc) {
        unpick(curr_calc, ref);
        pick(calc, ref);
        curr_calc = calc;
      }
    };

    opt.addEventListener("click", show_calc);

    opt.addEventListener("keydown", (e) => {
      if (e.code === "Enter" || e.code === "Space") {
        show_calc();
      }
    });
    //--------------------------------------------------

    // Calculator logic
    //--------------------------------------------------
    /*
    calc_type:
      0 => non-currency
      1 => currency
  */
    if (+calc.dataset.calctype) {
      // Currency calculations
      currency_calc(calc);
    } else {
      // non-Currency calculations
      non_currnecy_calc(calc);
    }
    //--------------------------------------------------
  });
}

//========================== Calculator End ==========================

//========================== Search Start ==========================

const __search = (inp) => {
  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  search_map.forEach(([[en_key, ar_key], { img, name, price }]) => {
    const match = ar
      ? inp.split("").every((ch, i) => ch.toLowerCase() === en_key[i])
      : inp.split("").every((ch, i) => ch === ar_key[i]);

    if (match) {
      const [_name, unit] = ar
        ? [name, "EGP"]
        : [en_ar.get(name), en_ar.get("EGP")];

      results.innerHTML += `
        <div class="info-card" tabindex="0">
          <img src="./files/imgs/${img}.svg" />
          <div class="info">
            <div class="name" data-en="${name}">${_name}</div>
            <div class="price">
              <div class="val" data-val="${price}">${new Intl.NumberFormat().format(
        prices[price]
      )}</div>
              <div class="unit" data-en="EGP">${unit}</div>
            </div>
          </div>
        </div>
    `;
    }
  });
};

{
  const searchBox = document.getElementById("searchBox");
  const searchIcon = document.getElementById("searchIcon");
  const searchIn = document.getElementById("searchIn");

  searchBox.addEventListener("click", (e) => {
    searchBox.querySelector("input[type='text']").focus();
  });

  searchBox.addEventListener("focusin", (e) => {
    if (!ar) {
      searchIcon.classList.remove("ar");
    }
  });

  searchBox.addEventListener("focusout", (e) => {
    if (!ar) {
      searchIcon.classList.add("ar");
    }
  });

  // searching
  searchIn.addEventListener("input", (e) => {
    const in_val = e.target.value;

    if (in_val) {
      __search(in_val);
    } else {
      document.getElementById("searchResults").innerHTML = "";
    }
  });
}
//=========================== Search End ===========================
