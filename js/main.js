//==================== Data & tools Start =====================
let testing = true; // used for testing
let ar = true; // en: false | ar: true (app language)
let pointer_x = 0; // holds the pointerdown event x coordinate (pageX) - used for scrolling through pages
const page_count = 5; // main pages count
let curr_page = null; // holds the curr page
let curr_calc = null; // holds the curr calculator
const initial_page = 1;
const initial_calc = 3;
let prices = null; // object hold all prices
const precision = 2;

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

  // units
  ["liter", "لتر"],
  ["gram", "جرام"],
  ["ounce", "أونصة"],
  ["cylinder", "إسطوانة"],
  ["gold pound", "جنية ذهب"],

  // Gold
  ["Gold Ounce", "أونصة الذهب"],
  ["Gold Pound", "جنية ذهب"],
  ["Gold's USD", "دولار الصاغة"],
  ["Goldsmiths USD", "دولار الصاغة"],
  ["Goldsmiths", "الصاغة"],
  ["24-karat", "عيار 24"],
  ["22-karat", "عيار 22"],
  ["21-karat", "عيار 21"],
  ["18-karat", "عيار 18"],
  ["14-karat", "عيار 14"],
  ["12-karat", "عيار 12"],
  ["9-karat", "عيار 9"],
  ["Gold Calculator", "حاسبة الذهب"],
  ["Goldsmiths Calculator", "حاسبة الصاغة"],
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
  ["Currency", "العملة"],
  ["Dollar", "دولار"],
  ["Egyptian Pound", "جنية مصري"],
  [" EGP ", "جنية مصري"],
  ["EGP", "ج.م"],
  ["US Dollar", "دولار أمريكي"],
  ["USD", "دولار أمريكي"],
  ["Euro", "يورو"],
  ["EUR", "يورو"],
  ["Sterling Pound", "جنية إسترليني"],
  ["GBP", "جنية إسترليني"],
  ["Saudi Riyal", "ريال سعودي"],
  ["SAR", "ريال سعودي"],
  ["UAE Dirham", "درهم إماراتي"],
  ["AED", "درهم إماراتي"],
  ["Kuwait Dinar", "دينار كويتي"],
  ["KWD", "دينار كويتي"],
  ["Oman Riyal", "ريال عماني"],
  ["OMR", "ريال عماني"],
  ["Qatar Riyal", "ريال قطري"],
  ["QAR", "ريال قطري"],
  ["Chinese Yuan", "يوان صيني"],
  ["CNY", "يوان صيني"],
  ["Bahrain Dinar", "دينار بحريني"],
  ["BHD", "دينار بحريني"],
  ["Jordanian Dinar", "دينار أردني"],
  ["JOD", "دينار أردني"],
  ["Canadian Dollar", "دولار كندي"],
  ["CAD", "دولار كندي"],
  ["Australian Dollar", "دولار استرالي"],
  ["AUD", "دولار استرالي"],
  ["Japanese Yen", "ين ياباني"],
  ["JPY", "ين ياباني"],
  ["Swedish Krona", "كرون سويدي"],
  ["SEK", "كرون سويدي"],
  ["Swiss Franc", "فرنك سويسري"],
  ["CHF", "فرنك سويسري"],
  ["Norwegian Krone", "كرون نرويجي"],
  ["NOK", "كرون نرويجي"],
  ["Dinish Krone", "كرون دانمركي"],
  ["DKK", "كرون دانمركي"],

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
  ["goldPage", "gold_page_btn"],
  ["silverPage", "silver_page_btn"],
  ["bankPage", "bank_page_btn"],
  ["marketPage", "market_page_btn"],
  ["gasolinePage", "gasoline_page_btn"],
]);

// calculator_page_id => option_btn_id
const calc_opt = new Map([
  ["goldCalc", "goldOpt"],
  ["silverCalc", "silverOpt"],
  ["GoldsmithsCalc", "GoldsmithsOpt"],
  ["bankCalc", "bankOpt"],
  ["marketCalc", "marketOpt"],
  ["gasCalc", "gasOpt"],
]);

// <select> id => [ array of options of [ array of data attributes ]+ ]+
const calc_selections = new Map([
  [
    "goldKaratSel",
    [
      [
        ["price", "gold24_egp_b"],
        ["en", "24-karat"],
        ["unit", "gram"],
      ],
      [
        ["price", "gold22_egp_b"],
        ["en", "22-karat"],
        ["unit", "gram"],
      ],
      [
        ["price", "gold21_egp_b"],
        ["en", "21-karat"],
        ["unit", "gram"],
      ],
      [
        ["price", "gold18_egp_b"],
        ["en", "18-karat"],
        ["unit", "gram"],
      ],
      [
        ["price", "gold14_egp_b"],
        ["en", "14-karat"],
        ["unit", "gram"],
      ],
      [
        ["price", "12_egp_b"],
        ["en", "12-karat"],
        ["unit", "gram"],
      ],
      [
        ["price", "gold9_egp_b"],
        ["en", "9-karat"],
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
    "goldsmithsXSel",
    [
      [
        ["price", "usd_gold"],
        ["en", "USD"],
        ["unit", "USD"],
      ],
    ],
  ],

  [
    "goldsmithsSel",
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
        ["price", "sek_egp_b"],
        ["en", "SEK"],
        ["unit", "SEK"],
      ],
      [
        ["price", "chf_egp_b"],
        ["en", "CHF"],
        ["unit", "CHF"],
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
        ["price", "sek_egp_bm_b"],
        ["en", "SEK"],
        ["unit", "SEK"],
      ],
      [
        ["price", "chf_egp_bm_b"],
        ["en", "CHF"],
        ["unit", "CHF"],
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

// data init
(async () => {
  if (!testing) {
    // show loading page
    const loadingPage = document.getElementById("loadingPage");
    try {
      // get data from api
      const res = await fetch("https://eg-prices-api.vercel.app/");

      if (res.ok) {
        prices = await res.json();
        set_data(prices);
        // remove loading page
        loadingPage.style.transform = "translateY(-150%)";
        // set the initial page
        curr_page = document.querySelector(`.page[data-num="${initial_page}"]`);
        pick(curr_page, page_btn);
        // set the initial calculator
        curr_calc = document.querySelector(`.calc[data-num="${initial_calc}"]`);
        pick(curr_calc, calc_opt);
        // show content
        content.forEach((sel) => {
          document.querySelector(sel).style.transform = "none";
        });
        set_culculators();
      } else {
        // remove loading page
        loadingPage.style.transform = "translateY(-150%)";
        bad_internet();
      }
    } catch (er) {
      // remove loading page
      loadingPage.style.transform = "translateY(-150%)";
      console.error("Fetch Error ❌:", er.message);
      bad_internet();
    }
  } else {
    // testing
    prices = await (await fetch("../prices.json")).json();
    set_data(prices);
    curr_page = document.querySelector(`.page[data-num="${initial_page}"]`);
    curr_calc = document.querySelector(`.calc[data-num="${initial_calc}"]`);
    pick(curr_page, page_btn);
    pick(curr_calc, calc_opt);
    const loadingPage = document.getElementById("loadingPage");
    loadingPage.style.transform = "translateY(-150%)";
    content.forEach((sel) => {
      document.querySelector(sel).style.transform = "none";
    });
    set_culculators();
  }
})();
//====================== initialization End =======================

//========================= Functions Start =========================

function set_lang() {
  const all_txt = document.querySelectorAll("[data-en]");
  const logo = document.querySelector(".logo > .txt");
  const _switch = document.getElementById("langSwitch");

  if (ar) {
    ar = false;
    _switch.classList.add("on");
    document.body.classList.add("ar");
    logo.classList.add("ar");

    all_txt.forEach((ele) => {
      const en_txt = ele.dataset.en;
      ele.textContent = en_ar.get(en_txt);
    });
  } else {
    ar = true;
    _switch.classList.remove("on");
    document.body.classList.remove("ar");
    logo.classList.remove("ar");

    all_txt.forEach((ele) => {
      const en_txt = ele.dataset.en;
      ele.textContent = en_txt;
    });
  }
}

function set_data(data) {
  document.querySelectorAll("[data-val]").forEach((el) => {
    el.textContent = data[el.dataset.val] || "-";
  });
}

//========================= Functions End =========================

//========================= Events Start =========================
// Pages Btns
page_btn.forEach((btn_id, page_id) => {
  const page = document.getElementById(page_id);
  const btn = document.getElementById(btn_id);

  const set_page = () => {
    if (page !== curr_page) {
      unpick(curr_page, page_btn);
      pick(page, page_btn);
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

// change page by silding effect events
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
  calc_selections.forEach((options, sel_id) => {
    const sel_ele = document.getElementById(sel_id);

    options.forEach((option) => {
      const opt_ele = document.createElement("option");

      option.forEach(([prop, val]) => {
        opt_ele.dataset[prop] = val;
      });

      sel_ele.appendChild(opt_ele);
    });
    // select the 1st option
    sel_ele.firstChild.selected = true;
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
    output.textContent = price * input.value;

    // update the input unit label
    set_label_unit(sels);
  });
  input.addEventListener("input", (e) => {
    const price = selections.value;
    output.textContent = price * e.target.value;
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
    out_from.textContent = out_to.textContent = 0;
  };
  // calculations
  const calculate = (isFrom, isSwapped) => {
    // if isFrom === true => the input comes from (in_from)
    // if isFrom === false => the input comes from (in_to)
    // input_val => the changed input value

    // output elements
    const out_from_el = calc.querySelector(".calc_out.from");
    const out_to_el = calc.querySelector(".calc_out.to");

    if (isFrom) {
      const input_val = in_from.value;
      const price =
        calc.querySelector(".calc_sel.from").selectedOptions[0].value;

      const total = (price * input_val).toFixed(precision);
      in_to.value = total;

      if (isSwapped) {
        out_from_el.textContent = total;
        out_to_el.textContent = input_val;
      } else {
        out_from_el.textContent = input_val;
        out_to_el.textContent = total;
      }
    } else {
      const input_val = in_to.value;
      const price = calc.querySelector(".calc_sel.to").selectedOptions[0].value;

      const total = (price * input_val).toFixed(precision);
      in_from.value = total;

      if (isSwapped) {
        out_from_el.textContent = input_val;
        out_to_el.textContent = total;
      } else {
        out_from_el.textContent = total;
        out_to_el.textContent = input_val;
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
    // toggle all (from <=> to)
    [".calc_sel", ".calc_out", ".unit"].forEach((sel) => {
      calc.querySelectorAll(sel).forEach((ele) => {
        ele.classList.toggle("from");
        ele.classList.toggle("to");
      });
    });
    // swap units
    set_units(isSwapped);
    calculate(true, isSwapped);
  });

  // reset
  reset_btn.addEventListener("click", (e) => {
    calc.classList.remove("swapped");
    zero_fill();
  });
};

// calculators set function
function set_culculators() {
  calc_opt.forEach((opt_id, calc_id) => {
    const calc = document.getElementById(calc_id);
    const opt = document.getElementById(opt_id);

    // Calculators Options
    //--------------------------------------------------
    const show_calc = () => {
      if (calc !== curr_calc) {
        unpick(curr_calc, calc_opt);
        pick(calc, calc_opt);
        curr_calc = calc;
      }
    };

    opt.addEventListener("click", () => {
      show_calc();
    });

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

// clear consloe
// setInterval(console.clear, 60000);
