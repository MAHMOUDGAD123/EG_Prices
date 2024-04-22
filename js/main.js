//=================== Dependances Start ====================
//==================== Dependances End =====================

//==================== Data & tools Start =====================
let run = true;
let curr_page = null;
let ar = true; // en: false | ar: true
let pointer_x = 0;
const page_count = 6;
let loading = true;
const initial_page = 1;

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
  ["Network Error", "تحقق من إتصالك بالإنترنت"],

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

const content = ["header", ".content", "nav"];

// settings_switch_id => action_function
const settings_switches = new Map([["langSwitch", set_lang]]);

const pick_page = (page) => {
  page.classList.add("picked");
  document.getElementById(page_btn.get(page.id)).classList.add("picked");
};

const unpick_page = (page) => {
  page.classList.remove("picked");
  document.getElementById(page_btn.get(page.id)).classList.remove("picked");
};

const bad_internet = () => {
  document.getElementById("badNetPage").style.transform = "none";
};

//===================== Data & tools End ======================

//===================== initialization Start ======================

set_lang();

// data init
(async () => {
  if (run) {
    // show loading page
    const loadingPage = document.getElementById("loadingPage");
    loadingPage.style.display = "flex";
    try {
      // get data from api
      const res = await fetch("https://eg-prices-api.vercel.app/");

      if (res.ok) {
        const data = await res.json();
        set_data(data);
        // remove loading page
        loadingPage.style.transform = "translateY(-150%)";
        // set the initial page
        curr_page = document.querySelector(`[data-num="${initial_page}"]`);
        pick_page(curr_page);
        // show content
        content.forEach((sel) => {
          document.querySelector(sel).style.transform = "none";
        });
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

page_btn.forEach((btn_id, page_id, map) => {
  const page = document.getElementById(page_id);
  const btn = document.getElementById(btn_id);

  const set_page = () => {
    if (page !== curr_page) {
      unpick_page(curr_page);
      pick_page(page);
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

// change page by silding effect events
{
  const content = document.querySelector(".content");

  const change_page = (curr_pointer_x) => {
    const distance = pointer_x - curr_pointer_x;
    const curr_page_num = +curr_page.dataset.num;
    const is_page = curr_page_num !== 0;

    if (Math.abs(distance) >= 90 && is_page) {
      // distance > 0 -> sliding right
      // distance < 0 -> sliding left
      const dir = (distance > 0 ? 1 : -1) * (ar ? 1 : -1);
      const num = curr_page_num + dir;
      const page_num = num < 1 ? page_count : num > page_count ? 1 : num;
      const page = document.querySelector(`[data-num="${page_num}"]`);
      unpick_page(curr_page);
      pick_page(page);
      curr_page = page;
    }
  };

  content.addEventListener("pointerdown", (e) => {
    pointer_x = e.pageX;
  });

  // if chrome use touchend event
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
