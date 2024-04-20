//=================== Dependances Start ====================
//==================== Dependances End =====================

//==================== Data & tools Start =====================
let run = true;
let curr_page = null;
let ar = true; // en: false | ar: true

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
  ["Gasoline", "البنزين"],
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
  ["liter", "لتر"],

  // Gold
  ["Gold Ounce", "أونصة الذهب"],
  ["Gold Pound", "جنية ذهب"],
  ["24-karat", "عيار 24"],
  ["22-karat", "عيار 22"],
  ["21-karat", "عيار 21"],
  ["18-karat", "عيار 18"],
  ["14-karat", "عيار 14"],
  ["12-karat", "عيار 12"],
  ["9-karat", "عيار 9"],

  // Silver
  ["Silver Ounce", "أونصة الفضة"],
  ["Silver 999", "فضة 999"],
  ["Silver 960", "فضة 960"],
  ["Silver 958", "فضة 958"],
  ["Silver 950", "فضة 950"],
  ["Silver 947", "فضة 947"],
  ["Silver 925", "فضة 925"],
  ["Silver 800", "فضة 800"],

  // currency
  ["Currency", "العملة"],
  ["USD", "دولار"],
  ["EGP", "ج.م"],
  ["US Dollar", "دولار أمريكي"],
  ["Euro", "يورو"],
  ["Sterling Pound", "جنية إسترليني"],
  ["Saudi Riyal", "ريال سعودي"],
  ["UAE Dirham", "درهم إماراتي"],
  ["Kuwait Dinar", "دينار كويتي"],
  ["Oman Riyal", "ريال عماني"],
  ["Qatar Riyal", "ريال قطري"],
  ["Chinese Yuan", "يوان صيني"],
  ["Jordanian Dinar", "دينار أردني"],
  ["Bahrain Dinar", "دينار بحريني"],
  ["Canadian Dollar", "دولار كندي"],
  ["Australian Dollar", "دولار استرالي"],
  ["Japanese Yen", "ين ياباني"],
  ["Swedish Krona", "كرون سويدي"],
  ["Swiss Franc", "فرنك سويسري"],
  ["Norwegian Krone", "كرون نرويجي"],
  ["Dinish Krone", "كرون دانمركي"],
  // Gasoline
  ["Gasoline 95", "بنزين 95"],
  ["Gasoline 92", "بنزين 92"],
  ["Gasoline 80", "بنزين 80"],
  ["Kerosene", "الكيروسين"],
  ["Solar", "السولار"],
  ["Gas Stove Cylinder", "إسطوانة البوتاجاز"],
]);

// page_btn_id => page_id
const page_btn = new Map([
  ["settingsPage", "settings_page_btn"],
  ["goldPage", "gold_page_btn"],
  ["silverPage", "silver_page_btn"],
  ["bankPage", "bank_page_btn"],
  ["marketPage", "market_page_btn"],
  ["gasolinePage", "gasoline_page_btn"],
  ["calculatorPage", "calculator_page_btn"],
]);

// settings_switch_id => action_function
const settings_switches = new Map([["langSwitch", set_lang]]);

const bad_internet = () => {
  const bad_net_icon = curr_page.querySelector("i.bad-net");
  bad_net_icon.style.display = "block";

  setTimeout(() => {
    bad_net_icon.style.display = "none";
  }, 2500);
};
//===================== Data & tools End ======================

//===================== initialization Start ======================
// set the initial page
curr_page = document.getElementById("goldPage");
curr_page.style.display = "flex";
document.getElementById(page_btn.get(curr_page.id)).classList.add("picked");

set_lang();

// data init
(async () => {
  if (run) {
    // get data from api
    // const res = await fetch("http://localhost:3000/");
    const res = await fetch("../prices.json");

    if (res.ok) {
      const data = await res.json();
      set_data(data);
    } else {
      // bad_internet();
    }
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
    el.textContent = data[el.dataset.val];
  });
}

//========================= Functions End =========================

//========================= Events Start =========================
// Pages Btns
page_btn.forEach((btn_id, page_id, map) => {
  const page = document.getElementById(page_id);
  const btn = document.getElementById(btn_id);

  const set_page = () => {
    if (page !== curr_page) {
      page.style.display = "flex";
      curr_page.style.display = "none";
      btn.classList.add("picked");
      document.getElementById(map.get(curr_page.id)).classList.remove("picked");
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

// settings switches
settings_switches.forEach((action_fun, switch_id) => {
  const _switch = document.getElementById(switch_id);

  _switch.addEventListener("click", action_fun);

  _switch.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      action_fun();
    }
  });
});

//========================== Events End ==========================
